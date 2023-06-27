module.exports = function makeFilterEmployeeLoginActivityAction({
    filterEmployeeLoginActivity
}){
    return async function filterEmployeeLoginActivityAction(req,res){
        try
        {
            const location = req.body.location;
            const ip = req.body.ip;
            const device  = req.body.device;
            const id = req.id;
            
            const result = await filterEmployeeLoginActivity({ip,location,device,id});
            res.send(result);
        }
        catch(e){
            console.log(`error:${e}`);
            res.status(401).send(e);
        }
    }
}