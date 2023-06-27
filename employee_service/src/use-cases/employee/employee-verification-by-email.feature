Feature: Email Verification By

    Scenario Outline:Try to verify employee by email, then it will give error.
        Given verificationToken:"<verificationToken>" to verify employee
        When Try to verify employees
        Then It will give error:"<error>" with message:"<message>" while verifing employees

        Examples:

            | verificationToken                                | error           | message                           |
            |                                                  | ValidationError | '"verificationToken" is required' |
            | dsafsadwgwasdsd323ras4w4y3dawefwww23wa462-eqt834 | Error           | '"verificationToken" is invalid'  |

    Scenario Outline:Try to verify employee by email, then it will give message
        Given verificationToken:"<verificationToken>" to verify employee
        When Try to verify employees
        Then It will give message:"<message>" while verifing employees

        Examples:

            | verificationToken                                                                   | message                |
            | eyJhbGciOiJIUzI1NiJ9.ZGl2eWVzaHBhcm1hcg.rashcao9EHVFYCUZsMvJLSCVlqF5jqp1Re1avLSWgTs | 'employee is verified' |

