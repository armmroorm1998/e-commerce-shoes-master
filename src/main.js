import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueCarousel from "vue-carousel";
import VueFirestore from "vue-firestore";
import firebase from "firebase/app";
import "firebase/auth";
require("firebase/firestore");
import "firebase/firestore";
import "firebase/storage";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { firebaseConfig } from "./config";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Vuelidate from "vuelidate";
import Swal from "sweetalert2";
import Vue2Editor from "vue2-editor";
import Vue2Filters from "vue2-filters";

Vue.use(Vue2Filters);
Vue.use(Vue2Editor);
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
Vue.use(VueFirestore, {
  key: "id", // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
});
Vue.use(Vuelidate);
Vue.use(VueFirestore);
Vue.component("Carousels", require("./components/Carousel.vue").default);
Vue.component("checkout-paypal", require("./components/Paypal.vue").default);
Vue.component("add-to-cart", require("./components/AddTOCart.vue").default);
Vue.component("size-shoe", require("./components/Size").default);
Vue.component("color-shoe", require("./components/Color").default);
Vue.component("mini-cart", require("./components/MiniCart.vue").default);
Vue.component(
  "Navagition-Good",
  require("./components/navigationGoods.vue").default
);
Vue.component("Carousel", "Slide", require("vue-carousel").default);
Vue.component("Footer", require("./components/Layout/Footer.vue").default);
Vue.component("Navbar", require("./components/Layout/Navbar.vue").default);
Vue.component(
  "NavBarCms",
  require("./components/Layout/NavbarCms.vue").default
);
// ..
AOS.init({
  duration: 2000
});
Vue.use(VueAxios, axios);
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
var db = firebase.firestore();
export { db, Toast, storage };
Vue.use(VueCarousel);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
