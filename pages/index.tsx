import Head from 'next/head'
import { Rubik } from '@next/font/google'
import CommentSection from '../components/CommentSection'
import Input from '../components/Input'
import { useEffect, useState } from 'react'
import Login from '../components/Login'
import { db } from '../firebase/firebaseInit'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import DeleteModal from '../components/DeleteModal'

const rubik = Rubik({ subsets: ['latin'], weight: ['400', '500', '700'] })

export default function Home() {
    const [comments, setComments] = useState<CommentType[]>()
    const [deleteModal, setDeleteModal] = useState(false)
    const [commentId, setCommentId] = useState('')
    const [replyId, setReplyId] = useState('')

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, 'comments'), orderBy('createdAt', 'desc')),
                (snap) => {
                    const data: CommentType[] = []
                    snap.forEach(async (doc) => {
                        const dataStructure: CommentType = {
                            id: '',
                            content: '',
                            score: 0,
                            user: '',
                            createdAt: {},
                            userVotes: [],
                            replies: [],
                        }
                        dataStructure.id = doc.id
                        dataStructure.content = doc.data().content
                        dataStructure.score = doc.data().score
                        dataStructure.user = doc.data().user
                        dataStructure.createdAt = doc.data().createdAt

                        doc.data().userVotes
                            ? (dataStructure.userVotes = doc.data().userVotes)
                            : null

                        doc.data().replies
                            ? (dataStructure.replies = doc.data().replies)
                            : null

                        data.push(dataStructure)
                        // console.log(dataStructure)
                    })
                    setComments(data)
                }
            ),
        []
    )

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
                {deleteModal && (
                    <DeleteModal
                        setDeleteModal={setDeleteModal}
                        setCommentId={setCommentId}
                        commentId={commentId}
                        replyId={replyId}
                        setReplyId={setReplyId}
                    />
                )}
                <div className='container xl:w-[60%] m-auto'>
                    <Login />
                    <Input />
                    {comments && comments?.length > 0 ? (
                        <CommentSection
                            comments={comments}
                            setDeleteModal={setDeleteModal}
                            setCommentId={setCommentId}
                            setReplyId={setReplyId}
                        />
                    ) : (
                        <h1 className='text-3xl my-48 text-center'>
                            No Comments Be The First One To Start
                        </h1>
                    )}
                </div>
            </main>
        </>
    )
}

export type CommentType = {
    id: string
    content: string
    score: number
    user: string
    createdAt: any
    userVotes: string[] | []
    replies: ReplyType[] | []
}

export type ReplyType = {
    id: string
    rplyId: string
    content: string
    score: number
    user: string
    createdAt: any
    replyingTo: string
    userVotes: string[] | []
}
