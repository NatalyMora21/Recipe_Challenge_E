
import {MyContext}  from "../../context/context";
import { MiddlewareFn } from "type-graphql";
const verify= require('jsonwebtoken');

export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  console.log(authorization);

  if (!authorization) {
    throw new Error("Usuario no tiene permiso");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, "gfdgdfgd");
    console.log(payload);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Usuario no tiene permiso");
  }
  return next();
};