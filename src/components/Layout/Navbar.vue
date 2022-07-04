<template>
  <nav>
    <v-navigation-drawer app v-model="drawer" temporary dark>
      <v-list-group v-if="token" prepend-icon="mdi-account" value="true">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{ username }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(menu, index) in Menus"
          :key="index"
          link
          @click="logout(index)"
          :to="menu.router"
        >
          <v-list-item-icon>
            <v-icon right>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="menu.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-divider light></v-divider>

      <v-list shaped>
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

      <template v-slot:append>
        <!-- <div v-if="token" class="pa-2">
          <v-btn @click="logout" block>Logout</v-btn>
        </div>-->
        <div v-if="!token" class="pa-2">
          <v-btn @click.stop="dialogLogin.dialog = !dialogLogin.dialog" block
            >Login</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="dark" hide-on-scroll dark>
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
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
      <div class="d-flex align-center">
        <v-tabs color="#F57C00">
          <v-tab
            v-for="item of items"
            :key="item.id"
            class="font-weight-light hidden-sm-and-down"
            router-link
            :to="item.router"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </div>

      <v-spacer></v-spacer>
      <v-btn icon class="hidden-sm-and-down">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <mini-cart />
      <Login :dialogLogin="dialogLogin" class="hidden-sm-and-down" />
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
import Login from "../Login";
import firebase from "firebase/app";
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
          router: "/profile"
        },
        { title: "Contact us", icon: "mdi-account-box", router: "" },
        { title: "Logout", icon: "mdi-logout-variant", router: "" }
      ],
      items: [
        { id: 1, title: "Men", icon: "fas fa-male", router: "/goods" },
        { id: 2, title: "Women", icon: "fas fa-female", router: "" },
        { id: 3, title: "Girls", icon: "fas fa-child", router: "" },
        { id: 4, title: "Boys", icon: "fas fa-child", router: "" }
      ]
    };
  },
  methods: {
    logout: function(index) {
      if (index === 3) {
        const self = this;
        firebase
          .auth()
          .signOut()
          .then(function() {
            alert("Sign-out successful.");
            self.$store.dispatch("user/logout");
            location.reload();
          })
          .catch(function(error) {
            alert("Oops. " + error.message);
          });
      } else {
        return;
      }
    }
  },
  computed: {
    ...mapGetters({ token: "user/token", username: "user/username" })
  },
  components: {
    Login
  }
};
</script>
