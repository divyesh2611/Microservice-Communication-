Feature: Delete Employee Login Activity.

    Scenario Outline:Try to delete employees login activity by authId,then it will give error.
        Given AuthIds:"<authids>" to delete employee login activity
        When Try to delete employees login activity
        Then It will give error:"<error>" with message:"<message>" while deleting employee login activity

        Examples:

            | authids | error           | message                 |
            |         | ValidationError | '"authIds" is required' |

    Scenario Outline:Try to delete employees login activity by authId, then it will give message
        Given AuthIds:'<authids>' to delete employee login activity
        When Try to delete employees login activity
        Then It will give message:"<message>" while deleting employee login activity

        Examples:

            | authids                                       | message                               |
            | {"id":"102e9677-3643-4d42-a193-a2e1dd078fdb"} | 'employees login activity is deleted' |

