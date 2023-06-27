Feature: Create New Role.

    Scenario Outline: Try to get role with invalid details,then it will throw error.
        Given roleId:"<roleId>" to get role
        When Try to get role
        Then It will throw error:"<error>" with message:"<message>" while getting role
        Examples:
            | roleId | error           | message                         |
            |        | ValidationError | '"roleId" is required'          |
            | 1      | ValidationError | '"roleId" must be a valid GUID' |


    Scenario Outline: Try to get role with valid details, then it will give message.
        Given roleId:"<roleId>" to get role
        When Try to get role
        Then It will get role with message:'<message>'

        Examples:
            | roleId                               | message                                                                                                                 |
            | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | {"role_id":"32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153","company_id":"32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153","isMaster":false} |
