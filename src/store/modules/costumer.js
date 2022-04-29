import CustomerService from "@/services/CustomerService";
import CustomerAddressService from "@/services/CustomerAddressService";

const state = {
  customers: [],
  customer: {
    id: 0,
    idCardNumber: "",
    firstName: "",
    lastName: "",
    addresses: [
      {
        id: 0,
        address: null,
      },
    ],
  },
  isEditing: false,
};

const getters = {
  customer: (state) => state.customer,
  customers: (state) => state.customers,
  isEditing: (state) => state.isEditing,
};

const mutations = {
  ["MUTATE_CUSTOMER"](state, customer) {
    state.customer = customer;
  },
  ["MUTATE_CUSTOMERS"](state, customers) {
    state.customers = customers;
  },
  ["MUTATE_CUSTOMER_ID"](state, id) {
    state.customer.id = id;
  },
  ["MUTATE_CUSTOMER_ID_CARD_NUMBER"](state, idCardNumber) {
    state.customer.idCardNumber = idCardNumber;
  },
  ["MUTATE_CUSTOMER_FIRST_NAME"](state, firstName) {
    state.customer.firstName = firstName;
  },
  ["MUTATE_CUSTOMER_LAST_NAME"](state, lastName) {
    state.customer.lastName = lastName;
  },
  ["MUTATE_CUSTOMER_ADDRESS"](state, address) {
    state.customer.address = address;
  },
  ["MUTATE_CUSTOMER_IS_EDITING"](state, isEditing) {
    state.isEditing = isEditing;
  },
  ["MUTATE_CUSTOMER_LIST"](state, customers) {
    state.customers = customers;
  },
  ["MUTATE_CUSTOMER_LIST_UPDATE"](state, customer) {
    const index = state.customers.findIndex((item) => item.id === customer.id);

    if (index !== -1) {
      state.customers.splice(index, 1, customer);
    }
  },
  ["MUTATE_CUSTOMER_LIST_DELETE"](state, customer) {
    const index = state.customers.findIndex((item) => item.id === customer.id);

    if (index !== -1) {
      state.customers.splice(index, 1);
    }
  },
  ["MUTATE_CUSTOMER_ADDRESS_UPDATE"](state, address) {
    const index = state.customer.addresses.findIndex(
      (item) => item.id === address.id
    );

    if (index !== -1) {
      state.customer.addresses.splice(index, 1, address);
    }
  },
  ["MUTATE_CUSTOMER_ADDRESS_DELETE"](state, address) {
    const index = state.customer.addresses.findIndex(
      (item) => item.id === address.id
    );

    if (index !== -1) {
      state.customer.addresses.splice(index, 1);
    }
  },
  ["MUTATE_IS_EDITING"](state, isEditing) {
    state.isEditing = isEditing;
  },
};

const actions = {
  async fetchCustomers({ commit }) {
    try {
      const customers = await CustomerService.getCustomers();
      commit("MUTATE_CUSTOMER_LIST", customers);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async loadCustomer({ commit }, id) {
    try {
      const customer = await CustomerService.getCustomer(id);
      commit("MUTATE_CUSTOMER", customer);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async addCustomer({ commit }, customer) {
    try {
      const isAdded = await CustomerService.addCustomers(customer);

      if (isAdded) {
        commit("MUTATE_CUSTOMER_LIST", customer);
      }

      return isAdded;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async updateCustomer({ commit }, customer) {
    try {
      const isUpdated = await CustomerService.updateCustomers(customer);

      if (isUpdated) {
        commit("MUTATE_CUSTOMER_LIST", customer);
      }

      return isUpdated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async deleteCustomer({ commit }, id) {
    try {
      const isDeleted = await CustomerService.deleteCustomers(id);

      if (isDeleted) {
        commit("MUTATE_CUSTOMER_LIST_DELETE", id);
      }

      return isDeleted;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async resetCustomer({ commit }) {
    try {
      commit("MUTATE_CUSTOMER", {
        id: 0,
        idCardNumber: "",
        firstName: "",
        lastName: "",
        addresses: [
          {
            id: 0,
            address: "",
          },
        ],
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async addCustomerAddress({ commit }, { idCustomer, address }) {
    try {
      const isAdded = await CustomerAddressService.addCustomersAddress(
        idCustomer,
        address
      );
      if (isAdded === true) {
        commit("MUTATE_CUSTOMER", address);
      }
      return isAdded;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async updateCustomerAddress({ commit }, { idCustomer, address }) {
    try {
      const isUpdated = await CustomerAddressService.updateCustomersAddress(
        idCustomer,
        address
      );
      if (isUpdated === true) {
        commit("MUTATE_CUSTOMER_ADDRESS_UPDATE", address);
      }

      return isUpdated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async deleteCustomerAddress({ commit }, { idCustomer, idAddress }) {
    try {
      const isDeleted = await CustomerAddressService.deleteCustomersAddress(
        idCustomer,
        idAddress
      );

      if (isDeleted === true) {
        commit("MUTATE_CUSTOMER_ADDRESS_DELETE", idAddress);
      }

      return isDeleted;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  setIsEditing({ commit }, isEditing) {
    commit("MUTATE_IS_EDITING", isEditing);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
