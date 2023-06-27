Feature: Get Employee By CompanyId

    Scenario Outline:Try to get employee, then it will give error.
        Given EmployeeId:"<id>" to get employee
        When Try to get employee
        Then It will give error:"<error>" with message:"<message>" while getting employee

        Examples:
            | id | error           | message            |
            |    | ValidationError | '"id" is required' |

    Scenario Outline:Try to get employee, then it will give result.
        Given EmployeeId:"<id>" to get employee
        When Try to get employee
        Then It will give result:"<result>" while getting employee

        Examples:
            | id                                   | result                                                                                                                                              |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | '{"employeeName":"divyesh","designation":"SE","address":"ahmedabad","email":"divyesh@gmail.com","contactNo":"9328487662","companyName":"rapidops"}' |
