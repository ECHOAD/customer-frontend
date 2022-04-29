<template>
  <div class="container">
    <form class="row">
      <div class="form-group col-12 col-lg-4">
        <label for="idCardNumber">Identification Number</label>
        <input
          type="text"
          class="form-control"
          id="idCardNumber"
          v-model="customer.idCardNumber"
        />
      </div>
      <div class="form-group col-12 col-lg-4">
        <label for="firstName">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          v-model="customer.firstName"
        />
      </div>
      <div class="form-group col-12 col-lg-4">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          v-model="customer.lastName"
        />
      </div>
      <div class="form-group col-12 mt-3">
        <label for="address">Address</label>
        <div class="btn-addres-action d-flex">
          <button type="button" class="btn btn-primary" @click="addAddress">
            Add
          </button>
          <button
            :disabled="customer.addresses.length === 1 || isEditing"
            type="button"
            class="btn btn-danger"
            @click="
              removeAddress 
            "
          >
            Remove
          </button>
        </div>
        <div class="input_compose_address">
          <div
            class="input_address d-flex flex-row"
            v-for="(actualAddress, index) in customer.addresses"
            :key="index"
          >
            <input
              type="text"
              class="form-control input_text_address"
              v-model="actualAddress.address"
              :v-bind="{
                placeholder: 'Address ' + (index + 1),
              }"
            />

            <button  type="button" v-if="isEditing" class="btn btn-sm btn-primary m-2"
            >
              Save
            </button>
            <button
              :disabled="customer.addresses.length === 1"
              type="button"
              class="btn btn-sm btn-danger m-2"
              @click="
                showConfirmDeleteModalAddress(actualAddress.id ? actualAddress.id : index)
              "
            >
              remove
            </button>
          </div>
        </div>
      </div>
      <div class="btn-action col d-flex flex-column">
        <button type="button" class="btn btn-primary" @click="submitAction">
          {{ isEditing ? "Edit Customer" : "Add Customer" }}
        </button>
        <button type="button" class="btn btn-danger" @click="resetForm">
          {{ isEditing ? "Cancel Edit" : "Reset" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CustomerForm",
  props: {
    isEditing: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    ...mapGetters("costumer", ["customer"]),
  },
  methods: {
    showConfirmDeleteModalAddress(idAddress) {
      
        const intance = this.removeAddressById
      this.$swal(
        {
          title: "Delete this address?",
          text: "Are you sure? You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Yes, Delete it!",
          closeOnConfirm: true,
        },
        () => {
          intance(idAddress)
        }
      );
    },
    submitAction() {
      this.$emit("submit", this.customer);
    },
    addAddress() {
      this.customer.addresses.push({
        id: this.customer.addresses.length,
        address: "",
      });
    },
    removeAddress() {
      this.customer.addresses.pop();
    },
    removeAddressById(id) {
        console.log("asdasd")
      const index = this.customer.addresses.findIndex((address) => {
        return address.id === id;
      });
      this.customer.addresses.splice(index, 1);
    },
    resetForm() {
      this.$emit("reset");
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