// import { getClubApi } from '../../../api/client'
import { Skeleton, Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CreatePage from '../../../containers/Clubs/pages/CreatePage';
import { trpc } from '../../../utils/trpc';

const Page = () => {
	const router = useRouter();
	const { id } = router.query;
	const strId = id as string;
	const { data, isLoading } = trpc.club.getClub.useQuery({ id: strId });

	return (
		<Skeleton borderRadius={'12px'} isLoaded={!isLoading}>
			<CreatePage clubID={id} authorId={data?.creatorId} />{' '}
		</Skeleton>
	);
};

export default Page;
