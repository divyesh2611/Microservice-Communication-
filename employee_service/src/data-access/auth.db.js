const Table_Name = 'auth';

module.exports = function makeAuthDbMethod({
    pool,
    database,
    DatabaseError
}) {
    return Object.freeze({
        insertAccessToken,
        updateExpirationTime,
        getDataByEmployeeId,
        getEmployeeLoginActivitySearch,
        getEmployeeLoginActivity,
        getOrderByEmployeeLoginActivity,
        deleteEmployeeLoginActivity
    })
    async function insertAccessToken({
        authId, accessToken, employeeId, expirationTime, hostDeviceName, location, hostIp
    }) {
        try {
            console.log("authid", authId)
            const result = await pool.query(`insert into ${database}.${Table_Name} (auth_id,employee_id, host_device, access_token, expiration_time,location,host_ip) values($1,$2,$3,$4,$5,$6,$7)`, [authId, employeeId, hostDeviceName, accessToken, expirationTime, location, hostIp]);
            return;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }


    }
    async function updateExpirationTime({
        expirationTime, employeeId
    }) {
        try {
            const result = await pool.query(`update ${database}.${Table_Name} set expiration_time = $1 where employee_id = $2 `, [expirationTime, employeeId]);
            return result;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }

    }
    async function getDataByEmployeeId({
        authId
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where auth_id = $1`, [authId]);
            return result.rows[0];
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }

    }
    async function getEmployeeLoginActivitySearch({
        employeeId, search, data
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where employee_id = $1 and ${search} = $2 order by ${search} asc`, [employeeId, data]);
            return result.rows;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }

    }
    async function getEmployeeLoginActivity({
        employeeId
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where employee_id = $1`, [employeeId]);
            return result.rows;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }

    }
    async function getOrderByEmployeeLoginActivity({
        orderField, employeeId, orderType
    }) {
        try {
            const result = await pool.query(`select auth_id,host_device,host_ip,location,expiration_time from ${database}.${Table_Name} where employee_id = $1 order by ${orderField} ${orderType}`, [employeeId]);
            return result.rows;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }
    }
    async function deleteEmployeeLoginActivity({
        authId
    }) {
        try {
            const result = await pool.query(`delete from ${database}.${Table_Name} where auth_id = $1 returning auth_id`, [authId]);
            return result.rows[0].authid;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }
    }
}