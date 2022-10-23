// import { getClubApi } from '../../../api/client'
import { Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CreatePage from '../../../containers/Clubs/pages/CreatePage';
import { trpc } from '../../../utils/trpc';

const Page = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data, isLoading } = trpc.club.getClub.useQuery({ id });

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

	return <CreatePage clubID={id} authorId={data?.creatorId} />;
};

export default Page;
