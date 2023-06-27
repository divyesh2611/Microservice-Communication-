const {Kafka} = require('kafka');
const useCase = require('../use-cases');
const {KafkaError} = require('../exceptions');
const kafka = new Kafka({
    clientId:'microservices',
    brokers:['localhost:9092']
})

async function runConsumer(){
    try{
        const consumer = kafka.consumer({groupId:'Group1'});
        await consumer.subscribe({ topic:'delete-employee'});
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log("result:",{
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });
                await useCase.employee.deleteEmployeeByCompanyId({id:message.value.toString()});
            }
        })
    }
    catch(e){
        console.log(`error:${e}`);
        throw new KafkaError(e);
    }
    
}
runConsumer();

