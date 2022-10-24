import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Stack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
// import { createPostApi, getUserApi } from '../../../api/client'
import TextEditor from '../../../components/TextEditor';
import { trpc } from '../../../utils/trpc';

const CreatePage = ({ clubID, authorId }: any) => {
	const [title, setTitle] = useState('');
	const [contentValue, setContentValue] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const { data: session, status } = useSession();

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (session?.user?.id !== authorId) {
			router.push('/');
		}
	}, []);

	// const { mutate } = trpc.club.createClub.useMutation({
	// 	onSettled: (data) => {
	// 		router.push(`/clubs/${data?.id}`);
	// 	},
	// });
	// const submitClub = (data: any) => {
	// 	mutate(data);
	// };
	const { mutate } = trpc.post.createPost.useMutation({
		onSettled: (data) => {
			router.push(`/clubs/${id}`);
		},
	});

	const isDisabled = () => {
		if (title && contentValue) {
			return false;
		} else {
			return true;
		}
	};

	const submitNewPost = () => {
		const data = {
			title,
			content: contentValue,
			description,
			clubId: id as string,
		};

		mutate(data);
	};

	return (
		<Box>
			<Heading mb={10}>New Post</Heading>
			<Stack spacing={5}>
				<FormControl isRequired>
					<FormLabel>Title of your post </FormLabel>
					<Input
						value={title}
						type="text"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Description for your post</FormLabel>
					<Input
						value={description}
						type="text"
						onChange={(e) => setDescription(e.target.value)}
					/>
					<FormHelperText>
						It will be displayed in a list of posts, so your description should
						be eye-catching
					</FormHelperText>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Content</FormLabel>
					<TextEditor value={contentValue} setContentValue={setContentValue} />
				</FormControl>

				<Button
					onClick={submitNewPost}
					colorScheme={'blue'}
					disabled={isDisabled()}
					isLoading={loading}
					loadingText="Creating post..."
				>
					Create Post
				</Button>
			</Stack>
		</Box>
	);
};

export default CreatePage;
