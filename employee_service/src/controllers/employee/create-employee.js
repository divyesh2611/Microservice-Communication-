module.exports = function makeCreateEmployeeAction({
    createEmployee,
}) {
    return async function createEmployeeAction(req, res) {
        try {
            console.log("req", req.body)
            const name = req.body.name;
            const companyName = req.body.companyName;
            const contactNo = req.body.contactNo;
            const address = req.body.address;
            const designation = req.body.designation;
            const password = req.body.password;
            const emailAddress = req.body.emailAddress;
            const isVarified = req.body.isVarified;

            const id = await createEmployee({ name, contactNo, address, designation, companyName, password, emailAddress, isVarified })
            res.status(200).json({
                message: "employee is created successfully !!",
                employeeid: id,
            });
            res.end();
        }
        catch (e) {
            console.log("error", e);
            res.send(`${e} employee is not created`);
        }

    }

}