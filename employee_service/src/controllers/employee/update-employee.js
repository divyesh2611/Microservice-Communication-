module.exports = function makeUpdateEmployeeAction({
    updateEmployeePatch,
    updateEmployeePut
}) {
    return async function updateEmployeeAction(req, res) {
        try {
            const updateData = req.body;
            const id = req.params.id;
            const method = req.method;
            if (method == 'patch') {
                await updateEmployeePatch({ updateData, id });
                res.status(204).send('employee id updated');
            }
            if (method == 'put') {
                await updateEmployeePut({ updateData, id });
                res.status(204).send('employee id updated');
            }
        }
        catch (e) {
            console.log("error", e);
            res.status(400).send(`${e} employee is not updated`);
        }

    }

}