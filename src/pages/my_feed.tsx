import { Spinner, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import MyFeed from '../containers/MyFeed/MyFeed';
import { trpc } from '../utils/trpc';

const Page = () => {
	const [limit, setLimit] = useState(20);
	const { data, isLoading } = trpc.user.getMyFeed.useQuery({ limit });
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
	return <MyFeed posts={data} limit={limit} setLimit={setLimit} />;
};

export default Page;
