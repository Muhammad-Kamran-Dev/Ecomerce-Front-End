import axios from "axios";
import config from "@/conf";
import { LoginFormType } from "@/validator/auth";

class AuthService {
  async loginUser(values: LoginFormType) {
    const { email, password } = values;
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.post(
        `${config.baseUrl}/users/login`,
        { email, password },
        options
      );
      return res;
    } catch (error: any) {
      return error.message;
    }
  }
  async signUpUser(formData: FormData) {
    try {
      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const res = await axios.post(
        `${config.baseUrl}/users/signup`,
        formData,
        options
      );

      return res;
    } catch (error: any) {
      return error.message;
    }
  }
  async logout() {
    try {
      const res = await axios.delete(`${config.baseUrl}/users/logout`, {
        withCredentials: true,
      });
      return res;
    } catch (error: any) {
      return error.message;
    }
  }
}
// eslint-disable-next-line no-use-before-define
export default new AuthService();
