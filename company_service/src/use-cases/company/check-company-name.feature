Feature: Check Company Name.

  # Scenario Outline: Try to check company name , then it will give result.

  #   Given Company name:"<name>" to  check company name
  #   When Try to check name
  #   Then It will give error:"<error>" with message:"<message>" while check company name

  #   Examples:
  #     | name | message              | error           |
  #     |      | '"name" is required' | ValidationError |


  Scenario Outline: Try to check company name , then it will give result.

    Given Company name:"<name>" to  check company name
    When Try to check name
    Then It will give message:"<result>" while check company name

    Examples:
      | name     | result        |
      | rapidops | '{"id":"10"}' |
