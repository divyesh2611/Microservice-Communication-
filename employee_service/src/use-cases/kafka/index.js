const {Kafka} = require('kafkajs');
const Joi = require('joi')
const makeCreateProducer = require('./create-producer');
const createProducer = makeCreateProducer({
    Kafka,
    Joi
})

module.exports = {
    createProducer
}