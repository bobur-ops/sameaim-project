import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const userRouter = router({
	getAllUsers: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.user.findMany();
	}),
	getUser: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ input, ctx }) => {
			return ctx.prisma.user.findFirst({
				where: { id: input.id },
				include: { clubsOwner: true, clubsParticipant: true },
			});
		}),

	getMyFeed: protectedProcedure
		.input(z.object({ limit: z.number() }))
		.query(async ({ input, ctx }) => {
			let res: any = [];
			const userId = ctx.session.user.id;
			const user = await ctx.prisma.user.findFirst({
				where: { id: userId },
				include: {
					clubsParticipant: {
						include: {
							posts: {
								include: {
									club: true,
									_count: {
										select: {
											comments: true,
										},
									},
								},
							},
						},
					},
				},
			});

			user?.clubsParticipant?.forEach((club) => {
				res = [...res, ...club.posts];
			});

			return res.slice(0, Number(input.limit)).sort(function (a: any, b: any) {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			});
		}),
});
