import { Skeleton, Spinner, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import MyFeed from '../containers/MyFeed/MyFeed';
import { trpc } from '../utils/trpc';

const Page = () => {
	const [limit, setLimit] = useState(20);
	const { data, isLoading } = trpc.user.getMyFeed.useQuery({ limit });
	return (
		<Skeleton borderRadius={'12px'} isLoaded={!isLoading}>
			<MyFeed posts={data} limit={limit} setLimit={setLimit} />
		</Skeleton>
	);
};

export default Page;
