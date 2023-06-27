Feature: Get All Company.

    Scenario Outline: Try to get all companys, then it will give error.

        Given
        When Try to get all companys details
        Then It will give data:<data>
        And give message:<message> getting companys details

        Examples:
            | data | message                |
            | '[]' | 'company is not found' |

    Scenario Outline: Try to get all companys, then it will give data.

        Given
        When Try to get all companys details
        Then It will give data:<data>
        And  give message:<message> getting companys details

        Examples:
            | data         | message         |
            | '[{"id":1}]' | 'companys list' |