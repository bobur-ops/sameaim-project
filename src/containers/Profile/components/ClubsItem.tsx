import { Box, Text } from '@chakra-ui/react'

const ClubsItem = ({ data }) => {
  return (
    <Box py={4} borderBottom={'1px'} borderColor="gray.300">
      <Text fontSize={'lg'}>{data.clubName}</Text>
    </Box>
  )
}

export default ClubsItem
