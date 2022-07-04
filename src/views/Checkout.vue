<template>
  <div class="checkout">
    <v-container>
      <v-row no-gutters align="start" justify="end">
        <v-col cols="8">
          <h3>Checkout Page</h3>
        </v-col>
        <v-col cols="4">
          <h3>Total Price : {{ this.totalPrice | currency }}</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8">
          <v-card>
            <v-card-text>
              <ul>
                <li v-for="(item, index) in this.cart" :key="index">
                  <v-row>
                    <v-col cols="4">
                      <img :src="item.productImage" width="80px" />
                    </v-col>
                    <v-col cols="8">
                      <h5 class="mt-0">
                        {{ item.productName }}
                        <span class="float-right" @click="delCart(item)">
                          <v-icon>mdi-close-circle</v-icon>
                        </span>
                      </h5>
                      <p class="mt-0">{{ item.productPrice | currency }}</p>
                      <p class="mt-0">Quantity : {{ item.productQuantity }}</p>
                      <span class="mt-0">Size : {{ item.productSize }} |</span>
                      <span class="mt-0">Color : {{ item.productColor }}</span>
                    </v-col>
                  </v-row>
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <div>
            <checkout-paypal />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "checkout",
  computed: {
    ...mapGetters({ cart: "store/cart", totalPrice: "store/totalPrice" })
  },
  methods: {
    ...mapActions({
      getToCart: "store/getToCart",
      getDelCart: "store/getDelCart"
    }),
    delCart(item) {
      this.getDelCart(item);
    }
  }
};
</script>
