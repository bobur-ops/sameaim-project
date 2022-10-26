import {
	Box,
	Spinner,
	Stack,
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
const Rating = ({ data, isLoading }: any) => {
	const router = useRouter();

	return (
		<Box>
			<Text fontSize="5xl" align="center" fontWeight="semibold">
				Rating
			</Text>
			{isLoading ? (
				<Stack>
					<Spinner
						margin={'0 auto'}
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
				</Stack>
			) : (
				<>
					<TableContainer mt={85}>
						<Table variant="simple" size={{ base: 'lg', md: 'lg' }}>
							<TableCaption>Based on number of members</TableCaption>
							<Thead>
								<Tr>
									<Th>№</Th>
									<Th>Name of club</Th>
									<Th>Memebers</Th>
									<Th display={{ base: 'none', md: 'table-cell' }}>
										Created at
									</Th>
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
				</>
			)}
		</Box>
	);
};

export default Rating;
