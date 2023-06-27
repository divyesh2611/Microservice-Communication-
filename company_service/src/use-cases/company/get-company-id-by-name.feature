Feature: Get Company Id By Name

    Scenario Outline:Try to get company id by name, then it will give error.
        Given name:"<name>" to get company id
        When Try to get company id
        Then It will give error:"<error>" with message:"<message>" while getting company id

        Examples:
            | name | error           | message              |
            |      | ValidationError | '"name" is required' |

    Scenario Outline:Try to get company id by name, then it will give result.
        Given name:"<name>" to get company id
        When Try to get company id
        Then It will give result:"<result>" while getting company id

        Examples:
            | name     | result                        |
            | rapidops | '{"id":"ads21-sdak23-dsamk"}' |

