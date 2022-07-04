<template>
  <v-app>
    <NavBarCms />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "Cms"
};
</script>
