import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
import { resolvers } from './graphql/resolvers';
import { getTokenForRequest, getUserByEmail } from './helpers/auth';
import { PaymentStatus } from './enums';
const typeDefs = fs.readFileSync("src/graphql/schema.graphql", "utf8").toString();

export const createServer = async () => {
  interface MyContext {
    token: string;
  }

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers
  });
  await server.start();

  const app = express();
  const stripe = require("stripe")(process.env.STRIPE_KEY);
  app.use(cors());

  app.post("/stripe-webhooks", bodyParser.raw({type: 'application/json'}), async (req, res) => {
    console.log("calling stripe webhook");
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    const sig = req.headers['stripe-signature'];
    let event: any;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log("webhook error", err)
      res.status(400).end();
      return;
    }

    if(event) {
      let intent: any;
      switch(event['type']) {
        case 'charge.succeeded':
          intent = event.data.object;
          console.log("Charge Succeeded:", intent);
          
          const email = intent.billing_details.email;
          const user = await getUserByEmail(email);
          await user?.update({
            paymentStatus: PaymentStatus.succeeded
          });

          break;
        case 'payment_intent.succeeded':
          intent = event.data.object;
          console.log("Succeeded:", intent.id);
          break;
        case 'payment_intent.payment_failed':
          intent = event.data.object;
          const message = intent.last_payment_error && intent.last_payment_error.message;
          console.log('Failed:', intent.id, message);
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }
    }

    res.sendStatus(200);
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/graphql", expressMiddleware(server, {
    context: async ({ req }) => ({
      token: getTokenForRequest(req)
    })
  }));

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`🚀 Server started on port ${port}`));

  return app;
};