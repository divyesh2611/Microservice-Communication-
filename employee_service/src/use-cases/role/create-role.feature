Feature: Create New Role.

    Scenario Outline: Try to create new role with invalid details,then it will throw error.
        Given role details permission:'<permission>',roleName:"<roleName>",isMaster:"<isMaster>",companyId:"<companyId>" to create new role
        When Try to create new role
        Then It will throw error:"<error>" with message:"<message>" while creating new role
        Examples:
            | permission                                              | roleName | isMaster | companyId                            | error           | message                    |
            |                                                         | editore  | false    | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | ValidationError | '"permission" is required' |
            | {"getLoginActivity":true,"createLoginginActivity":true} |          | false    | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | ValidationError | '"roleName" is required'   |
            | {"getLoginActivity":true,"createLoginginActivity":true} | editore  |          | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | ValidationError | '"isMaster" is required'   |
            | {"getLoginActivity":true,"createLoginginActivity":true} | editore  | false    |                                      | ValidationError | '"companyId" is required'  |


    Scenario Outline: Try to create new role with valid details, then it will give message.
        Given role details permission:'<permission>',roleName:"<roleName>",isMaster:"<isMaster>",companyId:"<companyId>" to create new role
        When Try to create new role
        Then It will create new role with result:'<result>'

        Examples:
            | permission                                              | roleName | isMaster | companyId                            | result                                            |
            | {"getLoginActivity":true,"createLoginginActivity":true} | editore  | false    | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | {"roleId":"32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153"} |
