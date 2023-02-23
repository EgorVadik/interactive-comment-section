import { CommentType } from '../pages'
import Card from './Card'

type commentSectionProps = {
    comments: CommentType[]
    setDeleteModal: any
    setCommentId: any
    setReplyId: any
}

export default function CommentSection({
    comments,
    setDeleteModal,
    setCommentId,
    setReplyId,
}: commentSectionProps) {
    // console.log(comments)
    // console.log('test')

    return (
        <>
            {comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <Card
                            key={comment.id}
                            comment={comment}
                            setDeleteModal={setDeleteModal}
                            setCommentId={setCommentId}
                            setReplyId={setReplyId}
                        />
                        {comment.replies &&
                            comment.replies.length > 0 &&
                            comment.replies.map((reply) => {
                                return (
                                    <div
                                        key={reply.rplyId}
                                        className='flex flex-wrap w-[90%] ml-auto'
                                    >
                                        <div
                                            key={reply.content}
                                            className='w-px bg-lightgrayishblue max-h-full mr-auto'
                                        ></div>
                                        <Card
                                            key={reply.rplyId}
                                            comment={reply}
                                            setDeleteModal={setDeleteModal}
                                            setCommentId={setCommentId}
                                            setReplyId={setReplyId}
                                        />
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </>
    )
}
