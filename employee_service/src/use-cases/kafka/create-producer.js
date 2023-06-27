module.exports = function makeCreateProducer({
Kafka,
Joi
}){
    return async function createProducer({
        topic,message
    }){
       
        const stringMessage = JSON.stringify(message);
        validateInputData({topic,stringMessage});
        const kafka = new Kafka({
            clientId:'microservices',
            brokers:['localhost:9092']
        })
        const producer = kafka.producer();
    
        await producer.connect();
        
            await producer.send({
                topic: topic,
                messages: [  
                    { value:JSON.stringify(message) }
                ]
            })
        
    }
    function validateInputData({stringMessage,topic}){
        const schema = Joi.object({
            stringMessage:Joi.string().required(),
            topic:Joi.string().required(),
        });
        const {error} =  schema.validate({stringMessage,topic});
        if(error){
            throw new ValidationError(error.details[0].message);
        }
    }
}