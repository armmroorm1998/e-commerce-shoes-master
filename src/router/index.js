import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Goods from "@/views/Goods.vue";
import Detail from "@/views/DetailGoods.vue";
import Home from "@/views/Home.vue";
import PageCmsLogin from "@/views/PageCmsLogin.vue";
import DefaultContainer from "@/containers/DefaultContainer";
import DefaultContainerCms from "@/containers/DefaultContainerCms";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "DefaultContainer",
    redirect: "/home",
    component: DefaultContainer,
    children: [
      {
        path: "goods",
        name: "Goods",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Goods
      },
      {
        path: "detail",
        name: "Detail",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Detail
      },
      {
        path: "home",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Home
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/Profile.vue")
      },
      {
        path: "checkout",
        name: "Checkout",
        component: () => import("../views/Checkout.vue")
      }
    ]
  },
  {
    path: "/cms",
    name: "DefaultContainerCms",
    // meta: { requiresAuth: true },
    redirect: "cms/overview",
    component: DefaultContainerCms,
    children: [
      {
        path: "products",
        name: "products",
        component: () => import("../views/CMS/Products.vue")
      },
      {
        path: "overview",
        name: "overview",
        component: () => import("../views/CMS/Overview.vue")
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("../views/CMS/Orders.vue")
      }
    ]
  },
  {
    path: "/admin",
    redirect: "/admin/login",
    meta: { signIn: true },
    name: "admin",
    component: {
      render(c) {
        return c("router-view");
      }
    },
    children: [
      {
        path: "login",
        name: "Login",
        component: PageCmsLogin
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const roles = store.getters["user/role"];
    if (roles) {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === "ROLE_ADMIN") {
          next();
          return;
        }
        next("/");
      }
    }
    next("/");
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.signIn)) {
    if (!store.getters["user/token"]) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});
export default router;
