<template>
    <main class="mainContent">
        <Navbar/>
        <div class="form-demo m-5">
                <Dialog v-model:visible="this.showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
                    <div class="flex align-items-center flex-column pt-6 px-3">
                        <i class="pi pi-sign-in" :style="{fontSize: '5rem', color: messageColor }"></i>
                        <h5 id="DialogHeader">{{this.messageHeader}}</h5>
                        <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                            {{this.messageText}}
                        </p>
                    </div>
                    <template #footer>
                        <div class="flex justify-content-center">
                            <Button label="Cancel" @click="closeDialog()" class="p-button-text" />
                        </div>
                    </template>
                </Dialog>

            <div class="flex justify-content-center">
                <div class="card">
                    <h5 class="text-center">Register</h5>
                    <form class="p-fluid">
                        <div class="field">
                            <div class="p-float-label">
                                <InputText id="name" v-model="this.name"/>
                                <label for="name">Name*</label>
                            </div>
                            <small v-if="this.vname == false" class="p-error">Name is required!</small>
                        </div>
                        <div class="field">
                            <div class="p-float-label p-input-icon-right">
                                <i class="pi pi-envelope" />
                                <InputText id="email" v-model="this.email"/>
                                <label for="email">Email*</label>
                            </div>
                            <small v-if="this.vemail == false" class="p-error">Email is required!</small>
                        </div>
                        <div class="field">
                            <div class="p-float-label">
                                <Password id="password" v-model="this.password" toggleMask>
                                    <template #header>
                                        <h6>Pick a password</h6>
                                    </template>
                                    <template #footer="sp">
                                        {{sp.level}}
                                        <Divider />
                                        <p class="mt-2">Suggestions</p>
                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                            <li>At least one lowercase</li>
                                            <li>At least one uppercase</li>
                                            <li>At least one numeric</li>
                                            <li>Minimum 8 characters</li>
                                        </ul>
                                    </template>
                                </Password>
                                <label for="password">Password*</label>
                            </div>
                            <small v-if="this.vpassword == false" class="p-error">Password is required!</small>
                        </div>
                        <div class="field">
                            <div class="p-float-label">
                                <Calendar id="date" v-model="this.data" :showIcon="true" />
                                <label for="date">Birthday</label>
                            </div>
                            <small v-if="this.vdate == false" class="p-error">Date of birth is required!</small>
                        </div>
                        <div class="field-checkbox">
                            <Checkbox id="accept" name="accept" value="Accept" v-model="this.accept"/>
                            <label for="accept">I agree to the terms and conditions!</label>
                        </div>
                        <small v-if="this.vaccept == false" class="p-error">You have to agree to our terms and conditions!</small>
                        <Button id="signup" label="Signup" @click="Signup()" class="mt-2" />
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
    </main>
</template>

<script>
import AccountDataService from '../../services/AccountDataService.js'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import Dialog from 'primevue/dialog'
import Calendar from 'primevue/calendar'
import Password from 'primevue/password'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'

export default {
    components: {
        Navbar,
        Footer,
        Button,
        Dialog,
        Calendar,
        Password,
        Divider,
        InputText,
        Checkbox
    },
    data(){
        return {
            showMessage: false,
            name: '',
            email: '',
            password: '',
            date: "",
            accept: null,
            vname: false,
            vemail: false,
            vpassword: false,
            vdate: false,
            vaccept: false,
        }
    },
    methods: {
        Signup() {
            this.Validation()
            if (this.vname == true && 
            this.vemail == true && 
            this.vpassword == true && 
            this.vdate == true && 
            this.vaccept == true ) {
                AccountDataService.SignUp({"email": this.email, "password": this.password})
                .then(console.log(this.email+" asdasda    "+this.password))
                .then(() => {this.successDialog()})
                .catch(err => { 
                    console.log(err.response.data)
                    this.errorDialog(err.response.data.error)
                });
            }
        },
        Validation(){
            if (this.name != null) {
                this.vname = true
            }
            if (this.email != null) {
                this.vemail = true
            }
            if (this.password != null) {
                this.vpassword = true
            }
            if (this.data != null) {
                this.vdate = true
            }
            if (this.accept != null) {
                this.vaccept = true
            }
        },
        closeDialog() {
            this.showMessage = false
            this.messageHeader = ""
            this.messageText = ""
            this.messageColor = ""
        },
        errorDialog(message) {
            this.showMessage = true
            this.messageHeader = "ERROR"
            this.messageText = message
            this.messageColor = "red"
        },
        successDialog() {
            this.showMessage = true
            this.messageHeader = "Success"
            this.messageText = "Success, only one final step is required for your registration. Please check your email for activation instructions."
            this.messageColor = "green"
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/CostumeVariables.scss";

.form-demo {
    // background-color: $lightestblue;
    .card {
       
        min-width: 450px;

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