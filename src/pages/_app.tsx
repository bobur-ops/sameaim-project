// src/pages/_app.tsx
import { ChakraProvider } from '@chakra-ui/react';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/layouts/main';
import theme from '../lib/theme';
import '../styles/globals.css';
import '../styles/transition.css';
import { trpc } from '../utils/trpc';
const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
	router,
}) => {
	NProgress.configure({ showSpinner: false });

	Router.events.on('routeChangeStart', () => {
		NProgress.start();
	});

	Router.events.on('routeChangeComplete', () => {
		NProgress.done();
	});

	return (
		<ChakraProvider theme={theme}>
			<SessionProvider session={session}>
				<Layout router={router}>
					<Toaster />
					<Component {...pageProps} />
				</Layout>
			</SessionProvider>
		</ChakraProvider>
	);
};

export default trpc.withTRPC(MyApp);
