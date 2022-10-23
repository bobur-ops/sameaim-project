import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const newsRouter = router({
	hello: publicProcedure
		.input(z.object({ text: z.string().nullish() }).nullish())
		.query(({ input }) => {
			return {
				greeting: `Hello ${input?.text ?? 'world'}`,
			};
		}),
	getAllNews: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.news.findMany();
	}),
	getOneNews: publicProcedure
		.input(z.object({ newsId: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.news.findFirst({ where: { id: input.newsId } });
		}),
	createNews: publicProcedure
		.input(
			z.object({ title: z.string(), content: z.string(), image: z.string() })
		)
		.mutation(async ({ ctx, input }) => {
			const news = ctx.prisma.news.create({
				data: {
					content: input.content,
					title: input.title,
					image: input.image,
				},
			});

			return news;
		}),

	deleteNews: publicProcedure
		.input(z.object({ newsId: z.string() }))
		.mutation(async ({ input, ctx }) => {
			await ctx.prisma.news.delete({ where: { id: input.newsId } });

			return { msg: 'Success' };
		}),
});
