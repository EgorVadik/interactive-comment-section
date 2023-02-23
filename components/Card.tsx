import Image from 'next/image'
import { useState } from 'react'
import { auth, updateVote } from '../firebase/firebaseInit'
import { CommentType, ReplyType } from '../pages'
import { formatTimeAgo } from '../utils/timeFormatter'
import EditInput from './EditInput'
import Reply from './Reply'

type cardProps = {
    comment: ReplyType | CommentType
    setDeleteModal: any
    setCommentId: any
    setReplyId: any
}

export default function Card({
    comment,
    setDeleteModal,
    setCommentId,
    setReplyId,
}: cardProps) {
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)
    const user = auth.currentUser

    function handleVote(value: number, commentId: string, rplyId: string) {
        if (!user) return

        if (
            comment.userVotes.includes(user.uid as never) &&
            (value === 1 || value === -1)
        )
            return

        updateVote(value, commentId, user.uid, rplyId)
    }

    return (
        <>
            <div className='flex relative my-4 text-body text-grayishBlue rounded-lg bg-white shadow-md w-[90%] md:w-full m-auto'>
                <div className='m-auto flex flex-wrap w-fit absolute md:relative bottom-2 left-6 md:left-0 md:ml-5 bg-lightgray rounded-lg'>
                    <button
                        className='md:w-full w-auto group'
                        onClick={() =>
                            // @ts-ignore
                            handleVote(1, comment.id, comment.rplyId)
                        }
                    >
                        <svg
                            width='12'
                            height='12'
                            xmlns='http://www.w3.org/2000/svg'
                            className='my-3 mx-3 md:mx-auto'
                        >
                            <path
                                className='group-hover:fill-moderateBlue'
                                d='M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z'
                                fill='#C5C6EF'
                            />
                        </svg>
                    </button>
                    <p className='px-3 py-0 md:py-1 m-auto text-moderateBlue font-bold'>
                        {comment.score}
                    </p>
                    <button
                        className='md:w-full w-auto group'
                        onClick={() =>
                            // @ts-ignore
                            handleVote(-1, comment.id, comment.rplyId)
                        }
                    >
                        <svg
                            width='11'
                            height='3'
                            xmlns='http://www.w3.org/2000/svg'
                            className='my-3 mx-3 md:mx-auto '
                        >
                            <path
                                className='group-hover:fill-moderateBlue'
                                d='M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z'
                                fill='#C5C6EF'
                            />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-wrap md:flex-1 flex-auto'>
                    <div className='w-full flex p-5'>
                        <Image
                            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                            alt={comment.user}
                            width={24}
                            height={24}
                            className='mr-5 w-fit h-fit rounded-full'
                        />
                        <p className='md:mr-5 text-darkblue h-fit font-bold mr-auto'>
                            {`Anonymous-${comment.user.slice(1, 10)}`}
                        </p>
                        <p className='h-fit w-fit'>
                            {comment.createdAt &&
                                formatTimeAgo(comment.createdAt.toDate())}
                        </p>
                        {user?.uid === comment.user ? (
                            <>
                                <button
                                    className='ml-auto my-auto text-softRed flex font-bold absolute md:relative bottom-2 right-20 md:right-6 hover:opacity-30'
                                    onClick={() => {
                                        // @ts-ignore
                                        if (comment.rplyId) {
                                            // @ts-ignore
                                            setReplyId(comment.rplyId)
                                        }
                                        setCommentId(comment.id)
                                        setDeleteModal(true)
                                    }}
                                >
                                    <Image
                                        src='/images/icon-delete.svg'
                                        alt='Delete Icon'
                                        width={12}
                                        height={12}
                                        className='m-auto mr-1'
                                    />
                                    Delete
                                </button>
                                <button
                                    className='ml-3 my-auto text-moderateBlue flex font-bold absolute md:relative bottom-2 right-6 hover:opacity-30'
                                    onClick={() => setEdit(!edit)}
                                >
                                    <Image
                                        src='/images/icon-edit.svg'
                                        alt='Edit Icon'
                                        width={12}
                                        height={12}
                                        className='m-auto mr-1'
                                    />
                                    Edit
                                </button>
                            </>
                        ) : (
                            <button
                                className='ml-auto my-auto text-moderateBlue flex font-bold absolute md:relative bottom-2 right-6 hover:opacity-30'
                                onClick={() => setReply(!reply)}
                            >
                                <Image
                                    src='/images/icon-reply.svg'
                                    alt='Reply Icon'
                                    width={12}
                                    height={12}
                                    className='m-auto mr-1'
                                />
                                Reply
                            </button>
                        )}
                    </div>
                    {edit ? (
                        <div className='w-full'>
                            <EditInput
                                content={comment.content}
                                cid={comment.id}
                                // @ts-ignore
                                rplyId={comment.rplyId}
                                setEdit={setEdit}
                            />
                        </div>
                    ) : (
                        <p className={`px-5 pb-5 md:mb-0 break-all mb-10`}>
                            {comment.content}
                        </p>
                    )}
                </div>
            </div>
            {reply && (
                <div className='w-[90%] md:w-full m-auto'>
                    <Reply
                        replyingTo={`Anonymous-${comment.user.slice(1, 10)}`}
                        cid={comment.id}
                        setReply={setReply}
                    />
                </div>
            )}
        </>
    )
}
