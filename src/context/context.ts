const jwt= require('jsonwebtoken');
import { Request, Response } from "express";

module.exports.verifyUser = async (req:any)=>{
    //console.log(req.headers);

    try{

        req.email=null;
        const beareHeader = req.headers.authorization;
        //console.log(beareHeader);
        if(beareHeader){
            const token=beareHeader.split(' ')[1];
            const payload=jwt.verify(token,'gfdgdfgd');
            req.email=payload.email;
            return(req.email);
        }
        if(!req.mail){
            throw new Error('Acceso denegado')
        }
    }
    catch(error){
        console.log(error);
    }
}

export interface MyContext {
    req: Request;
    res: Response;
    payload?: { userId: string };
  }