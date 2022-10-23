import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const commentRouter = router({
	createComment: protectedProcedure
		.input(
			z.object({
				postId: z.string(),
				text: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			const newComment = await ctx.prisma.comment.create({
				data: {
					text: input.text,
					creator: {
						connect: {
							id: userId,
						},
					},
					post: {
						connect: {
							id: input.postId,
						},
					},
				},
			});

			return newComment;
		}),
	likeComment: protectedProcedure
		.input(
			z.object({
				commentId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			// Получить коммент -> проверить лайнуто или нет
			const comment = await ctx.prisma.comment.findFirst({
				where: { id: input.commentId },
				include: { likedBy: true },
			});
			// const { likedBy } = comment;
			const hasLiked = comment?.likedBy.some((item) => item.id === userId);

			if (hasLiked) {
				await ctx.prisma.comment.update({
					where: { id: input.commentId },
					data: {
						likedBy: {
							disconnect: {
								id: userId,
							},
						},
					},
				});
			} else {
				await ctx.prisma.comment.update({
					where: { id: input.commentId },
					data: {
						likedBy: {
							connect: {
								id: userId,
							},
						},
					},
				});
			}

			return { msg: 'Success' };
		}),
});
// ok! one second!)

// model Comment {
//   id   String @id @default(cuid())
//   text String

//   creator   User    @relation("commentsCreated", fields: [creatorId], references: [id])
//   creatorId String
//   post      Post?   @relation(fields: [postId], references: [id])
//   postId    String?
//   news      News?   @relation("newsComments", fields: [newsId], references: [id])
//   newsId    String?
//   likedBy   User[]  @relation("likedComments")

//   createdAt DateTime @default(now())
// }
