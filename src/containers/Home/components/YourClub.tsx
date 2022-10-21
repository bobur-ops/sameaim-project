import { Box, Button, Heading, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

const YourClub = () => {
  return (
    <Box>
      <Heading mt={50} align={'center'}>
        Do you want to be a leader of your club?
      </Heading>
      <Stack mt={15}>
        <Text fontSize={'lg'}>
          Create a club and gather all fans of your concept together
        </Text>
        <Text maxW={'500px'}>
          To do this, first you need to{' '}
          <NextLink scroll={false} href="/signup">
            <Link color={'blue'} fontWeight={'semibold'}>
              authorize
            </Link>
          </NextLink>{' '}
          and then press button below, and you will get into the form to create
          new club
        </Text>
        <NextLink scroll={false} href="/create_club">
          <Link>
            <Button colorScheme={'blue'}>Create Club</Button>
          </Link>
        </NextLink>
      </Stack>
    </Box>
  )
}

export default YourClub
