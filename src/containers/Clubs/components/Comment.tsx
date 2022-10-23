import { Avatar, Box, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { HiOutlineThumbUp, HiThumbUp } from 'react-icons/hi';
import { trpc } from '../../../utils/trpc';

const Comment = ({ comment }: any) => {
	const author = comment?.creator;

	const { data: session, status } = useSession();
	const [commentLikes, setCommentLikes] = useState(comment?.likedBy);

	const hasLiked = commentLikes?.some(
		(like: any) => like.id === session?.user?.id
	);

	const { mutate } = trpc.comment.likeComment.useMutation({
		onSettled: (data) => {
			console.log(data);
		},
	});

	const likeComment = async () => {
		if (hasLiked) {
			setCommentLikes((prev: any[]) =>
				prev.filter((item: any) => item.id !== session?.user?.id)
			);
		} else {
			setCommentLikes((prev: any) => [...prev, session?.user]);
		}
		mutate({ commentId: comment?.id });
	};

	const Likes = () => {
		return hasLiked ? (
			<HStack>
				<Icon as={HiThumbUp} />
				<Text>{commentLikes?.length}</Text>
			</HStack>
		) : (
			<HStack>
				<Icon as={HiOutlineThumbUp} />
				<Text>{commentLikes?.length}</Text>
			</HStack>
		);
	};

	return (
		<Box mb={'50px'}>
			<HStack mb={0} ml={-2.5}>
				<Avatar size="xs" name={author?.name} src={author?.image} />
				<Text fontSize={'sm'}>{author?.name}</Text>
			</HStack>
			<Box pl={5} borderLeft={'2px'} borderColor={'gray.300'}>
				<Text>{comment.text}</Text>
				<HStack mt={5} cursor={'pointer'} onClick={likeComment}>
					<Likes />
				</HStack>
			</Box>
		</Box>
	);
};

export default Comment;
