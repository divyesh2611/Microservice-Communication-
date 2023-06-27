Feature: Upadate Employee

    Scenario Outline:Try to update employee with valid details, then it will give message.
        Given Employee Id:"<id>", updateData:'<updateData>' to update employee
        When Try to update employee
        Then It will give message:"<message>" while updating employee

        Examples:
            | id                                   | updateData                                          | message               |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"name":"karnav","emailAddress":"karnav@gmail.com"} | 'employee is updated' |



    Scenario Outline:Try to update employee with invalid details, then it will give error.
        Given Employee Id:"<id>", updateData:'<updateData>' to update employee
        When Try to update employee
        Then It will give error:"<error>" and message:"<message>" while updating employee

        Examples:
            | id                                   | updateData                                          | error           | message                                                  |
            |                                      | {"name":"karnav","emailAddress":"karnav@gmail.com"} | ValidationError | '"id" is required'                                       |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"emailAddress":"karnav","contactNo":123456789}     | ValidationError | '"emailAddress" must be a valid email'                   |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"contactNo":12,"address":"lunagara"}               | ValidationError | '"contactNo" must be larger than or equal to 1000000000' |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"password":"1234","isVerified":true}               | ValidationError | '"password" length must be at least 5 characters long'   |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"isVerified":"ab234sd","address":"ahmedabad"}      | ValidationError | '"isVerified" must be a boolean'                         |
