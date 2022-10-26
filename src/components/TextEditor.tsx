import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

const modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, 'code-block'],
		[{ size: [] }],
		[{ script: 'super' }, { script: 'sub' }],
		[{ color: [] }, { background: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[
			'direction',
			{ align: [] },
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		['link', 'image', 'video'],
		['clean'],
	],
};

const formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'video',
	'code-block',
	'align',
	'direction',
	'color',
	'background',
	'script',
	'super',
	'sub',
];

const TextEditor = ({ setContentValue, value }: any) => {
	return (
		<Box border={'1px'} borderColor={'gray.200'} pb={5}>
			<QuillNoSSRWrapper
				bounds={'.app'}
				modules={modules}
				formats={formats}
				onChange={setContentValue}
				placeholder="Write your post here. You can edit your text by tools above"
				value={value}
				theme="snow"
			/>
		</Box>
	);
};

export default TextEditor;
