import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { useGlobalContext } from '../context/GlobalContext'
import Logo from './Logo'

const LinkItem = ({ href, children }) => {
  return (
    <NextLink scroll={false} href={`#${href}`}>
      <Link color="#000" fontWeight="600">
        {children}
      </Link>
    </NextLink>
  )
}

const Navbar = props => {
  const router = useRouter()
  const { user } = useGlobalContext()

  return (
    <Box
      as="nav"
      w="100%"
      {...props}
      mb={'25px'}
      borderBottom={'1px'}
      borderColor={'gray.200'}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.lg"
        wrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box cursor={'pointer'}>
          <Logo />
        </Box>
        {/* <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          gap={71}
          alignItems="center"
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="about">About us</LinkItem>
          <LinkItem href="news">News</LinkItem>
          <LinkItem href="rating">Rating</LinkItem>
          <LinkItem href="create">Create Club</LinkItem>
        </Stack>
        <Box flex={{ base: 1, md: 0 }} mr={5} align="right">
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="#about" passHref>
                  <MenuItem as={Link}>About us</MenuItem>
                </NextLink>
                <NextLink href="#news" passHref>
                  <MenuItem as={Link}>News</MenuItem>
                </NextLink>
                <NextLink href="#rating" passHref>
                  <MenuItem as={Link}>Rating</MenuItem>
                </NextLink>
                <NextLink href="#create" passHref>
                  <MenuItem as={Link}>Create Club</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </Box>
        </Box> */}
        {user === null ? (
          <Button
            onClick={() => router.push('/signup')}
            bg="#7195E1"
            color="white"
            w="fit-content"
          >
            Sign In
          </Button>
        ) : (
          <HStack cursor={'pointer'} onClick={() => router.push('/profile')}>
            <Avatar name={user.fullName} size={'md'} />
            <Text>{user?.fullName}</Text>
          </HStack>
        )}
      </Container>
    </Box>
  )
}

export default Navbar
