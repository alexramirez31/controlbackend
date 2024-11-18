const express = require('express');
const router = express.Router();

const mySqlconnection = require('../conecction/connection');
const jwt = require('jsonwebtoken');
router.get('/',(req,res)=>{
    mySqlconnection.query('select * from usuarios',(err,rows,fields)=>{
        if (!err) {
            res.json(rows);
        }else{
            console.log(err);
        }
    }) 
});

router.post('/singin',(req,res) =>{
    const {nombre,password} = req.body;
    mySqlconnection.query('select nombre,rol from usuarios where nombre=? and password=?',
    [nombre,password],
    (err,rows,fields)=>{
        if(!err){
            if (rows.length >0) {
                let data = JSON.stringify(rows[0]);
                const token =  jwt.sign(data,'stil');
                res.json({token});
            }else{
                res.json('Usuario o clave incorrectos');
            }
        }else{
            console.log(err);
        }
    })
    
});

router.post('/test',verifyToken,(req,res)=>{
    console.log(req.data);
    res.json('Información secreta');
});

function verifyToken(req,res,next){
    if(!req.headers.authorization) return res.status(401).json('No authorizado');

    const token = req.headers.authorization.substr(7);

    if(token !== ''){
        const content = jwt.verify(token,'stil');
        console.log(content)
        req.data = content;
        next();
    }else{
        res.status(401).json('Token vacio');
    }
} 

module.exports = router;