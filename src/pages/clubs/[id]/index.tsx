import { Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Club from '../../../containers/Clubs/pages/Club';
import { trpc } from '../../../utils/trpc';

const Page = () => {
	const router = useRouter();
	const { id } = router.query;
	const strId = id as string;

	const { data, isLoading } = trpc.club.getClub.useQuery({ id: strId });

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

	return <Club clubDetails={data} />;
};

export default Page;
