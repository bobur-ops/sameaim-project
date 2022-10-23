import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

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
});