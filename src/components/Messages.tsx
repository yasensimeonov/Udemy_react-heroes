import {useMessages} from "../context/MessageContext.tsx";

export default function Messages() {
    const {messages, clearMessages} = useMessages();

    return (
        <div>
            <div className='flex gap-3'>
                <h2 className='text-2xl'>Messages</h2>
                <button className='p-2 bg-slate-700 text-white rounded-lg'
                    onClick={clearMessages}
                >
                    Clear messages
                </button>
            </div>

            {messages.map((message, index) => (
                <div key={index} className='my-2'>
                    {message}
                </div>
            ))}
        </div>
    )
}
