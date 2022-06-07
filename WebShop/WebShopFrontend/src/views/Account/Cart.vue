<template>
    <main class="mainContent">
        <Navbar/>

        <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
                <div class="flex align-items-center flex-column pt-6 px-3">
                    <i class="pi pi-user" :style="{fontSize: '5rem', color: 'blue' }"></i>
                    <h5>Personal information</h5>
                    <h6>Please give us some personal information for your order.</h6>
                        <div class="m-3">
                            <div class="p-float-label">
                                <InputText id="first_name" v-model="this.data.first_name"/>
                                <label for="first_name">first name</label>
                            </div>
                            <small v-if="this.validation.vfirst_name == false" style="color:red">Invalid data!</small>
                        </div>
                        <div class="m-3">
                            <div class="p-float-label">
                                <InputText id="last_name" v-model="this.data.last_name"/>
                                <label for="last_name">last name</label>
                            </div>
                            <small v-if="this.validation.vlast_name == false" style="color:red">Invalid data!</small>
                        </div>
                        <div class="m-3">
                            <div class="p-float-label">
                                <InputText type="email" id="email" v-model="this.data.email"/>
                                <label for="email">email</label>
                            </div>
                            <small v-if="this.validation.vemail == false" style="color:red">Invalid data!</small>
                        </div>
                        <div class="m-3">
                            <div class="p-float-label">
                                <InputText type="text" id="phone_number" v-model="this.data.phone_number"/>
                                <label for="phone_number">phone number</label>
                            </div>
                            <small v-if="this.validation.vphone_number == false" style="color:red">Invalid data!</small>
                        </div>
                        <div class="m-3">
                            <div class="p-float-label">
                                <InputText type="text" id="shipping_address" v-model="this.data.shipping_address"/>
                                <label for="shipping_address">shipping address</label>
                            </div>
                            <small v-if="this.validation.vshipping_address == false" style="color:red">Invalid data!</small>
                        </div>
                        <div class="m-3">
                            <div class="p-float-label">
                                <InputText type="text" id="billing_address" v-model="this.data.billing_address"/>
                                <label for="billing_address">billing address</label>
                            </div>
                            <small v-if="this.validation.vbilling_address == false" style="color:red">Invalid data!</small>
                        </div>
                        <div class="m-3">
                            <div class="p-float-label">
                                <Dropdown id="payment_method" v-model="this.data.payment_method" :options="payment_methods" optionLabel="method" optionValue="method" placeholder="Select a payment methode" />
                            </div>
                            <small v-if="this.validation.vpayment_method == false" style="color:red">No payment method was selected!</small>
                        </div>
                </div>
                <template #footer>
                    <div class="flex justify-content-center">
                        <Button label="OK" @click="placeOrder()" class="p-button-text" />
                    </div>
                </template>
            </Dialog>

        <div class="m-5">
            <div class="card">
                <OrderList v-model="this.cartItems" listStyle="height:auto" dataKey="product._id">
                    <template #header>
                        <div class="row">
                            <div class="col-md-4 col-sm-12">
                                <span style="font-size:1.5rem">This is your Cart:</span>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <span style="font-size:1.5rem">The total price is: {{getTotalPrice()}} HUF</span>
                            </div>
                            <div class="col-md-2 col-sm-12">
                                <Button label="Order" class="p-button-raised p-button-success p-button-lg" @click="personalInformationForm()"/>
                            </div>
                        </div>
                    </template>
                    <template #item="slotProps">
                        <div class="product-item">
                            <div class="image-container">
                                <img :src="'/image/'+slotProps.item.product.path" :alt="slotProps.item.product.path" />
                            </div>
                            <div class="product-list-detail">
                                <h6 class="mb-2">{{slotProps.item.product.name}}</h6>
                                <i class="pi pi-tag product-category-icon"></i>
                                <span class="product-category">{{slotProps.item.product.category}}</span>
                            </div>
                            <div class="product-list-action">
                                <h6 class="mb-2">{{this.priceConverter(slotProps.item.product.price)}} HUF</h6>
                                <h6 :id="slotProps.item.product._id+'quantityh6'" class="mb-2">Quantity: {{slotProps.item.product.quantity}}</h6>
                                
                                <div class="row">
                                    <Button :id="slotProps.item.product._id+'plus'" class="p-button-rounded p-button-primary" icon="pi pi-plus" @click="addquantity(slotProps.item.product._id, 1)"></Button>
                                    <Button :id="slotProps.item.product._id+'minus'" class="p-button-rounded p-button-danger" style="margin-left:20px" icon="pi pi-minus" @click="addquantity(slotProps.item.product._id, -1)"></Button>
                                </div>
                            </div>
                        </div>
                    </template>
                </OrderList>
            </div>
        </div>
        <Footer/>
    </main>
</template>

<script>
import DataService from '../../services/DataService.js'
import AccountDataService from '../../services/AccountDataService.js'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import OrderList from 'primevue/orderlist'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown';
export default {
  name: 'Cart',
  components: {
    Navbar,
    Footer,
    OrderList,
    Button,
    Dialog,
    InputText,
    Dropdown
  },
  data(){
      return {
          cartItems: [],
          payment_methods: [
              {method: "Bankcard/Creditcard"},
              {method: "Pay_on_delivery"},
              {method: "Pay_overtime"}
          ],
          isEmpty: true,
          data: {
                last_name: "",
                first_name: "",
                email: "",
                phone_number: "",
                billing_address: "",
                shipping_address: "",
                total_price: "",
                items: "",
                payment_method: "",
            },
            validation: {
                vlast_name: false,
                vfirst_name: false,
                vemail: false,
                vphone_number: false,
                vbilling_address: false,
                vshipping_address: false,
                vpayment_method: false,
            },
            isLoggedIn: false,
            showMessage: false
      }
  },
  methods: {
        placeOrder() {
            this.validationFunction()
            console.log(this.data)
            if (
                this.validation.vlast_name == true &&
                this.validation.vfirst_name == true &&
                this.validation.vemail == true &&
                this.validation.vphone_number == true &&
                this.validation.vbilling_address == true &&
                this.validation.vshipping_address == true &&
                this.validation.vpayment_method == true
            ) {
                AccountDataService.PlaceOrder(this.data).then(() => {
                    localStorage.clear()
                    this.$router.push('/products')
                })
                .catch((err) => {
                    console.log(err.response.data.error)
                })
            }
            else {
                console.log("HIBA")
                console.log(this.validation)
            }
        },
        validationFunction()
        {
            if (this.data.last_name != null) {
                this.validation.vlast_name = true
            }
            if (this.data.first_name != null) {
                this.validation.vfirst_name = true
            }
            if (this.data.email != null) {
                this.validation.vemail = true
            }
            if (this.data.phone_number != null) {
                this.validation.vphone_number = true
            }
            if (this.data.billing_address != null) {
                this.validation.vbilling_address = true
            }
            if (this.data.shipping_address != null) {
                this.validation.vshipping_address = true
            }
            if (this.data.payment_method != null) {
                this.validation.vpayment_method = true
            }
           
            this.data.items = this.cartItems

        },
        personalInformationForm()
        {
            this.showMessage = true
        },
        // isCartEmpty() {
        //     return (JSON.parse(localStorage.getItem('cart')) == null || JSON.parse(localStorage.getItem('cart')) == undefined || JSON.parse(localStorage.getItem('cart')).length == 0);
        // },
        getTotalPrice() {
            let sum = 0;
            this.cartItems.forEach(product => {
                sum += (product.product.price * product.product.quantity);
            });
            this.data.total_price = sum
            return this.priceConverter(sum);
        },
        addquantity(_id, num) {
            this.cartItems.forEach(product => {
                if(_id === product.product._id) {
                    let locArr = JSON.parse(localStorage.getItem('cart'));
                    if(num < 0) {
                        if(product.product.quantity > 1) {
                            product.product.quantity += num;
                            for (let i = 0; i < locArr.length; i++) {
                                if(locArr[i]._id === _id) {
                                    locArr[i].quantity += num;
                                }
                            }
                        } else {
                            this.removeItemOnce(this.cartItems, product);
                            locArr.forEach(locItem => {
                                if(locItem._id === _id) {
                                    this.removeItemOnce(locArr, locItem);
                                }
                            });
                        }
                    } else {
                        product.product.quantity += num;
                        for (let i = 0; i < locArr.length; i++) {
                            if(locArr[i]._id === _id) {
                                locArr[i].quantity += num;
                            }
                        }
                    }
                    localStorage.setItem('cart', JSON.stringify(locArr));
                    // this.product.isEmpty = this.isCartEmpty();
                }
            });
            // this.calculateCartquantity();
        },
        removeItemOnce(arr, value) {
            var index = arr.indexOf(value);
            if (index > -1) {
                arr.splice(index, 1);
            }
            return arr;
        },
        priceConverter(num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
        // calculateCartquantity() {
        //     if(!JSON.parse(localStorage.getItem('cart'))) {
        //         this.$store.state.cartItemsLength = 0;
        //     } else {
        //         var locArr = JSON.parse(localStorage.getItem('cart'));
        //         var sum = 0;
        //         locArr.forEach(locItem => {
        //         sum += locItem.quantity;
        //         });
        //         this.$store.state.cartItemsLength = sum;
        //     }
        // }
  },
  mounted() {
     try {
        var locArr = JSON.parse(localStorage.getItem('cart'));   
            locArr.forEach(product => {
                    DataService.getProductById(product._id).then((resp) => 
                    {this.cartItems.push({'product':{'name': resp.name,'category': resp.category,'price': resp.price,
                    '_id':resp._id,'description':resp.description,'__v':0, 'quantity': product.quantity, "path": resp.path }})
                })
                .catch((err)=>{
                    console.log(err.response.data.error)
                })
            });
            } catch (error) {
                console.log("Your cart is empthy.")
            }
  }

}
</script>

<style lang="scss" scoped>
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.product-item {
	display: flex;
	align-items: center;
	padding: .5rem;
	width: 100%;

	img {
		width: 75px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        margin-right: 1rem;
	}

	.product-list-detail {
		flex: 1 1 0;
	}

	.product-list-action {
		display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .product-category-icon {
        vertical-align: middle;
        margin-right: .5rem;
        font-size: .875rem;
    }

    .product-category {
        vertical-align: middle;
        line-height: 1;
        font-size: .875rem;
    }
}

@media screen and (max-width: 576px) {
    .product-item {
        flex-wrap: wrap;

        .image-container {
            width: 100%;
            text-align: center;
        }

        img {
            margin: 0 0 1rem 0;
            width: 100px;
        }
    }
}
</style>