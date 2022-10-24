import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const postRouter = router({
	getAllPosts: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.post.findMany();
	}),
	getRecentPosts: publicProcedure
		.input(z.object({ limit: z.string() }))
		.query(async ({ input, ctx }) => {
			const posts = await ctx.prisma.post.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					club: true,
					_count: {
						select: {
							comments: true,
						},
					},
				},
			});

			const results = posts.slice(0, Number(input.limit));

			return { posts: results, limit: input.limit };
		}),
	getPost: publicProcedure
		.input(z.object({ postId: z.string() }))
		.query(async ({ ctx, input }) => {
			const post = await ctx.prisma.post.findFirst({
				where: { id: input.postId },
				include: {
					comments: {
						orderBy: {
							createdAt: 'desc',
						},
						include: {
							likedBy: true,
							creator: true,
						},
					},
					creator: true,
				},
			});

			return post;
		}),

	createPost: protectedProcedure
		.input(
			z.object({
				title: z.string(),
				content: z.string(),
				description: z.string(),
				clubId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const club = await ctx.prisma.club.findFirst({
				where: {
					id: input.clubId,
				},
			});

			const isAuthor = userId === club?.creatorId;

			if (!isAuthor) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			const newPost = await ctx.prisma.post.create({
				data: {
					title: input.title,
					description: input.description,
					content: input.content,
					creator: {
						connect: {
							id: userId,
						},
					},
					club: {
						connect: {
							id: input.clubId,
						},
					},
				},
			});

			return newPost;
		}),

	deletePost: protectedProcedure
		.input(z.object({ postId: z.string(), postCreatorId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const isAuthor = userId === input.postCreatorId;

			if (!isAuthor) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			const deletePost = await ctx.prisma.post.delete({
				where: { id: input.postId },
			});

			return deletePost;
		}),
});
