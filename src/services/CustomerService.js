import axios from '@/axios'

 const CUSTOMER_API_URL = "/customers/"

class CustomerService{
    getCustomers(){
        return axios.get(CUSTOMER_API_URL)
    }
    addCustomers(customer){
        return axios.post(CUSTOMER_API_URL, customer)
    }

    updateCustomers(customer){
        return axios.put(`${CUSTOMER_API_URL}${customer.id}`, customer)
    }

    deleteCustomers(id){
        return axios.delete(`${CUSTOMER_API_URL}${id}`)
    }

    getCustomer(id){
        return axios.get(`${CUSTOMER_API_URL}${id}`)
    }
}

export default new CustomerService()