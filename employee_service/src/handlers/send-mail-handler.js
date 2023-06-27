const { Kafka } = require('kafkajs');
const { sendEmail } = require('../use-cases/emails');
const { KafkaError } = require('../exceptions');
const kafka = new Kafka({
    clientId: 'microservices',
    brokers: ['localhost:9092']
})

async function runConsumer() {
    try {
        const consumer = kafka.consumer({ groupId: 'Group1' });
        await consumer.subscribe({ topic: 'send-email' });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log("result:", {
                    partition,
                    offset: message.offset,
                    value: JSON.parse(message.value.toString()),
                });
                let data = JSON.parse(message.value.toString())

                await sendEmail({ toEmail: data.emailAddress });
            }
        })
    }
    catch (e) {
        console.log(`error:${e}`);
        throw new KafkaError(e);

    }

}
runConsumer();