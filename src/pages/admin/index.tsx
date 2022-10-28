import { Skeleton, Spinner, Stack } from '@chakra-ui/react';
import Admin from '../../containers/Admin';
import { trpc } from '../../utils/trpc';

const Page = () => {
	const { data: clubs } = trpc.club.getAllClubs.useQuery();
	const { data: users, isLoading } = trpc.user.getAllUsers.useQuery();
	const { data: posts } = trpc.post.getAllPosts.useQuery();

	return (
		<Skeleton borderRadius={'12px'} isLoaded={!isLoading}>
			<Admin clubs={clubs} users={users} posts={posts} />
		</Skeleton>
	);
};

export default Page;
