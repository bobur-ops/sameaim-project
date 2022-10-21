import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const exampleRouter = router({
	hello: publicProcedure
		.input(z.object({ text: z.string().nullish() }).nullish())
		.query(({ input }) => {
			return {
				greeting: `Hello ${input?.text ?? 'world'}`,
			};
		}),
	// getAll: publicProcedure.query(({ ctx }) => {
	// 	return ctx.prisma.example.findMany();
	// }),
	getAllClubs: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.club.findMany();
	}),
	getClub: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.club.findFirst({ where: { id: input.id } });
		}),
	getClubsRating: publicProcedure.query(async ({ ctx }) => {
		const clubs = await ctx.prisma.club.findMany();

		// const rating = clubs
		// 	.sort((a, b) => {
		// 		return b. - a.members.length;
		// 	})
		// 	.slice(0, 4);

		return clubs;
	}),
});
