module.exports = function makeGetAllCompanyAction({
    getAllCompany,
}){
    return async function getAllCompanyAction(req,res){
        try{
            console.log("getAllCompanyAction") 
           const result = await getAllCompany();
            res.status(200).send(result);
        }
        catch(e){
            console.log("error");
            res.status(400).send(`${e} company is not geted`);
        }

    }
}