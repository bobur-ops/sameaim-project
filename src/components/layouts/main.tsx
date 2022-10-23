/* eslint-disable @next/next/no-css-tags */
import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from '../navbar';
import Transition from '../Transition';

const Main = ({ children, router }: any) => {
	return (
		<Box as="main" pb={8}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Same Aim</title>
				<link rel="shortcut icon" href="/img/logo-image.png" />
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
					integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</Head>
			<Navbar path={router.asPath} />

			<Container maxW="container.lg" p={2} pl={3} pt={'100px'}>
				<Transition>{children}</Transition>
			</Container>
		</Box>
	);
};

export default Main;
