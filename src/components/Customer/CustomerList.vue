<template>
  <div class="list_customers">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Customers Record</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="list_customers_table">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Identification Number</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody v-if="customersList && customersList.length > 0">
                <tr v-for="customer in customersList" :key="customer.id">
                  <td>{{ customer.idCardNumber }}</td>
                  <td>{{ customer.firstName }}</td>
                  <td>{{ customer.lastName }}</td>
                  <td>
                    <div class="btn-action-table">
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click="loadCustomer(customer)"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteCustomer(customer)"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="text-center">No customers found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerList",

  props: {
    customersList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    loadCustomer(customer) {
      this.$emit("load-customer", customer);
    },
    deleteCustomer(customer) {
      this.$emit("delete-customer", customer);
    },
  },
};
</script>

<style scoped>
.btn-action-table {
  display: flex;
  justify-content: between;
}
.btn-action-table > .btn {
  margin-left: 10px;
}
</style>