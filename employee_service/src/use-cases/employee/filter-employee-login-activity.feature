Feature: Filter Employee Login Activity.


  Scenario Outline: Try to filter employee login activity with valid details, then it will give me employee login activity data.
    Given Employee login activity employeeId:"<employeeId>", ip:"<ip>", location:"<location>", device:"<device>" to filter employee login activity
    When Try to filter employee login activity
    Then It will filter employee login activity with details:'<EmployeeLoignActivityDetails>'

    Examples:
      | employeeId           | ip        | device     | location  | EmployeeLoignActivityDetails                                                                                                                            |
      | kjld33-jlkew97-j4da3 | 127.0.0.0 | linux-R285 | Ahmedabad | { "auth_id": "jkdsk-32jka-3rw8h", "employee_id": "kjsjlie-ewrwmwe-rwd3", "host_device": "linux-R285", "host_ip": "127.0.0.0", "location": "Ahmedabad" } |


  Scenario Outline: Try to filter employee login activity with invalid details, then it will give me error.
    Given Employee login activity employeeId:"<employeeId>", ip:"<ip>", location:"<location>", device:"<device>" to filter employee login activity
    When Try to filter employee login activity
    Then It will give me error:"<error>" with message:"<message>"

    Examples:
      | employeeId           | ip        | device     | location  | EmployeeLoignActivityDetails                                                                                                                            |
      | kjld33-jlkew97-j4da3 | 127.0.0.0 | linux-R285 | Ahmedabad | { "auth_id": "jkdsk-32jka-3rw8h", "employee_id": "kjsjlie-ewrwmwe-rwd3", "host_device": "linux-R285", "host_ip": "127.0.0.0", "location": "Ahmedabad" } |
