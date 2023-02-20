import { Spinner, Stack } from "@chakra-ui/react";
import { useState } from "react";
import RecentPosts from "../containers/RecentPosts/RecentPosts";
import { trpc } from "../utils/trpc";

const Page = () => {
  const [limit, setLimit] = useState("10");
  const { data, isLoading } = trpc.post.getRecentPosts.useQuery({ limit });

  if (isLoading) {
    return (
      <Stack>
        <Spinner
          margin={"0 auto"}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Stack>
    );
  }

  return (
    <RecentPosts posts={data?.posts} limit={data?.limit} setLimit={setLimit} />
  );
};

export default Page;
