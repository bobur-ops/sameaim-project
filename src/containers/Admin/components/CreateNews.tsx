import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { trpc } from '../../../utils/trpc';

const CreateNews = () => {
	const [imageUrl, setImageUrl] = useState('');
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const { mutate } = trpc.news.createNews.useMutation({
		onSettled: (data) => {
			toast.success('News created successfully');
			setImageUrl('');
			setTitle('');
			setContent('');
		},
	});

	return (
		<Box mt={10}>
			<Heading>Create News</Heading>
			<Stack spacing={6} mt={5}>
				<FormControl isRequired>
					<FormLabel>Url for news&apos; thumbnail</FormLabel>
					<Input type="text" onChange={(e) => setImageUrl(e.target.value)} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Title for your news</FormLabel>
					<Input type="text" onChange={(e) => setTitle(e.target.value)} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Content</FormLabel>
					<Textarea
						minH={'200px'}
						placeholder="Write here..."
						onChange={(e) => setContent(e.target.value)}
					/>
				</FormControl>
				<Button
					disabled={!title || !content || !imageUrl}
					onClick={() => mutate({ content, title, image: imageUrl })}
					colorScheme={'blue'}
				>
					Create
				</Button>
			</Stack>
		</Box>
	);
};

export default CreateNews;
