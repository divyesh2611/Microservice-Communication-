const permissions = {
    'GET:/session': 'getLoginActivity',
    'POST:/employee/loginactivity': 'createLoginginActivity',
    'DELETE:/employee/loginactivity/delete': 'deleteLoginActivity',
    'POST:employee/loginactivity/filter': 'filterLoginActvity',
    'POST:employee/loginactivity/orderby': 'orderLoginActivity',
    'POST:/employee/loginactivity/:search/:data': 'searchLoginActivty',
    'GET:/employee': 'getEmployee',
    'GET:/employee/id': 'getEmployeeById',
    'POST:/role': 'createRole',
    'POST:/role/assing': 'assingRole',
    'GET:/role/:id': 'getRole',
    'DELETE:/role/:id': 'deleteRole',
    'UPDATE:/role/:id': 'updateRole',
    'DELETE:/employee': 'deleteEmployee',
    'DElETE:/employee/v1/:companyid': 'deleteEmployeeByCompanyId',
    'GET:/employee/v1/:companyid': 'getEmployeeByCompanyId',
};

module.exports = permissions;

/* 
    update role set permission = 
    '{
    "getLoginActivity":true,
    "createLoginginActivity":true,
    "deleteLoginActivity":true,
    "filterLoginActvity":true,
    "orderLoginActivity":true,
    "searchLoginActivty":true,
    "getEmployee":true,
    "getEmployeeById":true,
    "createRole":true,
    "getRole":true,
    "assingRole":true,
    "deleteRole":true,
    "updateRole":true,
    "deleteEmployee":true,
    "deleteEmployeeByCompanyId":true,
    "getEmployeeByCompanyId":true
    }',
    where role_id ='fb45ec4a-0799-49cb-8eee-fe21f7d96ddb';
*/

