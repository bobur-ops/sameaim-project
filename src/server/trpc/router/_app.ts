// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { authRouter } from './auth';
import { clubRouter } from './club';
import { commentRouter } from './comment';
import { exampleRouter } from './example';
import { postRouter } from './post';

export const appRouter = router({
	example: exampleRouter,
	auth: authRouter,
	club: clubRouter,
	comment: commentRouter,
	post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
