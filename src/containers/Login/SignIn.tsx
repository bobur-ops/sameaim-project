import {
	Box,
	Button,
	Flex,
	Heading,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
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
						<Stack spacing={5}>
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
