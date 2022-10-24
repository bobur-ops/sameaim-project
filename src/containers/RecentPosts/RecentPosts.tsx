import { Box, Button, Text } from '@chakra-ui/react';
import PostItem from './components/PostItem';

const RecentPosts = ({ posts, limit, setLimit }: any) => {
	return (
		<Box>
			{posts?.map((item: any) => (
				<PostItem key={item.id} post={item} />
			))}
			<Button
				mt={'5'}
				onClick={() => setLimit(`${Number(limit) + 10}`)}
				colorScheme={'blue'}
			>
				Get More
			</Button>
		</Box>
	);
};

export default RecentPosts;
