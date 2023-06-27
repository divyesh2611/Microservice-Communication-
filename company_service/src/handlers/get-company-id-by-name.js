const {Kafka} = require('kafkajs');
const {getCompanyIdByNameUsecase} = require('../use-cases');
const {KafkaError} = require('../exceptions'); 
const kafka = new Kafka({
    clientId:'microservices',
    brokers:['localhost:9092']
})

async function runConsumer(){
    try{
        const consumer = kafka.consumer({groupId:'Group2'});
        await consumer.subscribe({ topic:'companyid'});
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log("result:",{
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });
                await getCompanyIdByNameUsecase({name:message.value.toString()});
            }
        })
    }
    catch(err){
        console.log(`error:${err}`);
         throw new KafkaError(err);
    }
    
}
runConsumer();

