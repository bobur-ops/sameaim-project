// import { getClubApi } from '../../../api/client'
import { Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Club from '../../../containers/Clubs/pages/Club';
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

	return <Club clubDetails={data} />;
};

export default Page;

// export async function getServerSideProps({ params: { id } }: any) {
// 	const data = trpc.club.getClub.useQuery({id});

// 	return {
// 		props: {
// 			clubDetails: data,
// 		},
// 	};
// }
