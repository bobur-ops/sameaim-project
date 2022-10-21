// import { Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Link from 'next/link'

const LogoBox = styled.span``

const Logo = () => {
  const logoSameAim = '/img/logo.svg'

  return (
    <Link scroll={false} href="/">
      <LogoBox>
        <Image src={logoSameAim} alt="logo" />
      </LogoBox>
    </Link>
  )
}

export default Logo
