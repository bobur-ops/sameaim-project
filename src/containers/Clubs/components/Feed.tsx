import { Box, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FeedItem from './FeedItem';

const Feed = ({ posts }) => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<Box borderRadius={12}>
			<Text fontSize={'2xl'} fontWeight="semibold">
				Feed
			</Text>
			<Box mt={'5'}>
				{posts.length ? (
					posts.map((item) => (
						<NextLink key={item.id} href={`/clubs/${id}/${item.id}`}>
							<Link>
								<FeedItem data={item} />
							</Link>
						</NextLink>
					))
				) : (
					<Text>There are no posts yet</Text>
				)}
			</Box>
		</Box>
	);
};

export default Feed;
