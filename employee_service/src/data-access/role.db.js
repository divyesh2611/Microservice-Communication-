const Table_Name = 'role';

module.exports = function makeRoleDbMethod({
    pool,
    Database
}) {
    return Object.freeze({
        createRole,
        deleteRole,
        getRoleById,
        updateRole
    })

    async function createRole({
        permission, roleName, isMaster, companyId
    }) {
        const result = await pool.query(`insert into ${Database}.${Table_Name} (role_name,permission,company_id,is_master) values($1,$2,$3,$4)`, [roleName, permission, companyId, isMaster]);
        return result.rows[0];
    }
    async function getRoleById({
        roleId
    }) {
        const result = await pool.query(`select * from ${Database}.${Table_Name} where role_id = $1`, [roleId]);
        return result.rows[0];
    }
    async function deleteRole({
        roleId
    }) {
        const result = await pool.query(`delete from ${Database}.${Table_Name} where role_id = $1`, [roleId]);
    }
    async function updateRole({
        updateQuery, updateParams
    }) {
        const result = await pool.query(`update from ${Database}.${Table_Name} set ${updateQuery} `, updateParams);
        return;
    }
}