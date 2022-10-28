import { Skeleton, Spinner, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import RecentPosts from '../containers/RecentPosts/RecentPosts';
import { trpc } from '../utils/trpc';

const Page = () => {
	const [limit, setLimit] = useState('10');
	const { data, isLoading } = trpc.post.getRecentPosts.useQuery({ limit });
	return (
		<Skeleton borderRadius={'12px'} isLoaded={!isLoading}>
			<RecentPosts
				posts={data?.posts}
				limit={data?.limit}
				setLimit={setLimit}
			/>
		</Skeleton>
	);
};

export default Page;
