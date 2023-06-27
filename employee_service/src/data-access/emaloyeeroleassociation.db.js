const Table_Name = 'employee_role_association';
module.exports = function makeEmployeeRoleAssociationDbMethod({
    pool,
    DatabaseError,
    Database
}) {
    return Object.freeze({
        getRoleId,
        assignRole
    })
    async function getRoleId({
        employeeId
    }) {
        try {
            const result = await pool.query(`select * from ${Database}.${Table_Name} where employee_id = $1`, [employeeId]);
            console.log("roleid object :", result.rows);
            return result.rows;
        }
        catch (e) {
            console.log(`error:${e}`);
            throw new DatabaseError(e);
        }
    }
    async function assignRole({
        roleId, id
    }) {
        try {
            const result = await pool.query(`insert into ${Database}.${Table_Name} (employee_id,role_id) values($1,$2)`, [id, roleId]);
            return result.rows[0];
        }
        catch (e) {
            console.log(`error: ${e}`);
            throw new DatabaseError(e);
        }

    }

}