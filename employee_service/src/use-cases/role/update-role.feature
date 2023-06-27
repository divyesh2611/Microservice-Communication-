Feature: Update role.

    Scenario Outline:Try to update role, then it will give error.
        Given roleId:"<roleId>" updateData:'<updateData>' to update role
        When Try to update role
        Then It will give error:"<error>" with message:"<message>" while to updating role

        Examples:
            | roleId                               | updateData                                                         | error           | message                                                |
            |                                      | {"roleName":"Reader","isMaster":false}                             | ValidationError | '"roleId" is required'                                 |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"companyId":"102e9677-3643-4d42-a193-a2e1dd078fdb","isMaster":""} | ValidationError | '"isMaster" must be a boolean'                         |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"companyId":"ra","foundedYear":"2008"}                            | ValidationError | '"companyId" must be a valid GUID'                     |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"roleName":"d","permission":{"getssion":true,"getemployee":true}} | ValidationError | '"roleName" length must be at least 2 characters long' |


    Scenario Outline:Try to update role, then it will give result.
        Given roleId:"<roleId>" updateData:'<updateData>' to update role
        When Try to update role
        Then It will give result:'<result>' while to updating role

        Examples:
            | roleId                               | updateData                                                 | result                                           |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | {"roleName":"writer","permission":{"createEmployee":true}} | { "id": "102e9677-3643-4d42-a193-a2e1dd078fdb" } |