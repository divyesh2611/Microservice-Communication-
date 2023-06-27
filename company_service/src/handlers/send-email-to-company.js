const {Kafka} = require('kafkajs');
const {sendEmailUsecase} = require('../use-cases/emails');
const dbMethods = require('../data-access');
const {KafkaError} = require('../exceptions');
const kafka = new Kafka({
    clientId:'microservices',
    brokers:['localhost:9092']
})

async function runConsumer(){
    try{
        const consumer = kafka.consumer({groupId:'Group2'});
        await consumer.subscribe({ topic:'send-email'});
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log("result:",{
                    partition,
                    offset: message.offset,
                    value: JSON.parse(message.value.toString()),
                });
                const  data=JSON.parse(message.value.toString());
                console.log(data);
                const emailAddress = await dbMethods.companyDbMethods.getEmaliAddressByCompanyName({name:data.name})
                await sendEmailUsecase({toEmail:emailAddress});
            }
        })
    }
    catch(err){
        console.log(`error:${err}`);
        throw new KafkaError(err)
    }
    
}
runConsumer();