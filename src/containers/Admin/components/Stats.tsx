import {
	Box,
	Flex,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsFilePost, BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';

interface StatsCardProps {
	title: string;
	stat: string;
	icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
	const { title, stat, icon } = props;
	return (
		<Stat
			px={{ base: 2, md: 4 }}
			py={'5'}
			shadow={'xl'}
			border={'1px solid'}
			borderColor={useColorModeValue('gray.800', 'gray.500')}
			rounded={'lg'}
		>
			<Flex justifyContent={'space-between'}>
				<Box pl={{ base: 2, md: 4 }}>
					<StatLabel fontWeight={'medium'}>{title}</StatLabel>
					<StatNumber fontSize={'2xl'} fontWeight={'medium'}>
						{stat}
					</StatNumber>
				</Box>
				<Box
					my={'auto'}
					color={useColorModeValue('gray.800', 'gray.200')}
					alignContent={'center'}
				>
					{icon}
				</Box>
			</Flex>
		</Stat>
	);
}

export default function Stats({ clubs, posts, users }: any) {
	return (
		<Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
				<StatsCard
					title={'Users'}
					stat={users.length}
					icon={<BsPerson size={'3em'} />}
				/>
				<StatsCard
					title={'Posts'}
					stat={posts.length}
					icon={<BsFilePost size={'3em'} />}
				/>
				<StatsCard
					title={'Clubs'}
					stat={clubs.length}
					icon={<FiServer size={'3em'} />}
				/>
			</SimpleGrid>
		</Box>
	);
}
