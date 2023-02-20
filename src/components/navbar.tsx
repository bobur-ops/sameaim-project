import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";

const LinkItem = ({ href, children }: any) => {
  return (
    <NextLink href={href} passHref>
      <Link color="#000" fontWeight="600">
        {children}
      </Link>
    </NextLink>
  );
};

const Navbar = (props: any) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <Box
      as="nav"
      w="100%"
      {...props}
      borderBottom={"1px"}
      borderColor={"gray.100"}
      position={"fixed"}
      zIndex={10}
      bg={"#ffffff"}
      paddingX={{ base: "20px", md: "0" }}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.lg"
        flexWrap={"wrap"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box cursor={"pointer"}>
          <Logo />
        </Box>
        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          gap={71}
          alignItems="center"
          mt={{ base: 4, md: 0 }}
        >
          {session !== null && status === "authenticated" && (
            <LinkItem passHref href="/my_feed">
              My feed
            </LinkItem>
          )}
          <LinkItem passHref href="/search">
            Search
          </LinkItem>
          <LinkItem passHref href="/recent_posts">
            Recent Posts
          </LinkItem>
          <LinkItem passHref href="/create_club">
            Create Club
          </LinkItem>
        </Stack>
        <Box
          flex={{ base: 1, md: 0 }}
          mr={5}
          justifyContent={"flex-end"}
          display={"flex"}
        >
          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                {session !== null && status === "authenticated" && (
                  <NextLink href="/my_feed" passHref>
                    <MenuItem as={Link}>My Feed</MenuItem>
                  </NextLink>
                )}
                <NextLink href="/search" passHref>
                  <MenuItem as={Link}>Search</MenuItem>
                </NextLink>
                <NextLink href="/recent_posts" passHref>
                  <MenuItem as={Link}>Recent Posts</MenuItem>
                </NextLink>
                <NextLink href="/create_club" passHref>
                  <MenuItem as={Link}>Create Club</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </Box>
        </Box>
        {status === "loading" ? (
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
        ) : session === null || status !== "authenticated" ? (
          <Button
            onClick={() => router.push("/signin")}
            bg="#7195E1"
            color="white"
            w="fit-content"
          >
            Sign In
          </Button>
        ) : (
          <HStack cursor={"pointer"} onClick={() => router.push("/profile")}>
            <Avatar
              name={session?.user?.name?.toString()}
              size={"md"}
              src={session?.user?.image?.toString()}
            />
            <Text
              fontWeight={"semibold"}
              display={{ base: "none", md: "block" }}
            >
              {session?.user?.name}
            </Text>
          </HStack>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
