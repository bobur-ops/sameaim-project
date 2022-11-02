/* eslint-disable @next/next/no-css-tags */
import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';
import Footer from '../footer';
import Navbar from '../navbar';
import Transition from '../Transition';

const Main = ({ children, router }: any) => {
	return (
		<Box as="main">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Same Aim</title>
				<meta
					name="description"
					content="SameAim platform for gathering like-minded people together."
				/>
				<link rel="shortcut icon" href="/img/logo-image.png" />
			</Head>
			<Navbar path={router.asPath} />

			<Container maxW="container.lg" p={2} pl={3} pt={'100px'} pb={8}>
				<Transition>{children}</Transition>
			</Container>
			<Footer />
		</Box>
	);
};

export default Main;
