import Home from '../containers/Home';
import { trpc } from '../utils/trpc';

const Page = () => {
	const { data, isLoading } = trpc.club.getClubsRating.useQuery();

	return <Home ratingData={data} news={[]} isLoading={isLoading} />;
};

export default Page;
