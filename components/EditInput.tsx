import { useState } from 'react'
import { editComment } from '../firebase/firebaseInit'

type editInputProps = {
    content: string
    cid: string
    rplyId: string
    setEdit: any
}

export default function EditInput({
    content,
    cid,
    rplyId,
    setEdit,
}: editInputProps) {
    const [newContent, setNewContent] = useState(content)

    return (
        <div className='grid bg-white rounded-lg'>
            <textarea
                className='w-[95%] m-auto border mb-3 rounded-lg py-2 px-5 resize-none focus:outline-none  focus:border-darkblue'
                placeholder='Add a comment...'
                defaultValue={content}
                onChange={(e) => setNewContent(e.target.value)}
            ></textarea>
            <button
                className='h-fit bg-moderateBlue text-white font-medium px-5 py-3 rounded-lg ml-auto mx-5 mb-10 md:mb-5 w-fit hover:opacity-30'
                onClick={async () => {
                    setEdit(false)
                    await editComment(newContent, cid, rplyId)
                }}
            >
                UPDATE
            </button>
        </div>
    )
}
