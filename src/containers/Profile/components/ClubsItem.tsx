import { Box, Text } from '@chakra-ui/react';

const ClubsItem = ({ data }: any) => {
	return (
		<Box py={4} borderBottom={'1px'} borderColor="gray.300">
			<Text fontSize={'lg'}>{data.name}</Text>
		</Box>
	);
};

export default ClubsItem;
