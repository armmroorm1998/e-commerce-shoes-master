<template>
  <div class="Goods">
    <v-row no-gutters class="mx-5">
      <v-spacer></v-spacer>
      <v-col cols="6" sm="4" align="center">
        <span class="text-uppercase display-1 font-weight-black">
          {{ title }}
        </span>
      </v-col>
      <v-col cols="6" sm="4" align="right">
        <v-app-bar-nav-icon @click.stop="drawer1.drawer2 = !drawer1.drawer2">
          <v-icon>{{ displaySort }}</v-icon></v-app-bar-nav-icon
        ><span @click.stop="drawer1.drawer2 = !drawer1.drawer2">Sort By</span>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <Navagition-Good :drawer1="drawer1" />
      <v-col
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="1000"
        v-for="(path, index) in paths"
        :key="index"
        cols="6"
        sm="3"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card class="ma-5" shaped router to="/detail">
            <v-img :src="path.img" max-height="300">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  ${{ path.price }}
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
        <v-row class="mx-5" no-gutters>
          <v-col align="left" cols="6" sm="6">{{ path.name }}</v-col>

          <v-col align="right" cols="6" sm="6">${{ path.price }}</v-col>
        </v-row>
        <v-row class="mx-5" no-gutters>
          <v-col class="text-capitalize" align="left" cols="6" sm="6">{{
            path.type
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
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-5">
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col cols="6" sm="4" align="right">
        <v-app-bar-nav-icon @click.stop="drawer1.drawer2 = !drawer1.drawer2">
          <v-icon>{{ displaySort }}</v-icon></v-app-bar-nav-icon
        ><span @click.stop="drawer1.drawer2 = !drawer1.drawer2">Sort By</span>
      </v-col>
    </v-row>
    <div class="text-center my-5">
      <v-pagination
        v-model="page"
        color="orange"
        :length="4"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Goods",
  computed: {
    displaySort() {
      if (this.drawer1.drawer2 === true) {
        return "mdi-chevron-down";
      }
      return "mdi-chevron-up";
    },
    ...mapGetters({ cart: "store/cart", totalPrice: "store/totalPrice" })
  },
  methods: {
    ...mapActions({
      DetailProduct: "store/DetailProduct"
    })
  },
  data() {
    return {
      page: 1,
      drawer1: { drawer2: null },
      min: 0,
      max: 1000,
      title: "Men's Shone",
      range: [200, 700],
      sizes: [
        { name: "5" },
        { name: "5.5" },
        { name: "6" },
        { name: "6.5" },
        { name: "7" },
        { name: "7.5" },
        { name: "8" },
        { name: "8.5" },
        { name: "9 " },
        { name: "9.5" },
        { name: "10" },
        { name: "10.5" },
        { name: "11" },
        { name: "11.5" },
        { name: "12" },
        { name: "12.5" },
        { name: "13" },
        { name: "14" },
        { name: "15" },
        { name: "16" },
        { name: "17" }
      ],
      colours: [
        { name: "black" },
        { name: "white" },
        { name: "brown" },
        { name: "green" },
        { name: "grey" },
        { name: "pink" },
        { name: "purple " },
        { name: "red " },
        { name: "blue " },
        { name: "yellow " },
        { name: "orange " }
      ],
      categories: [
        {
          name: "Running",
          quanlity: 132
        },
        {
          name: "Training & Gym",
          quanlity: 56
        },
        {
          name: "Basketball",
          quanlity: 18
        },
        {
          name: "Football",
          quanlity: 32
        },
        {
          name: "Lifeslyle",
          quanlity: 12
        }
      ],
      brands: [
        {
          name: "Nike",
          quanlity: 132
        },
        {
          name: "Adidas",
          quanlity: 56
        },
        {
          name: "New balance",
          quanlity: 18
        },
        {
          name: "Converse",
          quanlity: 20
        },
        {
          name: "Kswiss",
          quanlity: 32
        },
        {
          name: "Puma",
          quanlity: 12
        }
      ],
      paths: [
        {
          img: require("@/assets/CO/Untitled-1.png"),
          name: "Nike Air Max",
          price: 79.2,
          sale: 50,
          type: "men shoes"
        },
        {
          img: require("@/assets/CO/Untitled-3.png"),
          name: "Nike Air Max",
          price: 399,
          sale: 300,
          type: "unisex"
        },
        {
          img: require("@/assets/CO/Untitled-4.png"),
          name: "Nike Air Max",
          price: 400,
          sale: 300,
          type: "men shoes"
        },
        {
          img: require("@/assets/CO/Untitled-5.png"),
          name: "Nike Air Max",
          price: 500,
          sale: 450,
          type: "men shoes"
        },
        {
          img: require("@/assets/CO/Untitled-6.png"),
          name: "Nike Air Max",
          price: 70,
          sale: 50,
          type: "men shoes"
        },
        {
          img: require("@/assets/CO/Untitled-7.png"),
          name: "Nike Air Max",
          price: 80,
          type: "men shoes"
        },
        {
          img: require("@/assets/CO/Untitled-8.png"),
          name: "Nike Air Max",
          price: 72,
          type: "men shoes"
        },
        {
          img: require("@/assets/CO/Untitled-9.png"),
          name: "Nike Air Max",
          price: 71,
          type: "men shoes"
        },
        {
          img: require("@/assets/CO/Untitled-10.png"),
          name: "Nike Air Max",
          price: 75,
          type: "men shoes"
        },
        {
          img: require("@/assets/CO/Untitled-11.png"),
          name: "Nike Air Max",
          price: 76,
          type: "men shoes"
        },
        {
          img: require("@/assets/CO/Untitled-12.png"),
          name: "Nike Air Max",
          price: 88,
          type: "unisex"
        }
      ]
    };
  }
};
</script>
