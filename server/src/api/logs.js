const { Router }=require('express');

const LogEntry=require('../models/LogEntry');

const router=Router();
const API_KEY="mypasswordnotyours"

router.get('/', async (req, res) => {
    try{
        const entries=await LogEntry.find();
        res.json(entries);
    } catch(error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try{
        if(req.get('X-API-KEY') !== API_KEY){
            res.status(401);
            throw new Error('Unauthorized');
        }
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);

    } catch(error){
        console.log(error.constructor.name);
        if(error.name==='ValidationError'){
            res.status(422);
        }
        next(error);
    }
});




module.exports=router;
