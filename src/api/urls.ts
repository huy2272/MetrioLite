export const apiPrefix = process.env.REACT_APP_API_PREFIX;

const urls = {
  forms: {
    formPrefix: `${apiPrefix}/forms`,
  },
  data: {
    dataPrefix: `${apiPrefix}/data`,
  },
};

export default urls;
