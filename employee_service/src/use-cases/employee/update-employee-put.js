module.exports = function makeUpdateEmployeePut({
    updateEmployeePut,
    Joi,
    ValidationError
}) {
    return async function UpdateEmployeePut({
        updateData
    }) {

        const query = makeUpdateQuery(updateData);
        const result = await updateEmployeePut({ query });
        validateInputData({ id, updateData });
        return result;
    }


    function makeUpdateQuery(updateData) {
        let updateFields = ['name', 'contact_no', 'address', 'designation', 'emailaddress', 'is_varified', 'password'];
        let queryPart = '';
        for (let i = 0; i < updateFields.length; i++) {
            queryPart += updateFields[i] + ' = case ';
            for (let j = 0; j < updateData.length; j++) {
                const value = updateData[j][updateFields[i]] || null;
                queryPart += `when id = ${updateData[j].id} then ${value} `;
            }
            queryPart += ' else ' + updateFields[i] + ' end ';
            if (i != updateFields.size)
                queryPart += ',';
        }
        console.log("queryparmar", queryPart);
        const conditionStatement = makecondition(updateData)
        return queryPart + conditionStatement;
    }
    function makecondition(updateData) {
        let condition = 'where id in (';
        for (let i = 0; i < updateData.length; i++) {
            condition += updateData[i].id;
            if (i != updateData.length - 1)
                condition += ','
        }
        condition += ')'
        return condition;
    }

}