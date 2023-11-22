import axios from "axios";
import config from "@/conf";
import {
  ChangePasswordType,
  EditFormType,
  ForgetPasswordType,
} from "@/validator/profile";

class UserService {
  async getAllUsers() {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.get(`${config.baseUrl}/users`, options);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(data: EditFormType) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.patch(
        `${config.baseUrl}/users/me`,
        data,
        options
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async updatePassword(data: ChangePasswordType) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.post(`${config.baseUrl}/users/me`, data, options);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async forgetPassword(data: ForgetPasswordType) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        `${config.baseUrl}/users/password/forgot`,
        data,
        options
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
}

// eslint-disable-next-line no-use-before-define
export default new UserService();
