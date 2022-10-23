// import { Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';

const LogoBox = styled.span``;

const Logo = () => {
	const logoSameAim = '/img/logo-full.png';

	return (
		<Link scroll={false} href="/">
			<LogoBox>
				<Image src={logoSameAim} alt="logo" w={'60px'} h={'60px'} />
			</LogoBox>
		</Link>
	);
};

export default Logo;
