import { Box, Button, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
const BoldBox = styled.span`
	font-weight: bold;
	color: blue;
`;

const AboutUs = () => {
	const router = useRouter();

	return (
		<Box mb={'90px'}>
			<Text fontSize="5xl" textAlign="center" fontWeight="semibold">
				About us
			</Text>
			<Text
				textAlign={'center'}
				fontWeight="semibold"
				margin={'0 auto'}
				fontSize={'2xl'}
				maxW={'614px'}
			>
				<BoldBox>SAME AIM</BoldBox> is a project that connects people with
				common goals, interests and life goals.
			</Text>
			<Box mt={57}>
				<Text fontWeight={'medium'} fontSize={'xl'} mb={5}>
					What can we offer?
				</Text>
				<UnorderedList pl={10} spacing={'16px'}>
					<ListItem>A community of like-minded people</ListItem>
					<ListItem>
						A lively, meaningful people who embody and support
					</ListItem>
					<ListItem>Studying and sharing knowledge</ListItem>
				</UnorderedList>
			</Box>
			<Text fontWeight={'medium'} fontSize={'xl'} mt={5} mb={5}>
				If you want to be a member of our big commuinity, go ahead and log in
			</Text>
			<Button colorScheme={'blue'} onClick={() => router.push('/signin')}>
				Get Started
			</Button>
		</Box>
	);
};

export default AboutUs;
