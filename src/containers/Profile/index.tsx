import {
	Avatar,
	Box,
	Button,
	Heading,
	HStack,
	Icon,
	Link,
	Spinner,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Key } from 'react';
import ClubsItem from './components/ClubsItem';

const Profile = ({ user }: any) => {
	const router = useRouter();

	if (!user)
		return (
			<Box display={'flex'} gap={'10px'}>
				<Text fontWeight={'semibold'}>You are not authenticated</Text>
				<NextLink scroll={false} href={'/'}>
					<Link color={'blue.400'}>Go to home page</Link>
				</NextLink>
			</Box>
		);

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
			<Box>
				<Heading mb={5} as={'h1'}>
					Joined Clubs
				</Heading>
				<Stack flex={'start'}>
					{user?.clubsParticipant?.length ? (
						user?.clubsParticipant?.map(
							(club: { id: Key | null | undefined }) => (
								<NextLink
									scroll={false}
									key={club.id}
									href={`/clubs/${club.id}`}
								>
									<Link>
										<ClubsItem data={club} />
									</Link>
								</NextLink>
							)
						)
					) : (
						<Text fontSize={'2xl'} color="red.400" fontWeight={'medium'}>
							You are not in any club
						</Text>
					)}
				</Stack>
				<Stack mt={70}>
					<Heading as="h1">My Clubs</Heading>
					{user?.clubsOwner?.length ? (
						user?.clubsOwner?.map((club: any) => (
							<ClubsItem isMyClub data={club} key={club.id} />
						))
					) : (
						<NextLink href={'/create_club'}>
							<Link fontSize={'xl'} color={'blue.400'} fontWeight={'semibold'}>
								Create your first club
							</Link>
						</NextLink>
					)}
				</Stack>
			</Box>
			<Box mt={20}>
				<Button
					colorScheme={'red'}
					fontSize="2xl"
					onClick={() => signOut({ callbackUrl: '/' })}
				>
					Log Out
				</Button>
			</Box>
		</Box>
	);
};

export default Profile;
