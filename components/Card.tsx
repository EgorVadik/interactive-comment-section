import Image from 'next/image'
import { CommentType } from '../pages'

type cardProps = {
    comment: CommentType[0] | replyType
}

export default function Card({ comment }: cardProps) {
    return (
        <>
            <div className='flex relative my-4 text-body text-grayishBlue rounded-lg bg-white shadow-md w-[90%] md:w-full m-auto'>
                <div className='m-auto flex flex-wrap absolute md:relative bottom-2 left-6 md:left-0 md:ml-5 bg-lightgray rounded-lg'>
                    <button className='md:w-full w-auto'>
                        <Image
                            src='/images/icon-plus.svg'
                            alt='Plus Icon'
                            width={12}
                            height={12}
                            className='py-3 mx-3 md:mx-auto'
                        />
                    </button>
                    <p className='px-3 py-0 md:py-1 m-auto text-moderateBlue font-bold'>
                        {comment.score}
                    </p>
                    <button className='md:w-full w-auto'>
                        <Image
                            src='/images/icon-minus.svg'
                            alt='Minus Icon'
                            width={12}
                            height={12}
                            className='py-3 mx-3 md:mx-auto'
                        />
                    </button>
                </div>
                <div className='flex flex-wrap'>
                    <div className='md:w-full w-auto flex p-5'>
                        <Image
                            src={comment.user.image.png}
                            alt={comment.user.username}
                            width={24}
                            height={24}
                            className='mr-5'
                        />
                        <p className='mr-5 text-darkblue font-bold'>
                            {comment.user.username}
                        </p>
                        <p className=''>{comment.createdAt}</p>
                        <button className='ml-auto text-moderateBlue flex font-bold absolute md:relative bottom-2 right-6'>
                            <Image
                                src='/images/icon-reply.svg'
                                alt='Reply Icon'
                                width={12}
                                height={12}
                                className='m-auto mr-1'
                            />
                            Reply
                        </button>
                    </div>
                    <p className='px-5 pb-5 mb-10 md:mb-0'>{comment.content}</p>
                </div>
            </div>
        </>
    )
}

type replyType = {
    id: number
    content: string
    createdAt: string
    score: number
    user: {
        image: {
            png: string
            webp: string
        }
        username: string
    }
}
