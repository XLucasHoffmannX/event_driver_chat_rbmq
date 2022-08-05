import * as amqp from 'amqplib/callback_api';
import channels from './channels/channels';

export default amqp.connect('amqp://hoffmann:230700@localhost:5672', async(error, connection) => {
    if(error) throw error;
    connection.createChannel((errorChannel, channel)=>{
        if(errorChannel) throw errorChannel;

        /* channels instance */
        channels(channel);
    });
});