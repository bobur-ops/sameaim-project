import { Box, Button, Link } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import Feed from '../components/Feed';
import SideBar from '../components/SideBar';

const Club = ({ clubDetails }: any) => {
	const { data: session, status } = useSession();
	const router = useRouter();

	const isMember = clubDetails?.participants.some(
		(item: any) => item.id === session?.user?.id
	);

	const isAuthor = session?.user?.id === clubDetails?.creator?.id;
	const joinMutation = trpc.club.joinClub.useMutation({
		onSettled: (data) => {
			router.reload();
		},
	});
	const leaveMutation = trpc.club.leaveClub.useMutation({
		onSettled: (data) => {
			router.reload();
		},
	});
	const { id } = router.query;

	const joinToClub = async () => {
		if (isMember) {
			leaveMutation.mutate({ clubId: clubDetails?.id });
		} else {
			joinMutation.mutate({ clubId: clubDetails?.id });
		}
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
						isLoading={joinMutation.isLoading || leaveMutation.isLoading}
						colorScheme={isMember ? 'red' : 'green'}
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
					<Feed posts={clubDetails?.posts} author={clubDetails?.creator} />
				</Box>
				<Box display={{ base: 'none', md: 'block' }} minW={'25%'}>
					<SideBar members={clubDetails?.participants} />
				</Box>
			</Box>
		</Box>
	);
};

export default Club;
