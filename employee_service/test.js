const jwt = require('jsonwebtoken');

const token = jwt.sign('divyeshparmar', 'divyesh');

console.log(token)