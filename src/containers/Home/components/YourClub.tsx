import { Box, Button, Heading, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

const YourClub = () => {
	return (
		<Box>
			<Heading mt={50} textAlign={'center'} letterSpacing={'0.1em'}>
				Build a strong <br /> community of people
			</Heading>
			<Stack mt={15}>
				<Text
					fontSize={'2xl'}
					textAlign={'center'}
					maxW={'510px'}
					margin={'0 auto 15px'}
				>
					Same aim is your chance to create team and make your dream about being
					a leader come true{' '}
				</Text>
				<NextLink scroll={false} href="/create_club">
					<Link textAlign={'center'}>
						<Button colorScheme={'blue'}>Create Club</Button>
					</Link>
				</NextLink>
			</Stack>
		</Box>
	);
};

export default YourClub;
