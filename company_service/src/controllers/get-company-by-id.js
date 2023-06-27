module.exports = function makeGetCompanyByIdAction({
    getCompanyById,
}){
    return async function getCompanyByIdAction(req,res){
        try{
            console.log('getCompanyByIdAction');
            const id = req.params.id;

           const result = await getCompanyById({id});
            res.status(200).send(result);
        }
        catch(e){
            console.log("error");
            res.status(400).send(`${e} company is not geted`);
        }

    }


}