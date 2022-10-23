import {
	Box,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
const Rating = ({ data }: any) => {
	const router = useRouter();

	return (
		<Box>
			<Text fontSize="5xl" align="center" fontWeight="semibold">
				Rating
			</Text>
			<TableContainer mt={85}>
				<Table variant="simple" size={{ base: 'sm', md: 'lg' }}>
					<TableCaption>Based on number of members</TableCaption>
					<Thead>
						<Tr>
							<Th>№</Th>
							<Th>Name of club</Th>
							<Th>Memebers</Th>
							<Th display={{ base: 'none', md: 'table-cell' }}>Created at</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data?.map((item: any, index: any) => (
							<Tr
								cursor="pointer"
								onClick={() => router.push(`/clubs/${item.id}`)}
								key={item.id}
							>
								<Td>#{index + 1}</Td>
								<Td>{item.name}</Td>
								<Td>{item.participants.length}</Td>
								<Td display={{ base: 'none', md: 'table-cell' }}>
									{dayjs(item.createdAt).format('YYYY/MM/DD')}
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Rating;
