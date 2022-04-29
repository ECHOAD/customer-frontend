<template>
  <div class="container">
    <h1 class="text">Customers Form</h1>
    <customer-form
      :customerModel="customerModel"
      @submit="addCustomer"
      :isEditing="isEditing"
    />

    <customer-list class="mt-4" :customersList="customers" />
  </div>
</template>

<script>
import CustomerService from "../services/CustomerService.js";
import CustomerForm from "../components/Customer/CustomerForm.vue";
import CustomerList from "../components/Customer/CustomerList.vue";

/* eslint-disable */
export default {
  name: "Customer",
  data() {
    return {
      isEditing: false,
      customers: [],
      customer: {
        idCardNumber: "",
        firstName: "",
        lastName: "",
        address: [],
      },
    };
  },
  components: {
    CustomerForm: CustomerForm,
    CustomerList: CustomerList,
  },
  created() {
    this.getCustomers();
  },
  methods: {
    getCustomers() {
      CustomerService.getCustomers()
        .then((response) => {
          this.customers = response.data.data;
        })
        .catch((e) => {
          console.log(e);

          this.$swal({
            title: "Error",
            text: "fetching customers",
            icon: "error",
          });
        });
    },
    addCustomer() {
      CustomerService.addCustomer(this.customer)
        .then((response) => {
          if (response.data === true) {
            this.getCustomers();
            this.customer = {
              idCardNumber: "",
              firstName: "",
              lastName: "",
              address: [],
            };
          }
        })
        .catch((e) => {
          this.$swal({
            title: "Error",
            text: "Creating Customer",
            icon: "error",
          });
        });
    },
    deleteCustomer(customer) {
      CustomerService.deleteCustomer(customer)
        .then((response) => {
          if (response.data.data === true) {
            this.customers = this.customers.filter((c) => c.id !== customer.id);

            this.$swal({
              title: "Success",
              text: response.data.message,
              icon: "success",
            });
          } else {
            this.$swal({
              title: "Error",
              text: response.data.message,
              icon: "error",
            });
          }
        })
        .catch((e) => {
          this.$swal({
            title: "Error",
            text: "Deleting Customer",
            icon: "error",
          });
        });
    },
  },
};
</script>