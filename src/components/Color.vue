<template>
  <div class="color">
    <v-btn-toggle rounded>
      <v-row>
        <v-col cols="4" v-for="(colour, index) in colours" :key="index">
          <v-btn
            @click="hiddenShow(index, colour.name)"
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
              >mdi-check</v-icon
            >
            <v-icon v-else color="grey lighten-3" x-large v-show="colour.hidden"
              >mdi-check</v-icon
            >
          </v-btn>
          <!-- <v-btn
            :value="colour.name"
            width="60"
            @click="selected(colour.name)"
            rounded
          >{{ colour.name }}</v-btn>-->

          <span class="subtitle-1 text-uppercase font-weight-regular">{{
            colour.name
          }}</span>
        </v-col>
      </v-row>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: "color-shoe",
  props: ["productColor"],
  data() {
    return {
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
      ]
    };
  },
  methods: {
    hiddenShow(index, name) {
      if (this.colours[index].hidden === false) {
        for (var i = 0; i <= 10; i++) {
          if (this.colours[i].hidden === true) {
            this.colours[i].hidden = false;
          }
        }
        this.colours[index].hidden = true;
      } else {
        this.colours[index].hidden = false;
      }

      this.productColor.color = name;
    }
  }
};
</script>
