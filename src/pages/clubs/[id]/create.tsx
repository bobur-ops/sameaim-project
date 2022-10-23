// import { getClubApi } from '../../../api/client'
import CreatePage from '../../../containers/Clubs/pages/CreatePage';

const Page = ({ clubID, authorId }: any) => {
	return <CreatePage clubID={clubID} authorId={authorId} />;
};

export default Page;

export async function getServerSideProps({ params: { id } }: any) {
	// const data = await getClubApi(id)
	const data = { data: { _id: '', author: '' } };

	return {
		props: {
			clubID: data.data._id,
			authorId: JSON.parse(data.data.author).userId,
		},
	};
}
