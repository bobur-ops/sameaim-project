// import { getClubsRating, getNewsApi } from '../api/client';
import { Spinner, Stack } from '@chakra-ui/react';
import Home from '../containers/Home';
import { trpc } from '../utils/trpc';

const Page = ({ news }: any) => {
	const { data, isLoading } = trpc.club.getClubsRating.useQuery();

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

	return <Home ratingData={data} news={news} />;
};

export default Page;

export async function getServerSideProps() {
	// const data = await getClubsRating();
	// const news = await getNewsApi()

	return {
		props: {
			ratingData: [],
			news: [],
		},
	};
}
