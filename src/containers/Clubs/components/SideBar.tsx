import { Box, Icon, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { IoIosPerson } from 'react-icons/io'

const SideBar = ({ members }) => {
  const data = members.map(item => JSON.parse(item))

  return (
    <Box borderRadius={12}>
      <Text fontSize={'2xl'} fontWeight="semibold" mb={'3'}>
        Members
      </Text>

      {data?.map(item => (
        <NextLink key={item.userId} href={`/users/${item.userId}`}>
          <Link
            color={'blue.500'}
            display={'flex'}
            alignItems="center"
            gap={'5px'}
          >
            <Icon as={IoIosPerson} />
            {item.fullName}
          </Link>
        </NextLink>
      ))}
    </Box>
  )
}

export default SideBar
