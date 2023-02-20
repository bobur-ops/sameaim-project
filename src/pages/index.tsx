// import { Skeleton, Spinner, Stack } from "@chakra-ui/react";
import Home from "../containers/Home";
import { trpc } from "../utils/trpc";

const Page = () => {
  const { data, isLoading } = trpc.club.getClubsRating.useQuery();
  const { data: news } = trpc.news.getAllNews.useQuery();

  return <Home ratingData={data} news={news} isLoading={isLoading} />;
};

export default Page;
