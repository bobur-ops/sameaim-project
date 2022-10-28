import { Skeleton, Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Club from '../../../containers/Clubs/pages/Club';
import { trpc } from '../../../utils/trpc';

const Page = () => {
	const router = useRouter();
	const { id } = router.query;
	const strId = id as string;

	const { data, isLoading } = trpc.club.getClub.useQuery({ id: strId });

	return (
		<Skeleton isLoaded={!isLoading}>
			{' '}
			<Club clubDetails={data} />
		</Skeleton>
	);
};

export default Page;
