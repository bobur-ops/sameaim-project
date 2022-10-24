import { Box, Icon, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { IoIosPerson } from 'react-icons/io';

const SideBar = ({ members }: any) => {
	return (
		<Box borderRadius={12}>
			<Text fontSize={'2xl'} fontWeight="semibold" mb={'3'}>
				Members
			</Text>

			{members?.map((item: any) => (
				<NextLink key={item.id} href={`/user/${item.id}`}>
					<Link
						color={'blue.500'}
						display={'flex'}
						alignItems="center"
						gap={'5px'}
					>
						<Icon as={IoIosPerson} />
						{item.name}
					</Link>
				</NextLink>
			))}
		</Box>
	);
};

export default SideBar;
