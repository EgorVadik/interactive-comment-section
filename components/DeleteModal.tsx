import { deleteComment } from '../firebase/firebaseInit'

type deleteModalProps = {
    setDeleteModal: any
    setCommentId: any
    commentId: string
    setReplyId: any
    replyId: string
}

export default function DeleteModal({
    setDeleteModal,
    setCommentId,
    commentId,
    replyId,
    setReplyId,
}: deleteModalProps) {
    return (
        <>
            <div className='bg-black min-h-screen fixed z-30 inset-0 bg-opacity-30'>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='bg-white p-8 rounded-lg w-[350px]'>
                        <h2 className='font-medium text-xl'>Delete Comment</h2>
                        <p className='text-grayishBlue py-5'>
                            Are you sure you want to delete this comment? This
                            will remove the content and cant be undone
                        </p>
                        <div className='grid grid-cols-2 gap-4 text-white font-medium'>
                            <button
                                className='bg-grayishBlue rounded-lg px-4 py-3 uppercase'
                                onClick={() => {
                                    setCommentId('')
                                    setDeleteModal(false)
                                }}
                            >
                                no, cancel
                            </button>
                            <button
                                className='bg-softRed rounded-lg px-4 py-3 uppercase'
                                onClick={() => {
                                    setDeleteModal(false)
                                    deleteComment(commentId, replyId).then(
                                        () => {
                                            setCommentId('')
                                            setReplyId('')
                                        }
                                    )
                                }}
                            >
                                yes, delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
