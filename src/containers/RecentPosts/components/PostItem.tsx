import { Box, HStack, Icon, Link, Stack, Text } from '@chakra-ui/react';
// import moment from 'moment'
import NextLink from 'next/link';
import { FaRegComment } from 'react-icons/fa';
import { dayJsFrom } from '../../../utils/dayJsFrom';

const FeedItem = ({ post }: any) => {
	return (
		<Box
			cursor={'pointer'}
			border="1px"
			borderColor="gray.200"
			mb={5}
			p={3}
			borderRadius={12}
			boxShadow={'md'}
			bg={'gray.50'}
			position={'relative'}
		>
			<NextLink href={`/clubs/${post.clubId}/${post.id}`}>
				<Link position={'absolute'} w={'100%'} h={'100%'}></Link>
			</NextLink>
			<Box fontSize={'sm'} display={'flex'} gap={2}>
				Posted by{' '}
				<NextLink href={`/clubs/${post.clubId}`}>
					<Link>
						<Text color={'blue'}> {post?.club?.name}</Text>
					</Link>
				</NextLink>
			</Box>
			<Box>
				<Text fontWeight={'semibold'} fontSize={'2xl'}>
					{post.title}
				</Text>
				<Text>
					{post.description.length > 200
						? `${post.description.slice(0, 200)}...`
						: post.description}
				</Text>
			</Box>
			<HStack mt={'10px'} justifyContent={'space-between'}>
				<HStack>
					<Icon as={FaRegComment} />
					<Text>{post._count.comments}</Text>
				</HStack>
				<Text fontSize={'sm'}>{dayJsFrom(post.createdAt)}</Text>
			</HStack>
		</Box>
	);
};

export default FeedItem;
