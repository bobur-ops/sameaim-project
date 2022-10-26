import { Spinner, Stack } from '@chakra-ui/react';
import Home from '../containers/Home';
import { trpc } from '../utils/trpc';

const Page = () => {
	const { data, isLoading } = trpc.club.getClubsRating.useQuery();
	const { data: news } = trpc.news.getAllNews.useQuery();
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

	return <Home ratingData={data} news={news} isLoading={isLoading} />;
};

export default Page;
