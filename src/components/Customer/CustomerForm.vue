<template>
  <div class="container">
    <form class="row">
      <div class="form-group col-12 col-lg-4">
        <label for="idCardNumber">Identification Number</label>
        <input
          type="text"
          class="form-control"
          id="idCardNumber"
          v-model="customerModel.idCardNumber"
        />
      </div>
      <div class="form-group col-12 col-lg-4">
        <label for="firstName">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          v-model="customerModel.firstName"
        />
      </div>
      <div class="form-group col-12 col-lg-4">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          v-model="customerModel.lastName"
        />
      </div>
      <div class="form-group col-12 mt-3">
        <label for="address">Address</label>
        <div class="btn-addres-action d-flex">
          <button type="button" class="btn btn-primary" @click="addAddress">
            Add
          </button>
          <button type="button" class="btn btn-danger" @click="removeAddress">
            Remove
          </button>
        </div>
        <div class="input_compose_address">
          <div
            
            class="input_address d-flex flex-row"
            v-for="(address, index) in customerModel.address"
            :key="index"
          >
            <input
              type="text"
              class="form-control input_text_address"
              :v-model="address"
            />

            <button
              v-if="address.id && isEditing"
              class="btn btn-sm btn-primary m-2"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger m-2"
              @click="removeAddressById(address.id ? address.id : index)"
            >
              remove
            </button>
          </div>
        </div>
      </div>
      <div class="btn-action col d-flex flex-column">
        <button type="button" class="btn btn-primary" @click="submitAction">
          Add Customer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CustomerForm",

  props: {
    isEditing: {
      type: Boolean,
      required: true,
      default: false,
    },
    customerModel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submitAction() {
      this.$emit("submit", this.customer);
    },
    addAddress() {
      this.customerModel.address.push({
        address: "",
      });
    },
    removeAddress() {
      this.customerModel.address.pop();
    },
    removeAddressById(id) {
        console.log(id)
      this.customerModel.address.splice(id, 1);
    },
  },
};
</script>

<style scoped>
.input_address {
  margin-bottom: 10px;
}

.btn-addres-action {
  margin-left: 10px;
}

.btn-addres-action button {
  margin-right: 10px;
}

.input_compose_address {
  padding-top: 10px;
}

.input_compose_address > * {
  margin: 10px;
}
</style>