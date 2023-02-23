import { initializeApp } from 'firebase/app'
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    increment,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from 'firebase/firestore'
import { getAuth, signInAnonymously } from 'firebase/auth'
// @ts-ignore
import { v4 } from 'uuid'
import { ReplyType } from '../pages'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export async function signIn() {
    try {
        await signInAnonymously(auth)
    } catch (error) {
        console.log(error)
    }
}

export async function addComment(content: string, user: string) {
    await addDoc(collection(db, 'comments'), {
        content,
        score: 0,
        user,
        createdAt: serverTimestamp(),
        userVotes: [],
    })
}

export async function updateVote(
    value: number,
    commentId: string,
    userId: string,
    replyId: string
) {
    const commentRef = doc(db, 'comments', commentId)

    if (replyId) {
        const comment = await getDoc(commentRef)
        const replies = comment.data()?.replies

        const idx = replies.findIndex(
            (rply: ReplyType) => rply.rplyId === replyId
        )

        replies[idx].score += value
        replies[idx].userVotes.push(userId)

        await updateDoc(commentRef, {
            replies,
        })
        return
    }

    await updateDoc(commentRef, {
        score: increment(value),
        userVotes: arrayUnion(userId),
    })
}

export async function replyComment(
    content: string,
    user: string,
    replyingTo: string,
    commentId: string
) {
    const commentRef = doc(db, 'comments', commentId)

    await updateDoc(commentRef, {
        replies: arrayUnion({
            id: commentId,
            rplyId: v4(),
            content,
            score: 0,
            user,
            replyingTo,
            createdAt: Timestamp.now(),
            userVotes: [],
        }),
    })
}

export async function deleteComment(cid: string, replyId: string) {
    const commentRef = doc(db, 'comments', cid)
    if (replyId) {
        const comment = await getDoc(commentRef)
        const replies = comment.data()?.replies

        await updateDoc(commentRef, {
            replies: replies.filter(
                (reply: ReplyType) => reply.rplyId !== replyId
            ),
        })
        return
    }
    await deleteDoc(commentRef)
}

export async function editComment(
    content: string,
    cid: string,
    rplyId: string
) {
    const commentRef = doc(db, 'comments', cid)
    if (rplyId) {
        const comment = await getDoc(commentRef)
        const replies = comment.data()?.replies

        replies[
            replies.findIndex((rply: ReplyType) => rply.rplyId === rplyId)
        ].content = content

        await updateDoc(commentRef, {
            replies,
        })
        return
    }

    await updateDoc(commentRef, {
        content,
    })
}
