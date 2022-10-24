import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const clubRouter = router({
	getAllClubs: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.club.findMany();
	}),
	getClub: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.club.findFirst({
				where: { id: input.id },
				include: {
					posts: {
						select: {
							id: true,
							title: true,
							description: true,
							createdAt: true,
							_count: {
								select: {
									comments: true,
								},
							},
						},
						orderBy: {
							createdAt: 'desc',
						},
					},
					participants: true,
					creator: true,
				},
			});
		}),
	getClubsRating: publicProcedure.query(async ({ ctx }) => {
		const clubs = await ctx.prisma.club.findMany({
			include: {
				participants: true,
			},
			orderBy: {
				participants: {
					_count: 'desc',
				},
			},
		});

		const rating = clubs
			.sort((a, b) => {
				return b.participants.length - a.participants.length;
			})
			.slice(0, 5);
		return rating;
	}),
	getClubBySearch: publicProcedure
		.input(z.object({ searchQuery: z.string() }))
		.query(async ({ ctx, input }) => {
			if (input.searchQuery) {
				const clubs = await ctx.prisma.club.findMany({
					where: {
						name: {
							contains: input.searchQuery,
						},
					},
				});
				return clubs;
			} else {
				return [];
			}
		}),

	createClub: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				description: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;
			const club = await ctx.prisma.club.create({
				data: {
					name: input.name,
					description: input.description,
					creator: {
						connect: {
							id: userId,
						},
					},
					participants: {
						connect: {
							id: userId,
						},
					},
				},
			});

			return club;
		}),

	updateClub: protectedProcedure
		.input(
			z.object({
				name: z.string(),
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
				return {
					msg: 'You are not the owner of this club to perferm any actions on it.',
				};
			}

			const updatedClub = await ctx.prisma.club.update({
				where: {
					id: input.clubId,
				},
				data: {
					name: input.name,
					description: input.description,
				},
			});

			return updatedClub;
		}),
	deleteClub: protectedProcedure
		.input(
			z.object({
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
				return {
					msg: 'You are not the owner of this club to perferm any actions on it.',
				};
			}

			const deleteClub = await ctx.prisma.club.delete({
				where: {
					id: input.clubId,
				},
			});

			return deleteClub;
		}),
	joinClub: protectedProcedure
		.input(
			z.object({
				clubId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			await ctx.prisma.user.update({
				where: { id: userId },
				data: {
					clubsParticipant: {
						connect: {
							id: input.clubId,
						},
					},
				},
			});
		}),
	leaveClub: protectedProcedure
		.input(
			z.object({
				clubId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.session.user.id;

			await ctx.prisma.user.update({
				where: { id: userId },
				data: {
					clubsParticipant: {
						disconnect: {
							id: input.clubId,
						},
					},
				},
			});
		}),
});
