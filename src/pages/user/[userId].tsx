import { Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import User from '../../containers/User/User';
import { trpc } from '../../utils/trpc';

const Page = () => {
	const router = useRouter();
	const { userId } = router.query;
	const { data, isLoading } = trpc.user.getUser.useQuery({
		id: userId as string,
	});
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
	return <User user={data} />;
};

export default Page;
