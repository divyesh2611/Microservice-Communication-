Feature: Create New Role.

    Scenario Outline: Try to create master role with invalid details,then it will throw error.
        Given master role details companyId:"<companyId>" to create master role
        When Try to create master role
        Then It will throw error:"<error>" with message:"<message>" while creating master role
        Examples:
            | companyId | error           | message                            |
            |           | ValidationError | '"companyId" is required'          |
            | 1         | ValidationError | '"companyId" must be a valid GUID' |


    Scenario Outline: Try to create master role with valid details, then it will give message.
        Given master role details companyId:"<companyId>" to create master role
        When Try to create master role
        Then It will create master role with result:'<result>'

        Examples:
            | companyId                            | result                                            |
            | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | {"roleId":"32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153"} |
