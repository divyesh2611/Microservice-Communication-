const ValidationError = require('./validation.error');
const ForbiddenError = require('./forbidden.error');
const DatabaseError = require('./database.error');
const KafkaError = require('./kafka.error');
const InternalServiceCallError = require('./internal-service-call.error');
const AuthorizationFailed = require('./authorization-failed.error');

module.exports = {
    ValidationError,
    ForbiddenError,
    DatabaseError,
    KafkaError,
    InternalServiceCallError,
    AuthorizationFailed
}