import { Box, HStack, Icon, Stack, Text } from '@chakra-ui/react';
// import moment from 'moment'
import { FaRegComment } from 'react-icons/fa';
import { dayJsFrom } from '../../../utils/dayJsFrom';

const FeedItem = ({ data, author }: any) => {
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
		>
			<Box fontSize={'sm'}>
				Posted by{' '}
				<Text display={'inline-block'} color={'blue'} fontWeight={'medium'}>
					{' '}
					{author?.name}
				</Text>
			</Box>
			<Box>
				<Text fontWeight={'semibold'} fontSize={'2xl'}>
					{data.title}
				</Text>
				<Text>
					{data.description.length > 200
						? `${data.description.slice(0, 200)}...`
						: data.description}
				</Text>
			</Box>
			<HStack mt={'10px'} justifyContent={'space-between'}>
				<HStack>
					<Icon as={FaRegComment} />
					<Text>{data._count.comments}</Text>
				</HStack>
				<Text fontSize={'sm'}>{dayJsFrom(data.createdAt)}</Text>
			</HStack>
		</Box>
	);
};

export default FeedItem;
