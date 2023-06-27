Feature: Update Company.

    Scenario Outline:Try to update company, then it will give error.
        Given CompanyId:"<id>" updateData:'<updateData>' to update company
        When Try to update company
        Then It will give error:"<error>" with message:"<message>" while to updating company

        Examples:
            | id                                   | updateData                                                     | error           | message                                            |
            |                                      | {"name":"rapidops","foundedYear":2008}                         | ValidationError | '"id" is required'                                 |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"name":"rapidops","foundedYear":"2008"}                       | ValidationError | '"foundedYear" must be a number'                   |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"emailAddress":"divyeshparmar@gmail.com","foundedYear":20000} | ValidationError | '"foundedYear" must be less than or equal to 2100' |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"city":"mumbai","emailAddress":"divyesh"}                     | ValidationError | '"emailAddress" must be a valid email'             |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"name":"r","emailAddress":"divyesh"}                          | ValidationError | '"name" length must be at least 2 characters long' |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"city":"","emailAddress":"divyeshparmar@gmail.com"}           | ValidationError | '"city" is not allowed to be empty'                |



    Scenario Outline:Try to update company, then it will give result.
        Given CompanyId:"<id>" updateData:'<updateData>' to update company
        When Try to update company
        Then It will give result:'<result>' while to updating company

        Examples:
            | id                                   | updateData                             | result                                           |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"name":"rapidops","foundedYear":2008} | { "id": "102e9677-3643-4d42-a193-a2e1dd078fdb" } |