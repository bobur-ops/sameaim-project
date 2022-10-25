import { ColorModeScript } from '@chakra-ui/react';
// eslint-disable-next-line @next/next/no-document-import-in-page
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import theme from '../lib/theme';

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
						integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
						crossOrigin="anonymous"
						referrerPolicy="no-referrer"
					/>
					<link rel="shortcut icon" href="/static/favicon.ico" />
				</Head>
				<body>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
