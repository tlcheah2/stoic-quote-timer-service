// This is timer producer
const INTERVAL_DURATION = 60000;

const quote_queue = 'quote_queue';

const url = process.env.CLOUDAMQP_URL || "amqp://localhost";
const amqp = require('amqplib');

amqp.connect(url).then((connection) => {
    connection.createChannel().then((channel) => {
        channel.assertQueue(quote_queue, { durable: true});
        setInterval(() => {
            const message = "Let go get the quote";
            console.log('send to queue', message);
            channel.sendToQueue(quote_queue, Buffer.from(message),  {
                persistent: true
            });
        }, INTERVAL_DURATION)
    });
}).catch((err) => {
    console.error('Connect amqp failed', err);
})
