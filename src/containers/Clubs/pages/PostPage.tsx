import {
	Box,
	Button,
	Heading,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Text,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Key, useState } from 'react';
import { trpc } from '../../../utils/trpc';
import Comment from '../components/Comment';

type CommentPostData = {
	text: string;
	postId: string;
};

const PostPage = ({ data }: any) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [commentValue, setCommentValue] = useState('');

	const { data: session, status } = useSession();
	const router = useRouter();
	const { id, postId } = router.query;

	const commentMuatate = trpc.comment.createComment.useMutation({
		onSettled: (data) => {
			router.reload();
		},
	});

	const postMutate = trpc.post.deletePost.useMutation({
		onSettled: (data) => {
			router.push(`/clubs/${id}`);
		},
	});

	const submitComment = async () => {
		const data = {} as CommentPostData;
		data.postId = postId as string;
		data.text = commentValue as string;
		await commentMuatate.mutate(data);
		setCommentValue('');
	};

	return (
		<Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalBody>
						<Text fontSize={'2xl'}>Are you sure to delete post</Text>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="green" mr={3} onClick={onClose}>
							No
						</Button>
						<Button
							onClick={() =>
								postMutate.mutate({
									postId: postId as string,
									postCreatorId: data.creator.id,
								})
							}
							colorScheme={'red'}
						>
							Yes
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Heading mb={10}>{data.title}</Heading>
			<Box borderBottom={'1px'} borderColor={'gray.300'} pb={5}>
				<div className="ql-snow">
					<div
						dangerouslySetInnerHTML={{ __html: data.content }}
						className="ql-editor"
					></div>
				</div>
			</Box>
			{data?.creator.id === session?.user?.id && (
				<Box mt={5}>
					<Button onClick={onOpen} colorScheme={'red'}>
						Delete post
					</Button>
				</Box>
			)}

			<Box mt={20}>
				<Heading mb={5}>Comments</Heading>
				{session && status === 'authenticated' && (
					<>
						<Textarea
							value={commentValue}
							onChange={(e) => setCommentValue(e.target.value)}
							placeholder="Write your comment here..."
						/>
						<Button
							isLoading={commentMuatate.isLoading}
							onClick={submitComment}
							mt={5}
							colorScheme={'blue'}
						>
							Send
						</Button>
					</>
				)}
			</Box>
			<Box mt={'50px'}>
				{data?.comments.length ? (
					data?.comments.map((comment: any, idx: Key | null | undefined) => (
						<Comment comment={comment} key={idx} />
					))
				) : (
					<Text>There are no comments yet</Text>
				)}
			</Box>
		</Box>
	);
};

export default PostPage;
