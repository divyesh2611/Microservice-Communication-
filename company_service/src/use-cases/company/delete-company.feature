Feature: Delete Company.

    Scenario Outline:Try to delete company, then it will give error.
        Given id:"<id>" to delete company
        When Try to delete company
        Then It will give error:"<error>" with message:"<message>" while deleting company

        Examples:
            | id | error           | message            |
            |    | ValidationError | '"id" is required' |


    Scenario Outline:Try to delete company, then it will deleted.
        Given id:"<id>" to delete company
        When Try to delete company
        Then It will give message:"<message>" while deleting employee
        And It will give message:"<message>" while deleting company

        Examples:
            | id                    | message               |
            | ab123-thjd3j42-34afkl | '"company" is delete' |