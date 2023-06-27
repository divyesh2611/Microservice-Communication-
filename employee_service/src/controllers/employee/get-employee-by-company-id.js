module.exports = function makeGetEmployeeByCompanyIdAction({
    getEmployeeByCompanyId,
    Joi
}){
    return async function getEmployeeByCompanyIdAction(req,res){
        try{
            console.log("getEmployeeByCompanyIdAction",req.params)
            const companyId = req.params.companyid;
            
            const result = await getEmployeeByCompanyId({companyId})
            res.status(200).send(result);
        }
        catch(e){
            console.log(`error:${e}`);
            res.status(200).send(`error:${e} employee is not geted`)
        }

    }

}