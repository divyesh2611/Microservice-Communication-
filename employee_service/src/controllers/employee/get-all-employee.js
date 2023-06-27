module.exports = function makeGetAllEmployeeAction({
    getAllEmployee,

}) {
    return async function getAllEmployeeAction(req, res) {
        try {
            const result = await getAllEmployee();
            res.status(200).send(result);
        }
        catch (e) {
            console.log("error", e);
            res.status(400).send(`${e} employee is not geted`);
        }

    }


}