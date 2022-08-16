import React, { SyntheticEvent } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function ChatEmojiArea() {
    /* eslint-disable */
    const [emojiPicker, setEmojiPicker] = React.useState(false);
    const [emojiText, setEmojiText] = React.useState('');

    const handleEmojiPicker = (e: SyntheticEvent, emojiObject: any) => {
        setEmojiText(emojiText + emojiObject.emoji);
    }

    return (
        <div className='chat_window_emoji_area'>
            {
                emojiPicker ?
                    <EmojiPicker
                        onEmojiClick={handleEmojiPicker}
                    />
                    :
                    null
            }
        </div>
    )
}
