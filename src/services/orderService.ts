import axios from "axios";
import config from "@/conf";

class orderService {
  async getAllOrders() {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const response = await axios.get(`${config.baseUrl}/orders`, options);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
// eslint-disable-next-line no-use-before-define
export default new orderService();
