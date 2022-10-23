import { Spinner, Stack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Profile from '../../containers/Profile';
import { trpc } from '../../utils/trpc';

const Page = () => {
	const { data: session } = useSession();
	const userId = session?.user?.id.toString();
	const { data, isLoading } = trpc.user.getUser.useQuery({ id: userId });

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

	return <Profile user={data} />;
};

export default Page;
