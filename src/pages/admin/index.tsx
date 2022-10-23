import { Spinner, Stack } from '@chakra-ui/react';
import Admin from '../../containers/Admin';
import { trpc } from '../../utils/trpc';

const Page = () => {
	const { data: clubs } = trpc.club.getAllClubs.useQuery();
	const { data: users, isLoading } = trpc.user.getAllUsers.useQuery();
	const { data: posts } = trpc.post.getAllPosts.useQuery();

	if (isLoading)
		return (
			<Stack>
				<Spinner
					margin={'0 auto'}
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			</Stack>
		);

	console.log(clubs);

	return <Admin clubs={clubs} users={users} posts={posts} />;
};

export default Page;
