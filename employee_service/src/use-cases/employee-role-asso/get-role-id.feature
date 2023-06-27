Feature: Get Role To Employee

    Scenario Outline: Try to get role id with valid details.
        Given Employee id:"<id>" to get role id
        When Try to get role id
        Then It will give message:"<result>"

        Examples:
            | id                                   | result                                 |
            | 32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153 | '32d6a6d2-72f3-4c4d-bc05-f1f3ff7b6153' |


    Scenario Outline: Try to get role id  with invalid details.
        Given Employee id:"<id>" to get role id
        When Try to get role id
        Then It will give error:"<error>" with message:"<message>"

        Examples:
            | id | error           | message                           |
            |    | ValidationError | '"id" is not allowed to be empty' |
            | 1  | ValidationError | '"id" must be a valid GUID'       |
