export const CONFIG = {
  // MAIN_API_ENDPOINT: "https://api-backed-shop.herokuapp.com/"
  MAIN_API_ENDPOINT: "http://localhost:9000/"
};

export const mainAPIHeaderOptions = () => ({
  baseURL: CONFIG.MAIN_API_ENDPOINT,
  headers: {
    "x-access-token": localStorage.getItem("token")
  }
});
export const mainAPIOptions = () => ({
  baseURL: CONFIG.MAIN_API_ENDPOINT
});
