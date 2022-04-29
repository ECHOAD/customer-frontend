import axios from "@/axios";

const CUSTOMER_API_URL = "/customers/";

class CustomerService {
  getCustomers() {
    const url = `${CUSTOMER_API_URL}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  addCustomers(customer) {
    const url = `${CUSTOMER_API_URL}`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, customer)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateCustomers(customer) {
    const url = `${CUSTOMER_API_URL}${customer.id}`;

    return new Promise((resolve, reject) => {
      axios
        .put(url, customer)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteCustomers(id) {
    const url = `${CUSTOMER_API_URL}${id}`;
    return new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getCustomer(id) {
    const url = `${CUSTOMER_API_URL}${id}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new CustomerService();
