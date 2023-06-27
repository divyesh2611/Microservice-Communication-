Feature: Get Company By Id

    Scenario Outline:Try to get company, then it will give error.
        Given id:"<id>" to get company
        When Try to get company
        Then It will give error:"<error>" with message:"<message>" while getting company

        Examples:
            | id | error           | message            |
            |    | ValidationError | '"id" is required' |

    Scenario Outline:Try to get company, then it will give result.
        Given id:"<id>" to get company
        When Try to get company
        Then It will give result:"<result>" while getting company

        Examples:
            | id                     | result                                                               |
            | aklds2-k342nki-67nsdsn | '{"companyName":"rapidops","foundedYear":"2009","city":"ahmedabad"}' |

