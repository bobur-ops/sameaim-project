import { Box, Button, Image, Text } from '@chakra-ui/react';
import { sliceText } from '../../../utils/sliceText';

const NewsItem = ({ data }: any) => {
	return (
		<Box
			borderRadius={12}
			width={280}
			overflow="hidden"
			boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
			pb="40px"
		>
			<Image
				height="186px"
				objectFit="cover"
				alt="Image"
				src={data.image}
				mb={13}
			/>
			<Box pl="8px">
				<Text fontSize="24px" fontWeight="semibold">
					{data.title}
				</Text>
				<Text mb="14px" fontSize="sm">
					{sliceText(data.content, 150)}
				</Text>
				<Button fontSize="sm" bg="#7195E1" color="white">
					Read More
				</Button>
			</Box>
		</Box>
	);
};

export default NewsItem;
