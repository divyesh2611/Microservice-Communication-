Feature: Delete Employee By Company Id

    Scenario Outline:Try to delete employee by company id, then it will give error.
        Given CompanyId:"<companyId>" to delete employee
        When Try to delete employees
        Then It will give error:"<error>" with message:"<message>" while deleting employees

        Examples:

            | companyId | error           | message                   |
            |           | ValidationError | '"companyId" is required' |

    Scenario Outline:Try to delete employee by company id, then it will give message
        Given CompanyId:"<companyId>" to delete employee
        When Try to delete employees
        Then It will give message:"<message>" while deleting employees

        Examples:

            | companyId                            | message               |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | 'employee is deleted' |

