const Table_Name = 'employee'
module.exports = function makeEmployeeDbMethods({
    pool,
    database,
    DatabaseError
}) {
    return Object.freeze({
        createEmployee,
        updateEmployee,
        updateEmployeePut,
        deleteEmployee,
        getEmployee,
        getAllEmployee,
        deleteEmployeeByCompanyId,
        getEmployeeByCompanyId,
        updateEmployeeVerification,
        getEmployeeByEmail

    })
    async function createEmployee({
        name, contactNo, address, designation, companyId, emailAddress, isVarified, password
    }) {
        try {
            const result = await pool.query(`insert into ${database}.${Table_Name} (name,contact_no,address,designation,company_id,password,emailaddress,is_verified) values ($1,$2,$3,$4,$5,$6,$7,$8) returning id`, [name, contactNo, address, designation, companyId, password, emailAddress, isVarified])
            return result.rows[0].id;
        }
        catch (err) {
            console.log(`error:${err}`);
            throw new DatabaseError(err);
        }
    }
    async function updateEmployee({
        updateQuery, updateParams
    }) {
        try {
            await pool.query(`update ${database}.${Table_Name} set ${updateQuery}`, updateParams);
            return;
        }
        catch (err) {
            console.log(`error:${err}`);
            throw new DatabaseError(err);
        }
    }
    async function deleteEmployee({
        id
    }) {
        try {
            const result = await pool.query(`delete from ${database}.${Table_Name} where id = $1 returning id`, [id]);
            return result.rows[0].id;
        }
        catch (err) {
            console.log(`error:${err}`);
            throw new DatabaseError(err);
        }
    }
    async function getEmployee({
        id
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where id = $1 `, [id]);
            return result.rows[0];
        }
        catch (err) {
            console.log(`error:${err}`);
            throw new DatabaseError(err);
        }
    }
    async function getAllEmployee() {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name}  `);
            return result.rows;
        }
        catch (err) {
            console.log(`error:${err}`);
            throw new DatabaseError(err);
        }
    }
    async function deleteEmployeeByCompanyId({
        companyId
    }) {
        try {
            await pool.query(`delete from ${database}.${Table_Name} where company_id = $1 `, [companyId]);
            return;
        }
        catch (err) {
            console.log(`error:${err}`);
            throw new DatabaseError(err);
        }
    }
    async function getEmployeeByCompanyId({
        companyId
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where company_id = $1`, [companyId]);
            return result.rows;
        }
        catch (err) {
            console.log(`error:${err}`);
            throw new DatabaseError(err);
        }

    }
    async function updateEmployeeVerification({
        isVerified, id
    }) {
        try {
            const result = await pool.query(`update ${database}.${Table_Name} set is_verified = $1 where id = $2  returning id`, [isVerified, id])
            return result.rows[0].id;
        }
        catch (err) {
            console.log(`error:${err}`);
            throw new DatabaseError(err);
        }
    }
    async function getEmployeeByEmail({
        emailAddress
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where emailaddress = $1`, [emailAddress]);
            return result.rows[0];
        }
        catch (err) {
            console.log(`error:${err}`);
            throw new DatabaseError(err);
        }

    }
    async function updateEmployeePut({
        query
    }) {
        try {
            const result = await pool.query(`update ${database}.${Table_Name} set ${query}`);
            return;
        }
        catch (err) {
            console.log(`error:${err}`);
            throw new DatabaseError(err);
        }
    }
}