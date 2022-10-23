import {
	Box,
	Button,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Router from 'next/router';
import { trpc } from '../../../utils/trpc';

const ClubsItem = ({ data, isMyClub = false }: any) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { mutate } = trpc.club.deleteClub.useMutation({
		onSettled: (data) => {
			Router.reload();
		},
	});

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			py={4}
			borderBottom={'1px'}
			borderColor="gray.300"
		>
			<NextLink href={`/clubs/${data.id}`}>
				<Link>
					<Text flex={1} fontSize={'lg'}>
						{data.name}
					</Text>
				</Link>
			</NextLink>
			{isMyClub && (
				<>
					<Button colorScheme={'red'} onClick={onOpen}>
						Delete club
					</Button>
					<Modal isOpen={isOpen} onClose={onClose}>
						<ModalOverlay />
						<ModalContent>
							<ModalBody>
								<Text>Are you sure to delete club {data.name}</Text>
							</ModalBody>

							<ModalFooter>
								<Button colorScheme="green" mr={3} onClick={onClose}>
									No
								</Button>
								<Button
									onClick={() => mutate({ clubId: data.id })}
									colorScheme={'red'}
								>
									Yes
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</>
			)}
		</Box>
	);
};

export default ClubsItem;
