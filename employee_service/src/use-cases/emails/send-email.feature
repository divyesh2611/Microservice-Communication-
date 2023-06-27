Feature: Send Email To Employee

    Scenario Outline:Try to send email to employee, then it will give error.
        Given Email:"<email>", id:"<id>" to send email to employee
        When Try to send email to employee
        Then It will give error:"<error>" with message:"<message>" while sending email

        Examples:

            | id               | email   | error           | message                        |
            |                  |         | ValidationError | '"employeeId" is required'     |
            | sdfa-3kjs3-akj3q |         | ValidationError | '"emailAddress" is required'   |
            | sdfa-3kjs3-akj3q | divyesh | ValidationError | '"emailAddress" is not valid ' |

    Scenario Outline:Try to send email to employee, then it will give message
        Given Email:"<email>", id:"<id>" to send email to employee
        When Try to send email to employee
        Then It will give message:"<message>" while sending employee

        Examples:
            | id               | email                   | message                     |
            | sdfa-3kjs3-akj3q | divyeshparmar@gmail.com | 'email is send to employee' |

