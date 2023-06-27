module.exports = function makeGetCompanyIdByNameAction({
    getCompanyIdByName,
}){
    return async function getCompanyIdByNameAction(req,res) {
        try{
            const name = req.params.name;
            console.log("getCompanyIdByNameAction")

            const result = await getCompanyIdByName({name});
            console.log(result)
             res.status(200).send(result);
        }
        catch(e){
            console.log(e)
            res.status(400).send(`error${e} company id not geted`);
        }

    }
}
