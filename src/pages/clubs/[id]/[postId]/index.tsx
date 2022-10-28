// import { getPostApi } from '../../../../api/client'
import { Skeleton, Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PostPage from '../../../../containers/Clubs/pages/PostPage';
import { trpc } from '../../../../utils/trpc';

const Page = () => {
	const router = useRouter();
	const { postId } = router.query;
	const id = postId as string;

	const { data, isLoading } = trpc.post.getPost.useQuery({ postId: id });

	return (
		<Skeleton borderRadius={'12px'} isLoaded={!isLoading}>
			<PostPage data={data} />
		</Skeleton>
	);
};

export default Page;
