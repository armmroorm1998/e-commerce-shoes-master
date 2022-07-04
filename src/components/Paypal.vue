<template>
  <div>
    <div ref="paypal"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "paypal-checkout",
  computed: {
    ...mapGetters({ cart: "store/cart", totalPrice: "store/totalPrice" })
  },
  data: function() {
    return {
      loaded: false,
      paidFor: false,
      product: {
        price: 777.77,
        description: "leg lamp from that one movie",
        img: "./assets/lamp.jpg"
      }
    };
  },
  mounted: function() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AfEzpk2CvDXVu0PQ4SpzaMVyN0gjAWPnPli2B3IiqOxcA0zqi36cF3M39Z55rB7UPsJeyVnRXFqjDjQ2";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  // description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.totalPrice
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    }
  }
};
</script>
