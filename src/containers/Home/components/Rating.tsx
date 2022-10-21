import {
  Box,
  ChakraTable,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Rating = ({ data }) => {
  const router = useRouter()

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
            {data?.map((item, index) => (
              <Tr
                cursor="pointer"
                onClick={() => router.push(`/clubs/${item.clubId}`)}
                key={item.clubId}
              >
                <Td>#{index + 1}</Td>
                <Td>{item.clubName}</Td>
                <Td>{item.members.length}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }}>
                  {moment(item.createdAt).format('LL')}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Rating
