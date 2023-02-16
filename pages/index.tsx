import Head from 'next/head'
import Image from 'next/image'
import { Rubik } from '@next/font/google'
import comments from '../data/data.json'
import CommentSection from '../components/CommentSection'
import Input from '../components/Input'

const rubik = Rubik({ subsets: ['latin'], weight: ['400', '500', '700'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Interactive Comments Section</title>
                <meta
                    name='description'
                    content='Interactive Comments Section'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/images/favicon-32x32.png'
                />
            </Head>
            <main className={rubik.className}>
                <div className='container lg:w-[50%] m-auto'>
                    <CommentSection comments={comments.comments} />
                    <Input />
                </div>
            </main>
        </>
    )
}

export type CommentType = typeof comments.comments
