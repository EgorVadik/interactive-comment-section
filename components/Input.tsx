import { onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { addComment, auth } from '../firebase/firebaseInit'

export default function Input() {
    const [content, setContent] = useState('')
    const [coolDown, setCoolDown] = useState(0)

    const [user, setUser] = useState<typeof auth.currentUser>(null)

    useEffect(() => {
        return onAuthStateChanged(auth, (_user) => {
            if (_user) {
                setUser(_user)
            }
        })
    })

    useEffect(() => {
        if (coolDown === 5) {
            let interval = setInterval(() => {
                setCoolDown((prev) => {
                    if (prev === 0) {
                        clearInterval(interval)
                    }
                    return prev - 1
                })
            }, 1000)
        }
    }, [coolDown])

    return (
        <div className='flex w-[90%] md:w-full m-auto bg-white p-5 rounded-lg my-5'>
            <Image
                src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                alt={`Anonymous-${user?.uid.slice(1, 10)}`}
                width={24}
                height={24}
                className='mr-5 w-fit h-fit rounded-full'
            />
            <textarea
                className='w-full col-span-4 border mx-3 rounded-lg py-2 px-5 resize-none focus:outline-none focus:bottom-1 focus:border-darkblue'
                placeholder='Add a comment...'
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {coolDown > 0 ? (
                <span>{`Cooldown: ${coolDown} Secs`}</span>
            ) : (
                <button
                    className='h-fit bg-moderateBlue text-white font-medium px-5 py-3 rounded-lg hover:opacity-30'
                    disabled={coolDown > 0}
                    onClick={() => {
                        if (!content) return
                        if (!user) {
                            alert(
                                'Please login to be able to send comments (just 1 click and you are in)'
                            )
                            return
                        }

                        setCoolDown(5)
                        addComment(content, user.uid)
                    }}
                >
                    SEND
                </button>
            )}
        </div>
    )
}
