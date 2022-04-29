import axios from "@/axios";

const CUSTOMER_API_URL = "/customers/";

class CustomerAddressService {

  addCustomersAddress(idCustomer,address) {
    const url = `${CUSTOMER_API_URL}/${idCustomer}/address`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, address)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  
  updateCustomersAddress(idCustomer,address) {
    const url = `${CUSTOMER_API_URL}/${idCustomer}/address`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, address)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteCustomersAddress(idAddress) {
    const url = `${CUSTOMER_API_URL}/address/${idAddress}`;
    return new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}

export default new CustomerAddressService();
