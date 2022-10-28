import { Skeleton, Spinner, Stack } from '@chakra-ui/react';
import Home from '../containers/Home';
import { trpc } from '../utils/trpc';

const Page = () => {
	const { data, isLoading } = trpc.club.getClubsRating.useQuery();
	const { data: news } = trpc.news.getAllNews.useQuery();

	return (
		<Skeleton borderRadius={'12px'} isLoaded={!isLoading}>
			<Home ratingData={data} news={news} isLoading={isLoading} />
		</Skeleton>
	);
};

export default Page;
