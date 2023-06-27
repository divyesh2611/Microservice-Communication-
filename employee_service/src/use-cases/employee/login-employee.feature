Feature: Create New Employee.

    Scenario Outline: Try to login employee with invalid , then it will throw error.
        Given Employee credential emailAddress:"<emailAddress>", password:"<password>", ip:"<ip>", device:"<device>", location:"<location>" to login employee
        When Try to login employee
        Then It will throw error:"<error>" with message:"<message>" while login employee

        Examples:
            | emailAddress            | password | ip        | device     | location  | error           | message                                |
            |                         | divyesh  | 127.0.0.0 | linux-R285 | ahmedabad | ValidationError | '"emailAddress" is required'           |
            | divyeshparmar@gmail.com |          | 127.0.0.0 | linux-R285 | ahmedabad | ValidationError | '"password" is required'               |
            | divyesh                 | divyesh  | 127.0.0.0 | linux-R285 | ahmedabad | ValidationError | '"emailAddress" must be a valid email' |


    Scenario Outline: Try to login with valid employee with credential, then it will login employee.
        Given Employee credential emailAddress:"<emailAddress>", password:"<password>", ip:"<ip>", device:"<device>", location:"<location>" to login employee
        When Try to login employee
        Then It will login employee and give message:"<message>"

        Examples:
            | emailAddress            | password | ip        | device     | location  | message             |
            | divyeshparmar@gmail.com | divyesh  | 127.0.0.0 | linux-R285 | ahmedabad | 'employee is login' |

