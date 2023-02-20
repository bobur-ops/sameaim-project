// import { getPostApi } from '../../../../api/client'
import { Spinner, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import PostPage from "../../../../containers/Clubs/pages/PostPage";
import { trpc } from "../../../../utils/trpc";

const Page = () => {
  const router = useRouter();
  const { postId } = router.query;
  const id = postId as string;

  const { data, isLoading } = trpc.post.getPost.useQuery({ postId: id });

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

  return <PostPage data={data} />;
};

export default Page;
