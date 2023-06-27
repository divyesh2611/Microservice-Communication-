Feature: Get Employee Login activity By Serach



    Scenario Outline:Try to get employee login activity by search with valid details, then it will give result.
        Given Id:"<id>", searchField:"<searchField>", dataField:"<dataField>" to get employee login activity search
        When Try to get employee login activity by search
        Then It will give result:'<result>' while getting employee login activity

        Examples:
            | id                                   | searchField | dataField | result                                                                                                                                        |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | location    | ahmedabad | {"auth_id":"jkds2-k84re-2ds93","employee_id": "jkds2-k84re-2ds93","location":"ahmedabad","host_ip":"127.0.0.0","host_device":"linux-Rspl285"} |

    Scenario Outline:Try to get employee login activity by search with invalid details, then it will give result.
        Given Id:"<id>", searchField:"<searchField>", dataField:"<dataField>" to get employee login activity search
        When Try to get employee login activity by search
        Then It will give error:"<error>" with message:"<message>" while getting employee login activity

        Examples:
            | id                                   | searchField | dataField | error           | message                     |
            |                                      | location    | ahmedabad | ValidationError | '"id" is required'          |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb |             | ahmedabad | ValidationError | '"searchField" is required' |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | location    |           | ValidationError | '"dataField" is required'   |
