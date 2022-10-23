// import { getPostApi } from '../../../../api/client'
import PostPage from '../../../../containers/Clubs/pages/PostPage';

const Page = ({ data }: any) => {
	return <PostPage data={data} />;
};

export default Page;

export async function getServerSideProps({ params: { id, postId } }: any) {
	// const data = await getPostApi(id, postId)
	const data = { data: [] };

	return {
		props: {
			data: data.data,
		},
	};
}
