import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
// import { setCookie } from 'cookies-next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
// import toast from 'react-hot-toast';
// import { loginUser } from '../../api/client';
// import { useGlobalContext } from '../../context/GlobalContext';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	return (
		<Flex
			minH={'100vh'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<Stack spacing={10}>
							<Button
								bg={'blue.400'}
								color={'white'}
								size={'lg'}
								rightIcon={<FcGoogle />}
								_hover={{
									bg: 'blue.500',
								}}
								onClick={() =>
									signIn('google', { callbackUrl: 'http://localhost:3000' })
								}
							>
								Sign in Using Google
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default SignIn;
