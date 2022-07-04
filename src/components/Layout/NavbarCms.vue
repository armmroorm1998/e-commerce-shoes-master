<template>
  <nav>
    <v-navigation-drawer app color="primary" v-model="drawer" dark>
      <v-list shaped>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ username }}</v-list-item-title>
            <v-list-item-subtitle>Admin</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider light></v-divider>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          router
          :to="item.router"
        >
          <v-list-item-icon>
            <v-icon right>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" hide-on-scroll dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center" style="margin-right: 120px;">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="@/assets/logoE.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/logoEnhancer.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-menu offset-y v-if="token">
        <template v-slot:activator="{ on }">
          <v-btn class="hidden-sm-and-down" v-on="on">
            <v-icon>mdi-account</v-icon>
            <span>{{ username }}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(menu, index) in Menus"
            :key="index"
            @click="logout(index)"
            :to="menu.router"
          >
            <v-list-item-icon>
              <v-icon right>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      Username: "Naphat",
      drawer: null,
      dialogLogin: { dialog: false },
      Menus: [
        { title: "Order Status", icon: "mdi-cart", router: "" },
        {
          title: "Account Setting",
          icon: "mdi-account-convert",
          router: "/cms/profile"
        },
        { title: "Contact us", icon: "mdi-account-box", router: "" },
        { title: "Logout", icon: "mdi-logout-variant", router: "" }
      ],
      items: [
        {
          id: 1,
          title: "Overview",
          icon: "fa fa-chart-line",
          router: "/cms/overview"
        },
        {
          id: 2,
          title: "Products",
          icon: "fab fa-amazon",
          router: "/cms/products"
        },
        {
          id: 3,
          title: "Orders",
          icon: "fa fa-shopping-cart",
          router: "/cms/orders"
        },
        { id: 4, title: "Logout", icon: "fa fa-power-off", router: "" }
      ]
    };
  },
  methods: {
    logout: function(index) {
      if (index === 3) {
        const self = this;
        alert("Sign-out successful.");
        self.$store.dispatch("user/logout");
        location.reload();
      } else {
        return;
      }
    }
  },
  computed: {
    ...mapGetters({ token: "user/token", username: "user/username" })
  }
};
</script>
