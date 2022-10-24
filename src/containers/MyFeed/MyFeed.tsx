import { Box, Button } from '@chakra-ui/react';
import PostItem from './components/PostItem';

const MyFeed = ({ posts, limit, setLimit }: any) => {
	return (
		<Box>
			{posts?.map((item: any) => (
				<PostItem key={item.id} post={item} />
			))}
			<Button
				mt={'5'}
				onClick={() => setLimit(limit + 10)}
				colorScheme={'blue'}
			>
				Get More
			</Button>
		</Box>
	);
};

export default MyFeed;
