import { Box, Heading, HStack, Link, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';
import Form from './components/Form';

const CreateClub = () => {
	const { data: session, status } = useSession();

	const router = useRouter();
	const { mutate } = trpc.club.createClub.useMutation({
		onSettled: (data) => {
			router.push(`/clubs/${data?.id}`);
		},
	});
	const submitClub = (data: any) => {
		mutate(data);
	};

	return (
		<Box>
			<Heading mb={10} textAlign="center">
				Create Club
			</Heading>
			{session?.user === null ? (
				<HStack>
					<Text>Please authorize to system before creating a club.</Text>
					<NextLink scroll={false} href={'/'}>
						<Link color={'blue'} fontWeight="semibold">
							Go to Home Page
						</Link>
					</NextLink>
				</HStack>
			) : (
				<Form create={submitClub} loading={false} />
			)}
		</Box>
	);
};

export default CreateClub;
