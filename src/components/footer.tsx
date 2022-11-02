import {
	Box,
	chakra,
	Container,
	Flex,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaTelegram } from 'react-icons/fa';

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={12}
			h={12}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

export default function Footer() {
	return (
		<Box
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
		>
			<Container
				as={Stack}
				maxW={'6xl'}
				py={4}
				direction={{ base: 'column', md: 'row' }}
				spacing={4}
				justify={{ base: 'center', md: 'space-between' }}
				align={{ base: 'center', md: 'center' }}
			>
				<Flex flexDir={'column'}>
					<Text>© 2022. All rights reserved</Text>
					<Text>Created by Madina and Muxammadbobur</Text>
				</Flex>
				<Stack direction={'row'} spacing={6}>
					<SocialButton label={'Twitter'} href={'https://t.me/sameaimbymb'}>
						<FaTelegram width={'12px'} height={'12px'} />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	);
}
