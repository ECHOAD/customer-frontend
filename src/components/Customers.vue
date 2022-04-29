<template>
  <div class="container">
    <h1 class="text">Customers Form</h1>
    <customer-form
      @submit="addCustomer"
      :isEditing="isEditing"
      @reset="resetForm"
    />

    <customer-list
      class="mt-4"
      @load-customer="loadCustomer"
      :customersList="customers"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CustomerForm from "../components/Customer/CustomerForm.vue";
import CustomerList from "../components/Customer/CustomerList.vue";

/* eslint-disable */
export default {
  name: "Customer",

  computed: {
    ...mapGetters("costumer", ["customers", "customer", "isEditing"]),
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
      this.$store.dispatch("costumer/fetchCustomers");
    },
    resetForm() {
      this.$store.dispatch("costumer/resetCustomer");
      this.$store.dispatch("costumer/setIsEditing", false);
    },
    loadCustomer(customer) {
      try {
        this.$store.dispatch("costumer/loadCustomer", customer.id);
        this.$store.dispatch("costumer/setIsEditing", true);
      } catch (e) {
        console.log(e);
      }
    },
    addCustomer() {
      this.$swal({
        title: "Error",
        text: "Creating Customer",
        icon: "error",
      });
    },
    deleteCustomer(customer) {
      this.$swal({
        title: "Error",
        text: "Creating Customer",
        icon: "error",
      });
    },
  },
};
</script>