import React from 'react'

interface MessageInterface{
    messageContent: string,
    time: string,
    other?: boolean
}

export default function Message({messageContent, time, other} : MessageInterface) {
    return (
        <div className={other ? 'message_row other-message' : 'message_row you-message'}>
            <div className='message-text'>
                {messageContent}
            </div>
            <div className='message-time'>
                {time}
            </div>
        </div>
    )
}
