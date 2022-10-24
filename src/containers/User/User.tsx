import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react';

const User = ({ user }: any) => {
	return (
		<Box>
			<Stack
				gap={'30px'}
				flexDirection={{ base: 'column', md: 'row' }}
				align={'center'}
				mb={30}
			>
				<Box>
					<Avatar
						size={'2xl'}
						name={user?.name?.toString()}
						src={user?.image?.toString()}
					/>
				</Box>
				<VStack>
					<Text fontWeight={'semibold'} fontSize={'3xl'}>
						{user?.name}
					</Text>
					<Text>{user?.email}</Text>
				</VStack>
			</Stack>
		</Box>
	);
};

export default User;
