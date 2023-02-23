import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth, signIn } from '../firebase/firebaseInit'

export default function Login() {
    const [user, setUser] = useState<typeof auth.currentUser>(null)

    useEffect(() => {
        return onAuthStateChanged(auth, (_user) => {
            if (_user) {
                setUser(_user)
            }
        })
    })

    return (
        <>
            {user ? (
                <p className='text-center mt-6'>{`Anonymous-${user.uid.slice(
                    1,
                    10
                )}`}</p>
            ) : (
                <>
                    <button
                        className='h-fit bg-moderateBlue text-white font-medium px-5 py-2 rounded-lg my-5'
                        onClick={() => signIn()}
                    >
                        Login Anonymously
                    </button>
                </>
            )}
        </>
    )
}
