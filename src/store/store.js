// let cart = window.localStorage.getItem("cart");
export const store = {
  namespaced: true,
  actions: {
    getToCart: ({ commit }, item) => {
      commit("addToCart", item);
      // commit("saveData");
    },
    getToCartQuantity: ({ commit }, item) => {
      commit("addToCartQuantity", item);
      // commit("saveData");
    },
    getDetailProduct: ({ commit }, item) => {
      commit("addDetailProduct", item);
    },
    getDelCart: ({ commit }, item) => {
      commit("removeFromCart", item);
      // commit("saveData");
    }
  },
  state: {
    DetailProduct: Object,
    cart: [],
    totalCart: 0
  },
  mutations: {
    addToCart: (state, item) => {
      let found = state.cart.find(
        product => product.productId == item.productId
      );
      if (found) {
        found.productQuantity++;
      } else {
        state.cart.push(item);
        state.totalCart++;
      }
    },
    addToCartQuantity: (state, item) => {
      let found = state.cart.find(
        product => product.productId == item.productId
      );
      if (found) {
        found.productQuantity += item.productQuantity;
      } else {
        state.cart.push(item);
        state.totalCart++;
      }
    },
    // saveData(state) {
    //   localStorage.setItem("cart", JSON.stringify(state.cart));
    // },
    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);
      state.cart.splice(index, 1);
      state.totalCart--;
    },
    addDetailProduct(state, item) {
      state.DetailProduct = item;
    }
  },
  getters: {
    cart: state => state.cart,
    totalCart: state => state.totalCart,
    DetailProduct: state => state.DetailProduct,
    totalPrice: state => {
      let total = 0;
      state.cart.filter(item => {
        total += item.productPrice * item.productQuantity;
      });
      return total;
    }
  }
};
