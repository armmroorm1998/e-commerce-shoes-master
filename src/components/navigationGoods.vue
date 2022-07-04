<template>
  <div>
    <v-navigation-drawer clipped app width="320" v-model="drawer1.drawer2">
      <v-row no-gutters class="mb-3">
        <v-col cols="12" class="text-center my-3">
          <span class="subtitle-1 text-uppercase font-weight-regular"
            >categories</span
          >
        </v-col>
        <v-row no-gutters>
          <v-col
            cols="12"
            v-for="(categorie, index) in categories"
            :key="index"
          >
            <v-row class="mx-5" no-gutters>
              <v-col align="left" cols="12" sm="6">{{ categorie.name }}</v-col>

              <v-col align="right" cols="12" sm="6"
                >({{ categorie.quanlity }})</v-col
              >
            </v-row>
          </v-col>
        </v-row>
      </v-row>
      <!-- ------------------------------------------ -->
      <v-row no-gutters class="mb-3">
        <v-col cols="12" class="text-center my-3">
          <span class="subtitle-1 text-uppercase font-weight-regular"
            >price</span
          >
        </v-col>
        <v-row no-gutters>
          <v-col cols="12">
            <v-row no-gutters>
              <v-col cols="12">
                <v-row class="mx-5" no-gutters>
                  <v-col align="left" cols="6" sm="6">
                    <v-text-field
                      outlined
                      :value="range[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 120px"
                      @change="$set(range, 0, $event)"
                    ></v-text-field>
                  </v-col>

                  <v-col align="right" cols="6" sm="6">
                    <v-text-field
                      outlined
                      :value="range[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 120px"
                      @change="$set(range, 1, $event)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              hide-details
              class="align-center"
            ></v-range-slider>
          </v-col>
        </v-row>
      </v-row>
      <!-- ------------------------------------------ -->
      <v-row no-gutters class="mb-3">
        <v-col cols="12" class="text-center my-3">
          <span class="subtitle-1 text-uppercase font-weight-regular"
            >brand</span
          >
        </v-col>
        <v-row no-gutters>
          <v-col cols="12" v-for="(brand, index) in brands" :key="index">
            <v-row class="mx-5" no-gutters>
              <v-col align="left" cols="12" sm="6">{{ brand.name }}</v-col>

              <v-col align="right" cols="12" sm="6"
                >({{ brand.quanlity }})</v-col
              >
            </v-row>
          </v-col>
        </v-row>
      </v-row>
      <!-- ------------------------------------------ -->
      <v-row no-gutters class="mb-3">
        <v-col cols="12" class="text-center my-3">
          <span class="subtitle-1 text-uppercase font-weight-regular"
            >colour</span
          >
        </v-col>
        <v-row no-gutters>
          <v-col cols="12" align="center">
            <v-row class="mx-5" no-gutters>
              <v-col cols="3" v-for="(colour, index) in colours" :key="index">
                <v-col>
                  <v-btn
                    @click="hiddenShow(index)"
                    fab
                    dark
                    :color="colour.name"
                    style=" border-radius: 50%;"
                  >
                    <v-icon
                      v-if="index === 1"
                      color="black"
                      x-large
                      v-show="colour.hidden"
                    >
                      mdi-check
                    </v-icon>
                    <v-icon
                      v-else
                      color="grey lighten-3"
                      x-large
                      v-show="colour.hidden"
                    >
                      mdi-check
                    </v-icon>
                  </v-btn>

                  <span class="subtitle-1 text-uppercase font-weight-regular">
                    {{ colour.name }}
                  </span>
                </v-col>
              </v-col>
              <!-- <v-col cols="3">
                <v-col>
                  <v-btn fab dark style=" border-radius: 50%;">
                    <v-img
                      src="../assets/colorMultiple.png"
                      height="56px"
                      width="56px"
                    ></v-img>
                  </v-btn>
                  <span class="subtitle-1 text-uppercase font-weight-regular"
                    >Multiple</span
                  >
                </v-col>
              </v-col> -->
            </v-row>
          </v-col>
        </v-row>
      </v-row>
      <!-- ------------------------------------------ -->
      <v-row no-gutters class="mb-3">
        <v-col cols="12" class="text-center my-3">
          <span class="subtitle-1 text-uppercase font-weight-regular"
            >size</span
          >
        </v-col>
        <v-row no-gutters>
          <v-col cols="12" align="center">
            <v-row class="mx-5" no-gutters>
              <v-col cols="3" v-for="(size, index) in sizes" :key="index">
                <v-col>
                  <v-btn-toggle color="deep-orange accent-3" rounded>
                    <v-btn value="center" width="60">{{ size.name }}</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: ["drawer1"],
  methods: {
    hiddenShow(index) {
      if (this.colours[index].hidden === false) {
        this.colours[index].hidden = true;
      } else {
        this.colours[index].hidden = false;
      }
    }
  },
  data() {
    return {
      min: 0,
      max: 1000,
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
        { name: "black", hidden: false },
        { name: "white", hidden: false },
        { name: "brown", hidden: false },
        { name: "green", hidden: false },
        { name: "grey", hidden: false },
        { name: "pink", hidden: false },
        { name: "purple ", hidden: false },
        { name: "red ", hidden: false },
        { name: "blue ", hidden: false },
        { name: "yellow ", hidden: false },
        { name: "orange ", hidden: false }
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
      ]
    };
  }
};
</script>
