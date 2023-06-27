Feature: Create New Employee.

  Scenario Outline: Try to create new employee with invalid details, then it will throw error.
    Given Employee details companyName:"<name>", email:"<email>" , designation:"<designation>" , companyName:"<companyName>", contactNo:"<contactNo>", address:"<address>", password:"<password>", isVerified:"<isVerified>" to create new employee
    When Try to create new employee
    Then It will throw error:"<error>" with message:"<message>" while creating new employee

    Examples:
      | name    | designation | email             | companyName | contactNo  | address   | password | isVerified               | error           | message                      |
      |         | SE          | divyesh@gmail.com | Rapidops    | 9328487662 | ahmedabad | divyesh  | employee is not verified | ValidationError | '"name" is required'         |
      | divyesh |             | divyesh@gmail.com | Rapidops    | 9328487662 | ahmedabad | divyesh  | employee is not verified | ValidationError | '"designation" is required'  |
      | divyesh | SE          |                   | Rapidops    | 9328487662 | ahmedabad | divyesh  | employee is not verified | ValidationError | '"emailAddress" is required' |
      | divyesh | SE          | divyesh@gmail.com |             | 9328487662 | ahmedabad | divyesh  | employee is not verified | ValidationError | '"companyName" is required'  |
      | divyesh | SE          | divyesh@gmail.com | Rapidops    |            | ahmedabad | divyesh  | employee is not verified | ValidationError | '"contactNo" is required'    |
      | divyesh | SE          | divyesh@gmail.com | Rapidops    | 9228487662 |           | divyesh  | employee is not verified | ValidationError | '"address" is required'      |
      | divyesh | SE          | divyesh@gmail.com | Rapidops    | 9228487662 | ahmedabad |          | employee is not verified | ValidationError | '"password" is required'     |
      | divyesh | SE          | divyesh@gmail.com | Rapidops    | 9228487662 | ahmedabad | divyesh  |                          | ValidationError | '"password" is required'     |


  Scenario Outline: Try to create new employee with valid details, then it will create new employee.
    Given Employee details companyName:"<name>", email:"<email>" , designation:"<designation>" , companyName:"<companyName>", contactNo:"<contactNo>", address:"<address>", password:"<password>", isVerified:"<isVerified>" to create new employee
    When Try to create new employee
    Then It will create new employee with details:"<newEmployeeDetails>"

    Examples:
      | name    | designation | email             | companyName | contactNo  | address   | password | isVerified               | newEmployeeDetails | message                 |
      | divyesh | SE          | divyesh@gmail.com | Rapidops    | 9328487662 | ahmedabad | divyesh  | employee is not verified | '{"id": "1"}'      | '"employee" is created' |
