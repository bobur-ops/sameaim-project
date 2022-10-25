import { extendTheme, theme as chakraTheme } from '@chakra-ui/react';

const styles = {
	global: (props) => ({
		body: {
			bg: 'white',
		},
	}),
};

const fonts = {
	...chakraTheme.fonts,
	body: `Montserrat,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
	heading: `Montserrat,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
};

const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

const theme = extendTheme({ config, styles, fonts });
export default theme;
