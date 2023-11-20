import axios from "axios";
import config from "@/conf";

export interface Product {
  name: string;
}

class ProductService {
  async getProduct(id: string) {
    try {
      const response = await axios.get(`${config.baseUrl}/products/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async uploadProduct(product: FormData) {
    try {
      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const response = await axios.post(
        `${config.baseUrl}/products`,
        product,
        options
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProductCategories() {
    try {
      const response = await axios.get(`${config.baseUrl}/products/categories`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
// eslint-disable-next-line no-use-before-define
export default new ProductService();
