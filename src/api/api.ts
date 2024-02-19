import axios, { AxiosResponse } from "axios";
import urls from "./urls";
import {
  CreateNewDataRequest,
  CreateNewFormRequest,
  Data,
  Form,
} from "../types";

const api = {
  formsAPI: {
    async getForms() {
      const response: AxiosResponse<Form[]> = await axios.get(
        `${urls.forms.formPrefix}`
      );
      return response.data;
    },
    async getFormById(param: number) {
      const formId = param;
      const response: AxiosResponse<Form> = await axios.get(
        `${urls.forms.formPrefix}/${formId}`
      );
      return response.data;
    },
    async deleteForm(param: React.Key) {
      const formId = param;
      const response = await axios.delete(`${urls.forms.formPrefix}/${formId}`);
      return response.data;
    },
    async createNewForm(param: CreateNewFormRequest) {
      const response = await axios.post(`${urls.forms.formPrefix}`, param);
      return response.data;
    },
    async updateForm(param: Form) {
      const response = await axios.put(
        `${urls.forms.formPrefix}/${param.id}`,
        param
      );
      return response.data;
    },
  },
  dataAPI: {
    async getDataById(param: number) {
      const response = await axios.get(`${urls.data.dataPrefix}/${param}`);
      return response.data;
    },
    async getDataByFormId(param: number) {
      const response: AxiosResponse<Data[]> = await axios.get(
        `${urls.data.dataPrefix}?formId=${param}`
      );
      return response.data;
    },
    async createNewDataInForm(param: CreateNewDataRequest) {
      const response = await axios.post(`${urls.data.dataPrefix}`, param);
      return response.data;
    },
    async updateDataInForm(param: Data) {
      const response = await axios.put(
        `${urls.data.dataPrefix}/${param.id}`,
        param
      );
      return response.data;
    },
    async deleteDataInForm(param: Data) {
      const response = await axios.delete(
        `${urls.data.dataPrefix}/${param.id}`
      );
      return response.data;
    },
  },
};

export default api;
