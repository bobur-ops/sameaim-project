import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const postRouter = router({
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
});

// id          String @id @default(cuid())
// title       String
// content     String
// description String
