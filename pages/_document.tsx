import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='en'>
            <Head />
            <body className='bg-lightgray grid min-h-screen items-center content-center'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
