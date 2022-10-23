import { Box, Button, Heading, Text, Textarea } from '@chakra-ui/react';
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
	const [commentValue, setCommentValue] = useState('');
	const [comments, setComments] = useState(data.comments);

	const { data: session, status } = useSession();
	const router = useRouter();
	const { postId } = router.query;

	const { mutate } = trpc.comment.createComment.useMutation({
		onSettled: (data) => {
			setComments((prev) => [data, ...prev]);
		},
	});

	const submitComment = async () => {
		const data = {} as CommentPostData;
		data.postId = postId as string;
		data.text = commentValue as string;
		mutate(data);
	};

	return (
		<Box>
			<Heading mb={10}>{data.title}</Heading>
			<Box borderBottom={'1px'} borderColor={'gray.300'} pb={5}>
				<div className="ql-snow">
					<div
						dangerouslySetInnerHTML={{ __html: data.content }}
						className="ql-editor"
					></div>
				</div>
			</Box>
			<Box mt={20}>
				<Heading mb={5}>Comments</Heading>
				{session && (
					<>
						<Textarea
							value={commentValue}
							onChange={(e) => setCommentValue(e.target.value)}
							placeholder="Write your comment here..."
						/>
						<Button onClick={submitComment} mt={5} colorScheme={'blue'}>
							Send
						</Button>
					</>
				)}
			</Box>
			<Box mt={'50px'}>
				{comments.length ? (
					comments.map((comment: any, idx: Key | null | undefined) => (
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
