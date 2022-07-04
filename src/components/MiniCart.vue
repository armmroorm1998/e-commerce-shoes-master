<template>
  <div class="add-to-cart">
    <v-btn icon class="hidden-sm-and-down" @click="dialog = true">
      <v-icon>mdi-shopping</v-icon>
      <span v-if="this.totalCart !== 0" class="red">{{ this.totalCart }}</span>
    </v-btn>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">My Bag</v-card-title>

        <v-card-text>
          <ul>
            <li v-for="(item, index) in this.cart" :key="index">
              <v-row>
                <v-col justify="center" align="center" sm="6">
                  <img :src="item.productImage" width="80px" />
                </v-col>
                <v-col justify="center" align="center" sm="6">
                  <h5 class="mt-0">
                    {{ item.productName }}
                    <span class="float-right" @click="delCart(item)"
                      ><v-icon>mdi-close-circle</v-icon></span
                    >
                  </h5>
                  <p class="mt-0">{{ item.productPrice | currency }}</p>
                  <p class="mt-0">Quantity : {{ item.productQuantity }}</p>
                </v-col>
              </v-row>
            </li>
          </ul>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            ><router-link :to="{ name: 'Checkout' }"
              >Checkout</router-link
            ></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "add-to-cart",
  props: {
    name: String,
    price: String,
    image: String,
    pId: String
  },
  data() {
    return {
      item: {
        productName: this.name,
        productImage: this.image,
        productPrice: this.price,
        productId: this.pId,
        productQuantity: 1
      },
      dialog: false
    };
  },
  computed: {
    ...mapGetters({ cart: "store/cart", totalCart: "store/totalCart" })
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

<style></style>
