module.exports = function makeGetOrderByEmployeeLoginActivityAction({
    getOrderByEmployeeLoginActivity
}){
    return async function getOrderByEmployeeLoginActivityAction(req,res){
        try{
            const orderField = req.body.orderField;
            const orderType = req.body.ordertype;
            const id = req.id;
            const result = await getOrderByEmployeeLoginActivity({orderField,id,orderType});
            res.status(200).send(result);

        }
        catch(e){
            console.log(`error:${e}`)
            res.status(400).send(e);
        }
        
    }
}