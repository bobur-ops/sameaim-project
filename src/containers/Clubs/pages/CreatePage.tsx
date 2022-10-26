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
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { trpc } from '../../../utils/trpc';

const TextEditor = dynamic(import('../../../components/TextEditor'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

const CreatePage = ({ clubID, authorId }: any) => {
	const [title, setTitle] = useState('');
	const [contentValue, setContentValue] = useState('');
	const [description, setDescription] = useState('');
	const { data: session, status } = useSession();

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (session?.user?.id !== authorId) {
			router.push('/');
		}
	}, []);
	const { mutate, isLoading } = trpc.post.createPost.useMutation({
		onSettled: (data) => {
			router.push(`/clubs/${id}`);
		},
	});

	const isDisabled = () => {
		if (title && contentValue && !isLoading) {
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
					<FormHelperText mb={5}>Highlight the text to edit </FormHelperText>
					<TextEditor value={contentValue} setContentValue={setContentValue} />
				</FormControl>
				<Button
					onClick={submitNewPost}
					colorScheme={'blue'}
					disabled={isDisabled()}
					isLoading={isLoading}
					loadingText="Creating post..."
				>
					Create Post
				</Button>
			</Stack>
		</Box>
	);
};

export default CreatePage;
