import CustomerService from "@/services/CustomerService";
import CustomerAddressService from "@/services/CustomerAddressService";

const state = {
    customers: [],
    customer: {
        id: 0,
        idCardNumber: "",
        firstName: "",
        lastName: "",
        addresses: [{
            id: 0,
            address: null,
        }, ],
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
    ["MUTATE_CUSTOMER_LIST_ADD"](state, customer) {
        state.customers.push(customer);
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
    ["MUTATE_CUSTOMER_ADDRESS_ADD"](state, address) {
        let index = state.customer.addresses.length - 1;

        state.customer.addresses.splice(index, 1, address);
    },
    ["MUTATE_CUSTOMER_ADDRESS_UPDATE"](state, address) {
        const index = state.customer.addresses.findIndex(
            (item) => item.id === address.id
        );

        if (index !== -1) {
            state.customer.addresses.splice(index, 1, address);
        }
    },
    ["MUTATE_CUSTOMER_ADDRESS_DELETE"](state, idAddress) {
        const index = state.customer.addresses.findIndex(
            (item) => item.id === idAddress
        );

        console.log(index);

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
            const response = await CustomerService.getCustomer(id);
            commit("MUTATE_CUSTOMER", response.data);

            console.log(response.data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async saveCustomer({ dispatch, getters }) {
        try {
            let response;
            if (getters.customer.id || getters.customer.id === 0) {
                response = dispatch("addCustomer", getters.customer);
            } else {
                response = dispatch("updateCustomer", getters.customer);
            }

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async addCustomer({ commit }, customer) {
        try {
            const isAdded = await CustomerService.addCustomers(customer);

            if (isAdded) {
                commit("MUTATE_CUSTOMER_LIST_ADD", customer);
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

            if (isUpdated.data === true) {
                commit("MUTATE_CUSTOMER_LIST_UPDATE", customer);
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
                addresses: [{
                    id: 0,
                    address: "",
                }, ],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async addCustomerAddress({ commit }, { idCustomer, address }) {
        try {
            const response = await CustomerAddressService.addCustomersAddress(
                idCustomer,
                address
            );
            if (response.data) {
                commit("MUTATE_CUSTOMER_ADDRESS_ADD", response.data);
            }
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async updateCustomerAddress({ commit }, { idAddress, address }) {
        try {
            const response = await CustomerAddressService.updateCustomersAddress({
                idAddress,
                address,
            });
            if (response.data) {
                commit("MUTATE_CUSTOMER_ADDRESS_UPDATE", response.data);
            }

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async deleteCustomerAddress({ commit }, idAddress) {
        try {
            const reponse = await CustomerAddressService.deleteCustomersAddress(
                idAddress
            );

            if (reponse.data === true) {
                commit("MUTATE_CUSTOMER_ADDRESS_DELETE", idAddress);
            }

            return reponse;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async saveCustomerAddress({ dispatch }, { idCustomer, address }) {
        try {
            let response;
            if (address.id === 0) {
                response = dispatch("addCustomerAddress", { idCustomer, address });
            } else {
                response = dispatch("updateCustomerAddress", {
                    idAddress: address.id,
                    address,
                });
            }

            return response;
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