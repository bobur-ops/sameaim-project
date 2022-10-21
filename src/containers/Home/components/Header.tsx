import { Box, Button, Image, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

const ImageGradient = styled.div`
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0) 0.01%,
    #ffffff 100%
  );
  width: 100%;
  height: 25%;
  position: absolute;
  z-index: 2;
  bottom: 0;
`

const ImageOverlay = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  position: absolute;
  border-radius: 10px;
  background: #000;
  z-index: 0;
  opacity: 0.4;
`

const Header = () => {
  const headerImage = '/img/header.jpg'
  return (
    <div>
      <Box position="relative" mb={114}>
        <ImageOverlay />
        <ImageGradient />
        <Image
          bgBlendMode="darken"
          src={headerImage}
          alt="Header Image"
          borderRadius={10}
          height={{ base: '486px', md: '100%' }}
          objectFit="cover"
        />
        <Box
          position="absolute"
          top={{ base: '40px', md: '112px' }}
          left={{ base: '20px', md: '57px' }}
        >
          <Text
            color="white"
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight="semibold"
          >
            Same Aim
          </Text>
          <Text
            color="white"
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="semibold"
          >
            Sub-title about Same Aim
          </Text>
          <Text
            color="white"
            fontSize={{ base: 'sm', md: 'md' }}
            maxW={495}
            mt={{ base: '10px', md: '43px' }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s
          </Text>
          <Button bg="#7195E1" color="white" mt={{ base: 5, md: 10 }}>
            Get Started
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default Header
