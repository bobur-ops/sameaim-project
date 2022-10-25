import { useEffect, useState } from 'react';

import { Box, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CreateNews from './components/CreateNews';
import Stats from './components/Stats';

const Admin = ({ clubs, posts, users }: any) => {
	const router = useRouter();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const admin: any = localStorage.getItem('admin');
		if (!admin) {
			router.push('/admin/login');
		} else {
			setIsAdmin(true);
		}
	}, []);

	if (!isAdmin) return <div></div>;

	return (
		<Box>
			<Heading>Admin Dashboard</Heading>
			<Stats clubs={clubs} users={users} posts={posts} />
			<CreateNews />
		</Box>
	);
};

export default Admin;
