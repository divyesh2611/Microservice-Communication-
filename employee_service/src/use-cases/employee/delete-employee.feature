Feature: Delete Employee By Employee Id.

    Scenario Outline:Try to delete employee by employee id,then it will give error.
        Given EmployeeId:"<id>" to delete employee
        When Try to delete employee
        Then It will give error:"<error>" with message:"<message>" while deleting employee

        Examples:

            | id | error           | message            |
            |    | ValidationError | '"id" is required' |

    Scenario Outline:Try to delete employee by employee id, then it will give message
        Given EmployeeId:"<id>" to delete employee
        When Try to delete employee
        Then It will give message:"<message>" while deleting employee

        Examples:

            | id                                   | message               |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | 'employee is deleted' |

