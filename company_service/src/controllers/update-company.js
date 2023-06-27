module.exports = function makeUpdateCompanyAction({
    updateCompany,
}) {
    return async function updateCompanyAction(req, res) {
        try {
            console.log("updateCompanyAction");
            console.log("**********req.body**********", req.body);
            const id = req.params.id;
            const updateData = req.body;
            console.log("******updateData JSON.Stingify******", JSON.stringify(updateData));

            const result = await updateCompany({ updateData, id });
            res.status(200).json({ message: 'Resource updated successfully' });
            res.end();
        }
        catch (e) {
            console.log("error", e);
            res.status(400).send(`${e} company is not updated`);
        }

    }
}