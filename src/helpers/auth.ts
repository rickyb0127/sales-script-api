import express from 'express';
import { DB_User } from "../models/DB_User";
import { initDbSchema } from '../db';
const jwt = require('jsonwebtoken');
require("dotenv").config();

export const getTokenForRequest = (req: express.Request) => {
  let token = req.headers['authorization'] || "";
  if(token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  return token;
};

export const decodeToken = async(context: any) => {
  console.log("decoding token");
  const { token } = context;
  const secret = process.env.JWT_SECRET;
  let result;

  jwt.verify(token, secret, async (err: any, decoded: any) => {
    if(!err) {
      result = decoded;
    }
  });

  return result;
};

export const getUserById = async(id: string) => {
  console.log("fetching user by id");

  try {
    await initDbSchema();
    const user = await DB_User.findByPk(id);
    return user;
  } catch(err) {
    console.log("user not found");
    return null;
  }
};

export const getUserByEmail = async(email: string) => {
  console.log("fetching user by email");

  try {
    await initDbSchema();
    
    const user = await DB_User.findOne({
      where: {
        email
      }
    });
    return user;
  } catch(err) {
    console.log("user not found");
    return null;
  }
};