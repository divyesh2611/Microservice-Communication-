module.exports = function makeDeleteCompanyAction({
    deleteCompany,
}){
    return async function deleteCompanyAction(req,res){
        try{
            console.log("deleteCompanyAction");
            const id = req.params.id;
           
            const result = await deleteCompany({id});
            res.status(200).send("company is deleted");
        }
        catch(e){
            console.log("error",e);
            res.send(`${e} company is not deleted`);
        }

    }
}