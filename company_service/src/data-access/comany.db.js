const Table_Name = 'company';
module.exports = function makeCompanyDbMethods({
    pool,
    database,
    DatabaseError
}) {
    return Object.freeze({
        createCompany,
        updateCompany,
        deleteCompany,
        getCompany,
        getAllCompany,
        getCompanyIdByName,
        checkCompanyName,
        getEmaliAddressByCompanyName
    })
    async function createCompany({
        name, foundedYear, city, emailAddress, ownerName
    }) {
        try {
            const result = await pool.query(`insert into ${database}.${Table_Name} (name,founded_year,city,emailaddress,owner) values ($1,$2,$3,$4,$5) returning id`, [name, foundedYear, city, emailAddress, ownerName]);
            return result.rows[0].id;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }

    }
    async function updateCompany({
        updateQuery, updateParams
    }) {
        try {
            const result = await pool.query(`update ${database}.${Table_Name} set ${updateQuery}`, updateParams);
            return result.rows[0].id;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }

    }
    async function deleteCompany({
        id
    }) {
        try {
            const result = await pool.query(`delete from ${database}.${Table_Name} where id = $1 returning id`, [id]);
            return result.rows[0].id;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }

    }
    async function getCompany({
        id
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where id = $1 `, [id]);
            return result.rows[0];
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }

    }
    async function getAllCompany() {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name}  `);
            return result.rows;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }
    }
    async function getCompanyIdByName({
        name
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where name = $1`, [name]);
            return result.rows[0].id;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }

    }
    async function checkCompanyName({
        name
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where name =$1 `, [name]);
            return result.rows.length;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }
    }
    async function getEmaliAddressByCompanyName({
        name
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where name = $1`, [name]);
            return result.rows[0].emailaddress;
        }
        catch (err) {
            console.log(`error ${err}`);
            throw new DatabaseError(err);
        }
    }
}