<template>
    <main class="mainContent">
    <Navbar/>
    <div class="m-5">
                <Dialog v-model:visible="this.showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
                    <div class="flex align-items-center flex-column pt-6 px-3">
                        <i class="pi pi-sign-in" :style="{fontSize: '5rem', color: messageColor }"></i>
                        <h5 id="DialogHeader">{{this.messageHeader}}</h5>
                        <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                            {{this.messageText}}
                        </p>
                        <input id="forgotpasswordemail" v-if="this.passwordReset" type="email" class="form-control" v-model="this.UserData.email">
                    </div>
                    <template #footer>
                        <div v-if="this.passwordReset" class="flex justify-content-center">
                            <Button id="forgotPasswordSendRequest" label="Send" @click="sendForgotPasswordRequest()" class="p-button-text" />
                        </div>
                        <div class="flex justify-content-center">
                            <Button label="Cancel" @click="closeDialog()" class="p-button-text" />
                        </div>
                    </template>
                </Dialog>

            <div class="row">
                <div class="col-xl-4 col-lg-2 col-md-2 col-sm-0"></div>
                <form @submit.prevent="Login()" class="col-xl-4 col-lg-8 col-md-8 col-sm-12 form m-2">
                    <div class="row">
                        <div class="col-md-8 col-sm-12">
                            <div class="mb-3 ">
                                <span class="p-float-label">
                                    <InputText id="email" type="text" v-model="this.UserData.email" />
                                    <label for="email">Email</label>
                                </span>
                            </div>
                            
                            <div class="mb-3 ">
                                <h5>Password</h5>
                                <Password id="password" v-model="this.UserData.password" toggleMask :feedback="false"></Password>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <p style="font-weight:bold">Don't have an account yet?</p>
                            <router-link to="/signup" class="btn btn-primary">Signup</router-link>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-6">
                            <Button id="login" label="Login" class="p-button-raised p-button-success" type="submit"/>
                        </div>
                        <div class="col-6">
                            <Button id="forgetpassword" label="Forgot password" class="p-button-raised p-button-info" @click="forgotPasswordForm()"/>
                        </div>
                    </div>
                </form>
                <div class="col-xl-4 col-lg-2 col-md-2 col-sm-0"></div>
            </div>
        </div>
        <Footer/>
    </main>
</template>

<script>
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog'
import Password from 'primevue/password';
import Button from 'primevue/button'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import AccountDataService from '../../services/AccountDataService.js'

export default {
    name: 'Login',
     components: {
        Dialog,
        Button,
        Navbar,
        Footer,
        Password,
        InputText
    },
    data() {
        return {
            UserData: {
                email: "",
                password: "",
            },
            showMessage: false,
            messageHeader: "",
            messageText: "",
            messageColor: "",
            passwordReset: false

        }
    },
    methods: {
        Login() {
            AccountDataService.Login(this.UserData)
                .then(()=>{
                    this.$router.push('/')
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    this.errorDialog(err.response.data.error)
                })
            
        },
        closeDialog() {
            this.showMessage = false
            this.passwordReset = false
            this.messageHeader = ""
            this.messageText = ""
            this.messageColor = ""
        },
        forgotPasswordForm() {
            this.showMessage = true
            this.passwordReset = true
            this.messageHeader = "Forgot Password"
            this.messageText = "Please give us your email address so we can send you a link to reset your password."
            this.messageColor = "blue"
        },
        sendForgotPasswordRequest() {
            AccountDataService.RequestPasswordChange(this.UserData)
            .then(()=>{
                this.successDialog()
            })
            .catch(err => {
                console.log(this.email)
                console.log(err.response.data)
                this.errorDialog(err.response.data.error)
            })
        },
        errorDialog(message) {
            this.showMessage = true
            this.passwordReset = false
            this.messageHeader = "ERROR"
            this.messageText = message
            this.messageColor = "red"
        },
        successDialog() {
            this.passwordReset = false
            this.showMessage = true
            this.messageHeader = "Success!"
            this.messageText = "We sent you an email with further instructions."
            this.messageColor = "green"
        }
    },

}
</script>

<style lang="scss" scoped>
.form {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}

</style>



