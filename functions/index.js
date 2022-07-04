const functions = require("firebase-functions");
// const stripe = require("stripe")(
//   "pk_test_51HVvNtGSZu9AU6Wc91pu0qJ4lzpZdLgL0BOzpJ8iDlbcdnaPP8D8mlQGheMVb06GIro955PNBZgnHuYkI2K6INpl00n7MyarBX"
// );
const Stripe = require("stripe");
const stripe = Stripe(
  "pk_test_51HVvNtGSZu9AU6Wc91pu0qJ4lzpZdLgL0BOzpJ8iDlbcdnaPP8D8mlQGheMVb06GIro955PNBZgnHuYkI2K6INpl00n7MyarBX"
);
const cors = require("cors")({ origin: true });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.CheckoutSession = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    stripe.checkout.sessions.create(
      {
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
        payment_method_types: ["card"],
        line_items: [
          {
            price: "price_H5ggYwtDq4fbrJ",
            quantity: 2,
            amount: 1500,
            currency: "usd",
          },
        ],
      },
      function(err, session) {
        response.send(session);
      }
    );
  });
});
