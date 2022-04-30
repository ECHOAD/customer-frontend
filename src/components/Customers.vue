<template>
  <div class="container">
    <div class="row">
      <section class="form-section col-12">
        <h1 class="text-center">Customers Registration</h1>
        <customer-form
          class="mt-2"
          @submit="saveCustomer"
          :isEditing="isEditing"
          @reset="resetForm"
        />
      </section>
      <section class="list_section col-12">
        <customer-list
          class="mt-4"
          @load-customer="loadCustomer"
          @delete-customer="showConfirmDeleteModalCustomer"
          :customersList="customers"
        />
      </section>
    </div>
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
    async getCustomers() {
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
    showConfirmDeleteModalCustomer(customer) {
      this.$swal({
        title: "Delete this customer?",
        text: "Are you sure? You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete it!",
        closeOnConfirm: true,
      }).then(async (result) => {
        if (result.value) {
          try {
            const response = await this.$store.dispatch(
              "costumer/deleteCustomer",
              customer.id
            );
            if (response.data === true) {
              this.$swal("Deleted!", response.data.message, "success");
              this.getCustomers();
            } else {
              this.$swal("Error!", response.data.message, "error");
            }
          } catch (e) {
            this.$swal("Error!", e.response.data.message, "error");
          }
        }
      });
    },
    async saveCustomer() {
      try {
        const response = await this.$store.dispatch("costumer/saveCustomer");
        console.log(response.data);

        if (response.data) {
          this.$swal("Saved!", "Customer has been saved.", "success");
          this.getCustomers();
          this.resetForm();
        } else {
          this.$swal("Error!", response.data.message, "error");
        }
      } catch (e) {
        console.log(e);
        this.$swal({
          title: "Error",
          text: e.response.data.message,
          icon: "error",
        });
      }
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

<style>
.form-control {
  border-radius: 10px;
}

.label_form {
  font-size: 15px;
}

.btn {
  border-radius: 10px;
}

.form-section {
  padding: 20px;
}

.list_section {
  padding: 20px;
}
</style>

