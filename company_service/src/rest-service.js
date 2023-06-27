const express = require('express');
const controllers = require('./controllers');
const router = express.Router();

function init(){
    initCompanyRoutes();
}
function initCompanyRoutes(){
    router.post('/company',(req,res)=>{
        controllers.createCompanyAction(req,res);
    })
    router.get('/company',(req,res)=>{
        controllers.getAllCompanyAction(req,res);
    })
    router.get('/company/:id',(req,res)=>{
        controllers.getCompanyByIdAction(req,res);
    })
    router.delete('/company/:id',(req,res)=>{
        controllers.deleteCompanyAction(req,res);
    })
    router.patch('/company/:id',(req,res)=>{
        controllers.updateCompanyAction(req,res);
    })
    router.get('/company/v1/:name',(req,res)=>{
        controllers.getCompanyIdByNameAction(req,res);
    })
}
init();
module.exports = router;