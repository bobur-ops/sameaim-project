import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { setCookie } from 'cookies-next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { loginUser } from '../../api/client'
import { useGlobalContext } from '../../context/GlobalContext'

const SignIn = () => {
  const router = useRouter()
  const { getMyUser } = useGlobalContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submitSignin = async () => {
    const data = {
      email,
      password
    }

    if (email && password) {
      try {
        setLoading(true)
        const res = await loginUser(data)
        setCookie('user', res.data.result.userId)
        toast.success(`Logged in as ${res.data.result.fullName}`)
        setLoading(false)
        getMyUser()
        router.push('/')
      } catch (error) {
        setLoading(false)
        toast.error(`${error.response.data.message}`)
      }
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={e => setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                size={'lg'}
                loadingText="Processing..."
                isLoading={loading}
                _hover={{
                  bg: 'blue.500'
                }}
                onClick={submitSignin}
              >
                Sign in
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text align={'center'}>
                Do not have an account?{' '}
                <NextLink scroll={false} href="/signup">
                  <Link color={'blue.400'}>Sign Up</Link>
                </NextLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SignIn
