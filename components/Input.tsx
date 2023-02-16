import Image from 'next/image'

export default function Input() {
    return (
        <div className='flex bg-white p-5 rounded-lg mb-10'>
            <Image
                src={'/images/avatars/image-juliusomo.png'}
                alt={'username'}
                width={24}
                height={24}
                className='mr-5 w-fit h-fit'
            />
            <textarea
                className='w-full col-span-4 border mx-3 rounded-lg py-2 px-5 resize-none focus:outline-none focus:bottom-1 focus:border-darkblue'
                placeholder='Add a comment...'
            ></textarea>
            <button className='h-fit bg-moderateBlue text-white font-medium px-5 py-3 rounded-lg'>
                SEND
            </button>
        </div>
    )
}
