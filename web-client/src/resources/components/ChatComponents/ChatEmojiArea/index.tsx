import React, { SyntheticEvent } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function ChatEmojiArea({emojiArea, currentMessage, setCurrentMessage}: any) {
    /* eslint-disable */
    const [emojiText, setEmojiText] = React.useState('');

    const handleEmojiPicker = (e: SyntheticEvent, emojiObject: any) => {
        setCurrentMessage({message: currentMessage.message+emojiObject.emoji});
    }

    return (
        <div className='chat_window_emoji_area'>
            {
                emojiArea ?
                    <EmojiPicker
                        onEmojiClick={handleEmojiPicker}
                    />
                    :
                    null
            }
        </div>
    )
}
