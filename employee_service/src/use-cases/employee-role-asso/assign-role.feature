Feature: Assign role to employee

    Scenario Outline: Try to asssign role to employee with valid details.
        Given Employee id: "<id>" and role id: "<roleId>"
        When Try to assign role to employee
        Then It will give message: "<message>"

        Examples:
            | id                                   | roleId                               | message          |
            | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | 'Role assigned!' |


    Scenario Outline: Try to asssign role to employee with invalid details.
        Given Employee id: "<id>" and role id: "<roleId>"
        When Try to assign role to employee
        Then It will give error: "<error>" with message: "<message>"

        Examples:
            | id                                   | roleId                               | error           | message                               |
            |                                      | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | ValidationError | '"id" is not allowed to be empty'     |
            | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 |                                      | ValidationError | '"roleId" is not allowed to be empty' |
            | 1                                    | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | ValidationError | '"id" must be a valid GUID'           |
            | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | 2                                    | ValidationError | '"roleId" must be a valid GUID'       |
