import { CommentType } from '../pages'
import Card from './Card'

type commentSectionProps = {
    comments: CommentType
}

export default function CommentSection({ comments }: commentSectionProps) {
    return (
        <>
            {comments.map((comment) => {
                return (
                    <>
                        <Card key={comment.id} comment={comment} />
                        {comment.replies.length > 0 &&
                            comment.replies.map((reply) => {
                                return (
                                    <div
                                        key={reply.id}
                                        className='flex w-[95%] md:w-full'
                                    >
                                        <div className='w-px bg-lightgrayishblue max-h-full mx-6 '></div>
                                        <Card key={reply.id} comment={reply} />
                                    </div>
                                )
                            })}
                    </>
                )
            })}
        </>
    )
}
