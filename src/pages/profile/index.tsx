import { Skeleton, Spinner, Stack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Profile from '../../containers/Profile';
import { trpc } from '../../utils/trpc';

const Page = () => {
	const { data: session } = useSession();
	const userId = session?.user?.id.toString();
	const { data, isLoading } = trpc.user.getUser.useQuery({
		id: userId as string,
	});

	return (
		<Skeleton borderRadius={'12px'} isLoaded={!isLoading}>
			<Profile user={data} />
		</Skeleton>
	);
};

export default Page;
