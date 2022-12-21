import axios from "axios";

export const ApiService = {

  getRequest: async (code, name) =>
    await axios
      .get(`/api/v1/sample-path?sampleCode=${code}&sampleName=${name}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      }),

};
