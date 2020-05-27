import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer yDmXVI9p31gecrTQU5YJj2nxt3yRl3IcyjgBRLRAbguxbhXEVibkK-LOwXwIoTBVWeEXtJgZEvI87V6L6AatMTFOicHfyV5tWvL05Z1jloAxmzqdrK15cfuKk-DMXnYx",
  }
});
