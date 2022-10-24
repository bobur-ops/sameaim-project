import { useEffect } from 'react';

import { Box, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CreateNews from './components/CreateNews';
import Stats from './components/Stats';

const Admin = ({ clubs, posts, users }: any) => {
	const router = useRouter();

	useEffect(() => {
		const admin: any = localStorage.getItem('admin');
		if (admin) {
			router.push('/admin/login');
		}
	});

	return (
		<Box>
			<Heading>Admin Dashboard</Heading>
			<Stats clubs={clubs} users={users} posts={posts} />
			<CreateNews />
		</Box>
	);
};

export default Admin;
