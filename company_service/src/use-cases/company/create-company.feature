Feature: Create New Company.

    Scenario Outline: Try to create new company with invalid details,then it will throw error.
        Given Company details name:"<name>",foundedYear:"<foundedYear>",city:"<city>",emailAddress:"<emailAddress>" to create new company
        When Try to create new company
        Then It will throw error:"<error>" with message:"<message>" while creating new company

        Examples:
            | name     | foundedYear | city      | emailAddress            | owner                                                                                                                                                | error           | message                                                  |
            |          |             |           | divyeshparmar@gmail.com |                                                                                                                                                      | ValidationError | '"name" is required'                                     |
            | rapidops |             |           | divyeshparmar@gmail.com |                                                                                                                                                      | ValidationError | '"foundedYear" is required'                              |
            | rapidops | 2009        |           | divyeshparmar@gmail.com |                                                                                                                                                      | ValidationError | '"city" is required'                                     |
            | rapidops | 2009        | ahmedabad |                         |                                                                                                                                                      | ValidationError | '"emailAddress" is required'                             |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"","emailAddress":"divyesh@gmail.com","address":"","designation":"","password":"","isvarified":"","contactNo":""}                            | ValidationError | '"ownerName" is required'                                |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"divyesh","emailAddress":"","address":"","designation":"","password":"","isvarified":"","contactNo":""}                                      | ValidationError | '"ownerEmailAddress" is required'                        |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"divyesh","emailAddress":"divyesh@gmail.com","address":"","designation":"","password":"","isvarified":"","contactNo":""}                     | ValidationError | '"address" is required'                                  |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"divyesh","emailAddress":"divyesh@gmail.com","address":"lunagara","designation":"","password":"","isvarified":"","contactNo":""}             | ValidationError | '"designation" is required'                              |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"divyesh","emailAddress":"divyesh@gmail.com","address":"lunagara","designation":"SE","password":"","isvarified":"","contactNo":""}           | ValidationError | '"password" is required'                                 |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"divyesh","emailAddress":"divyesh@gmail.com","address":"lunagara","designation":"SE","password":"123","isvarified":"","contactNo":""}        | ValidationError | '"password" length must be at least 5 characters long'   |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"divyesh","emailAddress":"divyesh@gmail.com","address":"lunagara","designation":"SE","password":"123abc","isvarified":"","contactNo":""}     | ValidationError | '"isvarified" is required'                               |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"divyesh","emailAddress":"divyesh@gmail.com","address":"lunagara","designation":"SE","password":"123abc","isvarified":"dsa","contactNo":""}  | ValidationError | '"isvarified" must be a boolean'                         |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"divyesh","emailAddress":"divyesh@gmail.com","address":"lunagara","designation":"SE","password":"123abc","isvarified":true,"contactNo":""}   | ValidationError | '"contactNo" is required'                                |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"divyesh","emailAddress":"divyesh@gmail.com","address":"lunagara","designation":"SE","password":"123abc","isvarified":true,"contactNo":1321} | ValidationError | '"contactNo" must be larger than or equal to 1000000000' |



    Scenario Outline: Try to create new company with already exist company, then it will throw error.
        Given Company details name:"<name>",foundedYear:"<foundedYear>",city:"<city>",emailAddress:"<emailAddress>" to create new company
        And Alread existed company details:"<companyDetails>" with same name
        When Try to create new company
        Then It will throw error:"<error>" with message:"<message>" while creating new company

        Examples:
            | name     | foundedYear | city      | emailAddress            | owner                                                                                                                                                      | companyDetails | error          | message                         |
            | rapidops | 2009        | ahmedabad | divyeshparmar@gmail.com | {"name":"divyesh","emailAddress":"divyesh@gmail.com","address":"lunagara","designation":"SE","password":"123abc","isvarified":true,"contactNo":9328487662} | '{"id":"10"}'  | ForbiddenError | 'company name is already exist' |

    Scenario Outline: Try to create new company with valid details, then it will give message.
        Given Company details name:"<name>",foundedYear:"<foundedYear>",city:"<city>",emailAddress:"<emailAddress>" to create new company
        When Try to create new company
        Then It will create new company with details:"<newCompanyDetails>"

        Examples:
            | name     | foundedYear | city      | owner                                                                                                                                                | newCompanyDetails | emailAddress            |
            | rapidops | 2009        | ahmedabad | {"name":"divyesh","emailAddress":"divyesh@gmail.com","address":"lunagara","designation":"SE","password":"123abc","isvarified":true,"contactNo":1321} | '{"id":1}'        | divyeshparmar@gmail.com |



name: Joi.string().min(5).required(),
foundedYear: Joi.number().integer().min(1800).max(2100).required(),
city: Joi.string().required(),
emailAddress: Joi.string().required(),
owner: Joi.object({
name: Joi.string().required(),
emailAddress: Joi.string().email().required(),
address: Joi.string().required(),
designation: Joi.string().required(),
password: Joi.string().required(),
isvarified: Joi.boolean().required(),
contactno: Joi.number().integer().min(1000000000).max(9999999999).required()
}).required()