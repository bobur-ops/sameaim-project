import {
	Box,
	Button,
	Input,
	Link,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Key, useState } from 'react';
import ClubsItem from '../Profile/components/ClubsItem';

const Search = ({ setSearchQuery, clubs, isLoading }: any) => {
	const [query, setQuery] = useState('');
	return (
		<Box>
			<Stack>
				<Input
					pr="4.5rem"
					placeholder="Enter password"
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button onClick={() => setSearchQuery(query)}>Search</Button>
			</Stack>
			<Box>
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
					<Stack flex={'start'} mt={6}>
						{clubs?.length ? (
							clubs?.map((club: { id: Key | null | undefined }) => (
								<NextLink
									scroll={false}
									key={club.id}
									href={`/clubs/${club.id}`}
								>
									<Link>
										<ClubsItem data={club} />
									</Link>
								</NextLink>
							))
						) : (
							<Text fontSize={'2xl'} color="red.400" fontWeight={'medium'}>
								No Results
							</Text>
						)}
					</Stack>
				)}
			</Box>
		</Box>
	);
};

export default Search;
