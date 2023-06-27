const ValidationError = require('./validation.error');
const ForbiddenError = require('./forbidden.error');
const KafkaError = require('./kafka.error');
const DatabaseError = require('./database.error');
const InternalServiceCallError = require('./internal-service-call.error')
module.exports = {
    ValidationError,
    ForbiddenError,
    KafkaError,
    DatabaseError,
    InternalServiceCallError
}