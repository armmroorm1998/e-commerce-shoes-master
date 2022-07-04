<template>
  <div class="size">
    <v-btn-toggle color="deep-orange accent-3" rounded>
      <v-row>
        <v-col cols="4" v-for="size in sizes" :key="size.name">
          <!-- <v-radio :label="size.name" :value="size.name"></v-radio> -->
          <v-btn
            :value="size.name"
            width="60"
            @click="selected(size.name)"
            rounded
            >{{ size.name }}
          </v-btn>
        </v-col>
      </v-row>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: "size",
  props: ["productSize"],
  data() {
    return {
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
      ]
    };
  },
  methods: {
    selected(size) {
      this.productSize.size = size;
    }
  }
};
</script>
