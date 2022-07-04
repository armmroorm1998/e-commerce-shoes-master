<template>
  <div class="home">
    <v-card
      class="mx-auto grey lighten-4"
      max-width="1350"
      align="center"
      justify="center"
    >
      <v-row no-gutters>
        <v-col cols="12">
          <v-img src="../assets/CO/Sho1.png" max-width="400"></v-img>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-expand-transition>
        <v-row no-gutters v-show="show">
          <v-col cols="12" sm="6">
            <div>
              <span
                class="text-xs-center headline deep-orange--text font-weight-bold"
              >
                Cafe Badilico
              </span>
              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape.
              </v-card-text>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-img src="../assets/CO/Sho2.png" max-width="400"></v-img>
          </v-col>
        </v-row>
      </v-expand-transition>
    </v-card>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto mt-12 white--text" max-width="600">
          <v-img src="../assets/CO/B2.png">
            <div
              class="d-flex flex-row-reverse"
              style="margin-right: 50px; margin-top : 120px;"
            >
              <v-card-title class="headline" style="padding: 0px;"
                >"Nike Save</v-card-title
              >
            </div>
            <div class="d-flex flex-row-reverse" style="margin-right: 50px;">
              <div class="display-2">"The World"</div>
            </div>
            <div class="d-flex flex-row-reverse" style="margin-right: 50px;">
              <v-btn rounded>Shop now</v-btn>
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto mt-12 white--text" max-width="600">
          <v-img src="../assets/CO/B4.png">
            <div class="d-flex align-center mt-12" style="margin-left: 50px">
              <v-card-title class="display-1">It's Very Soft</v-card-title>
            </div>
            <div class="d-flex align-center" style="margin-left: 100px">
              <v-btn rounded>Shop now</v-btn>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-card flat>
      <v-container fluid class="mt-12">
        <v-row class="child-flex orange">
          <v-col cols="12" sm="6" class="d-none d-sm-flex">
            <div>
              <div
                class="display-1 text-capitalize mt-5"
                style="margin-left: 120px;"
              >
                sign up & get an
              </div>
              <div
                class="display-1 text-capitalize"
                style="margin-left: 120px;"
              >
                exclusive experience
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>
              <span class="hidden-sm-and-up title font-italic font-weight-bold"
                >sign up & get an exclusive experience</span
              >
              <v-text-field
                class="mt-7"
                solo
                append-icon="mdi-email"
                hide-details
                single-line
                rounded
                full-width
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <Carousels class="mb-3" />

    <v-card class="mx-auto white--text">
      <v-row no-gutters>
        <v-col cols="12">
          <v-img class="align-end" align="right" src="../assets/CO/B End.png">
            <div>
              <v-btn x-large width="400" class="mr-8 mb-8"
                ><span class="display-1">Meet the one star</span></v-btn
              >
            </div>
          </v-img>
        </v-col>
      </v-row>
    </v-card>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto mt-12 white--text" max-width="600">
          <v-img src="../assets/CO/Shop men.png">
            <div class="d-flex align-center mt-12" style="margin-left: 50px">
              <v-card-title class="display-1">It's Very Soft</v-card-title>
            </div>
            <div class="d-flex align-center" style="margin-left: 100px">
              <v-btn rounded>Shop Men's</v-btn>
            </div>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="mx-auto mt-12 white--text" max-width="600">
          <v-img src="../assets/CO/Shop Women.png">
            <div class="d-flex align-center mt-12" style="margin-left: 50px">
              <v-card-title class="display-1">It's Very Soft</v-card-title>
            </div>
            <div class="d-flex align-center" style="margin-left: 90px">
              <v-btn rounded>Shop Women's</v-btn>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <div align="center">
      <h1 class="display-3 text-uppercase font-weight-black grey--text mt-12">
        Rencently viewed items
      </h1>
      <v-row class="mt-12 mx-5" no-gutters>
        <v-col
          class="my-5"
          cols="12"
          sm="4"
          v-for="(path, index) in paths"
          :key="index"
        >
          <v-card max-width="450" shaped>
            <v-img max-width="300" max-height="270" :src="path.img"> </v-img>
          </v-card>
          <v-row class="ml-5" no-gutters>
            <v-col align="left" cols="12">{{ path.neme }}</v-col>
          </v-row>
          <v-row class="ml-5" no-gutters>
            <v-col align="left" cols="12">{{
              path.price | currency("$")
            }}</v-col>
          </v-row>
          <v-row v-if="path.sale != null" class="ml-5" no-gutters>
            <v-col class="caption" align="left" cols="12"
              ><s>{{ path.sale | currency("$") }}</s></v-col
            >
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data: () => ({
    show: false,
    paths: [
      {
        img: require("@/assets/CO/Untitled-1.png"),
        neme: "Nike Air Max",
        price: 79.2,
        sale: 50,
        type: "men shoes"
      },
      {
        img: require("@/assets/CO/Untitled-3.png"),
        neme: "Nike Air Max",
        price: 399,
        sale: 300,
        type: "unisex"
      },
      {
        img: require("@/assets/CO/Untitled-4.png"),
        neme: "Nike Air Max",
        price: 400,
        type: "men shoes"
      }
    ]
  })
};
</script>

<style lang="scss"></style>
