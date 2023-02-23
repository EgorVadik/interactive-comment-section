import Image from 'next/image'
import { useState } from 'react'
import { auth, replyComment } from '../firebase/firebaseInit'

type replyProps = {
    // replyComment: (content: string, replyingTo: string, cid: string) => void
    // currentUser: {
    //     image: {
    //         png: string
    //         webp: string
    //     }
    //     username: string
    // }
    replyingTo: string
    cid: string
    setReply: any
}

export default function Reply({
    // currentUser,
    // replyComment,
    replyingTo,
    cid,
    setReply,
}: replyProps) {
    const [content, setContent] = useState('')
    const user = auth.currentUser

    return (
        <div className='flex bg-white p-5 rounded-lg mb-10'>
            <Image
                src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                alt={`Anonymous-${user?.uid.slice(1, 10)}`}
                width={24}
                height={24}
                className='mr-5 w-fit h-fit rounded-full'
            />
            <textarea
                className='w-full col-span-4 border mx-3 rounded-lg py-2 px-5 resize-none focus:outline-none focus:border-darkblue'
                placeholder='Add a comment...'
                defaultValue={`@${replyingTo}, `}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
                className='h-fit bg-moderateBlue text-white font-medium px-5 py-3 rounded-lg hover:opacity-30'
                onClick={() => {
                    if (!user) {
                        alert(
                            'Please login to be able to send comments (just 1 click and you are in)'
                        )
                        return
                    }
                    if (!content) return

                    replyComment(content, user?.uid, replyingTo, cid)
                    setReply(false)
                }}
            >
                REPLY
            </button>
        </div>
    )
}
