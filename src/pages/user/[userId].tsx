import { Skeleton, Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import User from '../../containers/User/User';
import { trpc } from '../../utils/trpc';

const Page = () => {
	const router = useRouter();
	const { userId } = router.query;
	const { data, isLoading } = trpc.user.getUser.useQuery({
		id: userId as string,
	});
	return (
		<Skeleton borderRadius={'12px'} isLoaded={!isLoading}>
			<User user={data} />
		</Skeleton>
	);
};

export default Page;
