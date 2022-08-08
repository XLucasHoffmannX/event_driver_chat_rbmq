export default function Channels(instance: any){
    instance.assertQueue('message_q', { durable: false });

    instance.consume('message_q', async(message: any)=>{
        console.log('message->', message.content.toString());
    });
}    