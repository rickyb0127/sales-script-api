import { GraphQLError } from "graphql";
import { Resolvers, User } from "../@types/apiTypes";
import { decodeToken, getUserByEmail, getUserById } from "../helpers/auth";
import { DB_User } from "../models/DB_User";
import { initDbSchema } from "../db";
import { Roles } from "../enums";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export const resolvers: Resolvers = {
  Query: {
    user: async (_parent, _args, context) => {
      const decoded = await decodeToken(context);

      if(decoded) {
        try {
          const user = await getUserById(decoded['user_id']);
          const data = user?.dataValues;
          const returnObj = {
            ...data,
            settings: JSON.parse(JSON.stringify(user!.settings))
          } as User;

          return returnObj;
        } catch(err) {
          throw new GraphQLError('User not found', {
            extensions: {
              status: 401
            }
          });
        }
      }

      throw new GraphQLError('Token not valid', {
        extensions: {
          status: 403
        }
      });
    },
    login: async (_parent, args: any) => {
      const user = await getUserByEmail(args.email);

      if(user && (await bcrypt.compare(args.password, user.password))) {
        const token = jwt.sign(
          { user_id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );

        return token;
      }

      throw new GraphQLError('Incorrect email or password', {
        extensions: {
          status: 400
        }
      });
    }
  },
  Mutation: {
    register: async (_parent, args: any) => {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        address1,
        address2,
        city,
        state,
        zip,
        companyName
      } = args.input;

      const existingUser = await getUserByEmail(email);
      if(existingUser) {
        throw new GraphQLError('User already exists. Please login', {
          extensions: {
            status: 400
          }
        });
      }

      try {
        await initDbSchema();

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await DB_User.create({
          firstName,
          lastName,
          email: email.toLowerCase(),
          password: encryptedPassword,
          phone,
          address1,
          address2,
          city,
          state,
          zip,
          companyName,
          roles: [Roles.standard],
          isActive: true
        });

        const token = jwt.sign(
          { user_id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );

        return token;
      } catch(err) {
        console.log(err)
        throw new GraphQLError('Could not create accout. Please try again', {
          extensions: {
            status: 400
          }
        });
      }
    },
    createPaymentIntent: async (_parent, args: any) => {
      console.log("creating payment intent");
      const stripe = require("stripe")(process.env.STRIPE_KEY);
      const { promoCode, enableAutomaticPayments } = args;
      
      // Create a PaymentIntent with the order amount and currency
      // TODO fetch current price from db and account for promo codes
      // amount is multipled by 0.01, so 10000 === 100 usd
      const amount = 10000;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: enableAutomaticPayments
        }
      });

      return paymentIntent.client_secret || null;
    },
    updateUser: async (_parent, args: any, context) => {
      const decoded = await decodeToken(context);

      if(decoded) {
        const existingUser = await getUserById(decoded['user_id']);

        if(!existingUser) {
          throw new GraphQLError('User not found', {
            extensions: {
              status: 401
            }
          });
        }

        try {
          await initDbSchema();
          const {
            firstName,
            lastName,
            email,
            phone,
            address1,
            address2,
            city,
            state,
            zip,
            companyName,
            profileImgUrl
          } = args.input;

          const currentSettings = JSON.parse(JSON.stringify(existingUser.settings)) || {};
          const updatedSettings = {
            ...currentSettings,
            profileImgUrl
          }
  
          await existingUser.update({
            firstName,
            lastName,
            email: email.toLowerCase(),
            phone,
            address1,
            address2,
            city,
            state,
            zip,
            companyName,
            settings: updatedSettings
          });
  
          const token = jwt.sign(
            { user_id: existingUser.id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
          );
  
          return token;
        } catch(err) {
          console.log(err)
          throw new GraphQLError('Could not update accout. Please try again', {
            extensions: {
              status: 400
            }
          });
        }
      }
    }
  }
};