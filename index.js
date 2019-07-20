// This is timer producer
const INTERVAL_DURATION = 60000;


const url = process.env.CLOUDAMQP_URL || "amqp://localhost";
const amqp = require('amqplib');

exports.startTimer = () => {
    amqp.connect(url).then((connection) => {
        connection.createChannel().then((channel) => {
            const exchange = 'quote';
            channel.assertExchange(exchange, 'direct', {durable: false});
            // channel.assertQueue(quote_queue, { durable: true});
            setInterval(() => {
                const message = "Let go get the quote";
                console.log('send to queue', message);
                // channel.sendToQueue(quote_queue, Buffer.from(message),  {
                //     persistent: true
                // });
                channel.publish(exchange, '', Buffer.from(message));
            }, INTERVAL_DURATION)
        });
    }).catch((err) => {
        console.error('Connect amqp failed', err);
    })
}

