import { Box, Heading, HStack, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useGlobalContext } from '../../context/GlobalContext'
import Form from './components/Form'

const CreateClub = () => {
  const { createClub, user, loading } = useGlobalContext()

  const submitClub = data => {
    createClub(data)
  }

  return (
    <Box>
      <Heading mb={10} align="center">
        Create Club
      </Heading>
      {user === null ? (
        <HStack>
          <Text>Please authorize to system before creating a club.</Text>
          <NextLink scroll={false} href={'/'}>
            <Link color={'blue'} fontWeight="semibold">
              Go to Home Page
            </Link>
          </NextLink>
        </HStack>
      ) : (
        <Form create={submitClub} loading={loading} />
      )}
    </Box>
  )
}

export default CreateClub
