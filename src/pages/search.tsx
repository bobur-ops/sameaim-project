import { Spinner, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import Search from '../containers/Search/Search';
import { trpc } from '../utils/trpc';

const Page = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const { data, isLoading } = trpc.club.getClubBySearch.useQuery({
		searchQuery,
	});

	return (
		<Search
			clubs={data}
			isLoading={isLoading}
			setSearchQuery={setSearchQuery}
		/>
	);
};

export default Page;
