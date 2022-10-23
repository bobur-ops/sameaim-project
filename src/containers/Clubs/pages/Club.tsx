import { Box, Button, Link } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Feed from '../components/Feed';
import SideBar from '../components/SideBar';

const Club = ({ clubDetails }: any) => {
	const [buttonLoading, setButtonLoading] = useState(false);
	const [isMember, setIsMember] = useState(false);

	const { data: session, status } = useSession();
	const isAuthor = session?.user?.id === clubDetails?.creator?.id;

	const router = useRouter();
	const { id } = router.query;

	const joinToClub = async () => {
		// try {
		// 	setButtonLoading(true);
		// 	if (isMember) {
		// 		await leaveClubApi({ user: JSON.stringify(session) }, clubDetails._id);
		// 	} else {
		// 		await joinToClubApi(
		// 			{ user: JSON.stringify(session) },
		// 			clubDetails._id,
		// 			session._id
		// 		);
		// 	}
		// 	setButtonLoading(false);
		// 	router.reload();
		// } catch (error) {
		// 	console.log(error);
		// 	setButtonLoading(false);
		// }
	};

	return (
		<Box>
			{isAuthor ? (
				<Box mb={3}>
					<NextLink href={`/clubs/${id}/create`}>
						<Link>
							<Button colorScheme={'blue'}>New Post</Button>
						</Link>
					</NextLink>
				</Box>
			) : session ? (
				<Box mb={3}>
					<Button
						loadingText="Joining..."
						isLoading={buttonLoading}
						colorScheme={isMember ? 'red' : 'blue'}
						onClick={joinToClub}
					>
						{isMember ? 'Leave' : 'Join'}
					</Button>
				</Box>
			) : (
				<NextLink href={'/signin'}>
					<Link color={'blue.400'}>Authorize to joing to this club</Link>
				</NextLink>
			)}
			<Box display={'flex'} gap={10}>
				<Box flex={1}>
					<Feed posts={clubDetails.posts} author={clubDetails.creator} />
				</Box>
				<Box display={{ base: 'none', md: 'block' }} minW={'25%'}>
					<SideBar members={clubDetails.participants} />
				</Box>
			</Box>
		</Box>
	);
};

export default Club;
