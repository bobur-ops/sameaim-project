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
  VStack
} from '@chakra-ui/react'
import { deleteCookie, getCookie } from 'cookies-next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { getClubsApi } from '../../api/client'
import { useGlobalContext } from '../../context/GlobalContext'
import ClubsItem from './components/ClubsItem'

const Profile = () => {
  const { user, setUser } = useGlobalContext()
  const [myClubs, setMyClubs] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const getMyClubs = async () => {
    try {
      const userId = getCookie('user')
      setLoading(true)
      const response = await getClubsApi()
      const filteredClubs = response.data.data.filter(
        item => JSON.parse(item.author).userId === userId
      )
      setMyClubs(filteredClubs)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const logOut = () => {
    deleteCookie('user')
    setUser(null)
    router.push('/')
  }

  useEffect(() => {
    getMyClubs()
  }, [])

  if (!user)
    return (
      <Box display={'flex'} gap={'10px'}>
        <Text fontWeight={'semibold'}>You are not authenticated</Text>
        <NextLink scroll={false} href={'/'}>
          <Link color={'blue.400'}>Go to home page</Link>
        </NextLink>
      </Box>
    )

  return (
    <Box>
      <Stack
        gap={'30px'}
        flexDirection={{ base: 'column', md: 'row' }}
        align={'center'}
        mb={30}
      >
        <Box>
          <Avatar size={'2xl'} name={user.fullName} />
        </Box>
        <VStack>
          <Text fontWeight={'semibold'} fontSize={'3xl'}>
            {user.fullName}
          </Text>
          <Text>{user.email}</Text>
        </VStack>
      </Stack>
      <Box>
        <Heading mb={5} as={'h1'}>
          Joined Clubs
        </Heading>
        <Stack flex={'start'}>
          {user.joinedClubs.length ? (
            user.joinedClubs.map(club => (
              <NextLink
                scroll={false}
                key={club.clubId}
                href={`/clubs/${club.clubId}`}
              >
                <Link>
                  <ClubsItem data={club} />
                </Link>
              </NextLink>
            ))
          ) : (
            <Text fontSize={'2xl'} color="red.400" fontWeight={'medium'}>
              You are not in any club
            </Text>
          )}
        </Stack>
        <Stack mt={70}>
          <Heading as="h1">My Clubs</Heading>
          {loading ? (
            <HStack justifyContent={'center'}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </HStack>
          ) : myClubs.length ? (
            myClubs.map(club => (
              <NextLink
                scroll={false}
                key={club.clubId}
                href={`/clubs/${club.clubId}`}
              >
                <Link>
                  <ClubsItem data={club} />
                </Link>
              </NextLink>
            ))
          ) : (
            <Text>There are not clubs</Text>
          )}
        </Stack>
      </Box>
      <Box mt={20}>
        <Button colorScheme={'red'} fontSize="2xl" onClick={logOut}>
          Log Out
        </Button>
      </Box>
    </Box>
  )
}

export default Profile
