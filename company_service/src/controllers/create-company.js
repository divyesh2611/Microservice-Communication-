module.exports = function makeCreateCompanyAction({
    createCompany,
}) {
    return async function createCompanyAction(req, res) {
        try {
            console.log("createcompanyaction")
            const name = req.body.name;
            const foundedYear = req.body.foundedYear;
            const city = req.body.city;
            const emailAddress = req.body.emailAddress;
            const owner = req.body.owner;

            //create company usecase 

            const result = await createCompany({ name, foundedYear, city, emailAddress, owner })
            res.status(201).json({
                message: {
                    owner: result.createOwner,
                    company: "company is created successfully !!"
                },
                id: result.id
            });
        }
        catch (e) {
            console.log("error", e);
            res.send(`${e} company is not created`);
        }

    }
}