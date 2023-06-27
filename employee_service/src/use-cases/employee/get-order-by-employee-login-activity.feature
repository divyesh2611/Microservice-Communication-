Feature: Get Employee Login activity By Order



    Scenario Outline:Try to get employee login activity by Order with valid details, then it will give result.
        Given Id:"<id>", orderField:"<orderField>", orderType:"<orderType>" to get employee login activity by order
        When Try to get employee login activity by order
        Then It will give result:'<result>' while getting employee login activity by order

        Examples:
            | id                                   | orderField | orderType | result                                                                                                                                        |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | location   | asc       | {"auth_id":"jkds2-k84re-2ds93","employee_id": "jkds2-k84re-2ds93","location":"ahmedabad","host_ip":"127.0.0.0","host_device":"linux-Rspl285"} |


    Scenario Outline:Try to get employee login activity by Order with invalid details, then it will give result.
        Given Id:"<id>", orderField:"<orderField>", orderType:"<orderType>" to get employee login activity by order
        When Try to get employee login activity by order
        Then It will give error:"<error>" with message:"<message>" while getting employee login activity by order

        Examples:
            | id                                   | orderField | orderType | error           | message                    |
            |                                      | location   | asc       | ValidationError | '"id" is required'         |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb |            | asc       | ValidationError | '"orderField" is required' |
            | 102e9677-3643-4d42-a193-a2e1dd078fdb | location   |           | ValidationError | '"orderType" is required'  |
