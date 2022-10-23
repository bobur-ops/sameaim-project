// import { getClubsApi } from '../../api/client'
import Admin from '../../containers/Admin';

const Page = ({ clubs }: any) => {
	return <Admin />;
};

export default Page;

export async function getServerSideProps() {
	// const { data } = await getClubsApi()
	const data = { data: [] };

	return {
		props: {
			clubs: data.data,
		},
	};
}
