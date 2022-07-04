<template>
  <div align="center" justify="center">
    <h1 class="display-3 font-weight-black grey--text mt-12">BEST OF US</h1>
    <carousel
      :perPageCustom="[
        [320, 1],
        [768, 2],
        [1024, 3]
      ]"
      :autoplay="true"
      :loop="true"
      data-aos="fade-up"
      data-aos-delay="400"
      data-aos-duration="1000"
    >
      <slide v-for="(path, index) in products" :key="index">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-5 mt-5" @click="DetailProduct(path)" shaped>
            <v-img :src="path.images[0]" max-width="300" max-height="270">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  {{ path.price | currency("$") }}
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
        <v-row class="mx-5" no-gutters>
          <v-col align="left" cols="6" sm="6">{{ path.name }}</v-col>

          <v-col align="right" cols="6" sm="6">
            {{ path.price | currency("$") }}
          </v-col>
        </v-row>
        <v-row class="mx-5" no-gutters>
          <v-col class="text-capitalize" align="left" cols="6" sm="6">{{
            path.tags[0]
          }}</v-col>
          <v-col
            class="caption"
            align="right"
            cols="6"
            sm="6"
            v-if="path.sale != null"
          >
            <s>${{ path.sale }}</s>
          </v-col>
        </v-row>
        <add-to-cart
          :name="path.name"
          :price="path.price"
          :pId="path.id"
          :image="path.images[0]"
        />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { db } from "../main";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      products: [],
      myproduct: {}
      // paths: [
      //   {
      //     img: require("@/assets/CO/Untitled-1.png"),
      //     neme: "Nike Air Max",
      //     price: 79.2,
      //     sale: 50,
      //     type: "men shoes"
      //   }
      // ]
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    ...mapActions({
      getDetailProduct: "store/getDetailProduct"
    }),
    DetailProduct(item) {
      this.myproduct = {
        name_product: item.name,
        description: item.description,
        id: item.id,
        images: item.images,
        price: item.price,
        tags: item.tags
      };
      this.getDetailProduct(this.myproduct);
      this.$router.push("/detail");
    }
  }
};
</script>

<style lang="scss">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
