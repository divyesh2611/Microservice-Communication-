Feature: Get Employee By CompanyId

    Scenario Outline:Try to get employees, then it will give error.
        Given companyId:"<companyId>" to get employee
        When Try to get employees
        Then It will give error:"<error>" with message:"<message>" while getting employees

        Examples:
            | companyId | error           | message                   |
            |           | ValidationError | '"companyId" is required' |

    Scenario Outline:Try to get employees, then it will give result.
        Given companyId:"<companyId>" to get employee
        When Try to get employees
        Then It will give result:"<result>" while getting employees

        Examples:
            | companyId                            | result                                                                                                                                              |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | '{"employeeName":"divyesh","designation":"SE","address":"ahmedabad","email":"divyesh@gmail.com","contactNo":"9328487662","companyName":"rapidops"}' |

