<template>
    <main class="mainContent">
    <Navbar/>
        <div class="m-5">
            <DataTable :value="products" responsiveLayout="scroll" >
                <template #header>
                    <div class="table-header" style="font-size:1.5rem">
                        These are your Order(s):
                        <Button icon="pi pi-refresh" />
                    </div>
                </template>
                <Column field="name" header="Name"></Column>
                <Column header="Image">
                    <template #body="slotProps">
                        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image" class="product-image" />
                    </template>
                </Column>
                <Column field="price" header="Price">
                    <template #body="slotProps">
                        {{slotProps.data.price}}
                    </template>
                </Column>
                <Column field="rating" header="Reviews">
                    <template #body="slotProps">
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                    </template>
                </Column>
                <template #footer>
                    In total there are {{products ? products.length : 0 }} products.
                    Total price: {{totalPrice}}
               </template>
            </DataTable>
        </div>
   
            <!-- <div class="form-demo m-5">
             <div class="flex justify-content-center">
                <div class="card">
                    <h5 class="text-center">Please give us some more information.</h5>
                    <div class="p-fluid">
                        <div class="field">
                            <div class="p-float-label">
                                <InputText id="name" v-model="this.data.first_name"/>
                                <label for="name">first name</label>
                            </div>
                            <small></small>
                        </div>
                        <div class="field">
                            <div class="p-float-label">
                                <InputText id="name" v-model="this.data.last_name"/>
                                <label for="name">last name</label>
                            </div>
                            <small></small>
                        </div>
                        <div class="field" v-if="this.isLoggedIn == false">
                            <div class="p-float-label">
                                <InputText type="email" id="name" v-model="this.data.email"/>
                                <label for="name">email</label>
                            </div>
                            <small></small>
                        </div>
                        <div class="field">
                            <div class="p-float-label">
                                <InputText type="number" id="name" v-model="this.data.phone_number"/>
                                <label for="name">phone number</label>
                            </div>
                            <small></small>
                        </div>
                        <div class="field">
                            <div class="p-float-label">
                                <InputText type="number" id="name" v-model="this.data.shipping_address"/>
                                <label for="name">shipping address</label>
                            </div>
                            <small></small>
                        </div>
                        <div class="field">
                            <div class="p-float-label">
                                <InputText type="number" id="name" v-model="this.data.billing_address"/>
                                <label for="name">billing address</label>
                            </div>
                            <small></small>
                        </div>
                        <Button type="submit" label="Submit" class="mt-2" />
                    </div>
                </div>
            </div> -->
        <!-- </div> -->
        
    <Footer/>
    </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Rating from 'primevue/rating'
import Button from 'primevue/button'
// import InputText from 'primevue/inputtext';
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import AccountDataService from '../../services/AccountDataService.js'
export default {
    name: "Orders",
    components: {
        Navbar,
        Footer,
        DataTable,
        Column,
        Rating,
        Button,
        // InputText
    },
    // data(){
    //     return {
    //         data: {
    //             last_name: "",
    //             first_name: "",
    //             // birthday_place: "",
    //             // birthday: "",
    //             email: "",
    //             phone_number: "",
    //             billing_address: "",
    //             shipping_address: "",
    //             total_price: "",
    //             payment_method: "",
    //         },
    //         isLoggedIn: false
    //     }
    // },
    // mounted() {
    //         AccountDataService.GetSession().then((response) => {
    //             this.rules.isLoggedIn = true
    //             this.data.email = response.data[0].email
    //         })
    //         .catch(() => {})
    // },
    setup() {
        onMounted(() => {
          AccountDataService.getUserOrders(this.$route.params.userId)
          .then((data) => {products.value = data})
          .catch((err) => {console.log(err.response.data)})
          
        })

        const products = ref();
        var totalPrice = ref()
        const totalPriceCalc = () => {
            products.value.forEach(product => {
                totalPrice.value += product.value.price
            });
        }
        

        return { products, totalPrice, totalPriceCalc }
    }
}
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}

.dataForm {
    background-color: white;
    
}
.form-demo {
    // background-color: $lightestblue;
    .card {
       
        min-width: 600px;


        form {
            margin-top: 2rem;
        }

        .field {
            margin-bottom: 1.5rem;
        }
    }

    @media screen and (max-width: 960px) {
        .card {
            width: 80%;
        }
    }
}
</style>                    