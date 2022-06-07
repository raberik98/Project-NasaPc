<template>
    <main class="mainContent">
    <Navbar/>
        <div class="m-5">
                <Dialog v-model:visible="this.showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
                    <div class="flex align-items-center flex-column pt-6 px-3">
                        <i class="pi pi-cog" :style="{fontSize: '5rem', color: messageColor }"></i>
                        <h5>{{this.messageHeader}}</h5>
                        <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                            {{this.messageText}}
                        </p>
                    </div>
                    <template #footer>
                        <div class="flex justify-content-center">
                            <Button v-if="!this.toLogin" label="Close" @click="closeDialog()" class="p-button-text" />
                            <Button v-if="this.toLogin" label="Login" @click="goToLogin()" class="p-button-text" />
                        </div>
                    </template>
                </Dialog>

            <div class="row">      
                <div class="col-xl-4 col-lg-2 col-md-2 col-sm-0"></div>
                <div class="col-xl-4 col-lg-8 col-md-8 col-sm-12 form">
                    <h4 style="text-align:center">Chose a new password.</h4>
                    <div class="row">
                        <div class="col 3"></div>
                        <div class="col 6">
                            <div class="mb-3 ">
                                <label class="form-label">Password:</label>
                                <Password v-model="this.UserData.newPassword"/>
                            </div>
                            <div class="mb-3 ">
                                <label class="form-label">Password again:</label>
                                <Password v-model="this.UserData.passwordagain" :feedback="false" />
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-primary" @click="sendForgotPasswordRequest()">Change my password</button>
                            </div>
                        </div>
                        <div class="col-3"></div>
                    </div>
                    <div class="col-xl-4 col-lg-2 col-md-2 col-sm-0"></div>
                </div>
                
            </div>
        </div>
        <Footer/>
    </main>
</template>

<script>
import Password from 'primevue/password';
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import AccountDataService from '../../services/AccountDataService.js'

export default {
    name: 'Login',
     components: {
        Dialog,
        Button,
        Password,
        Navbar,
        Footer
    },
    data() {
        return {
            UserData: {
                token: this.$route.params.Token,
                newPassword: "",
                passwordagain: "",
            },
            showMessage: false,
            messageHeader: "",
            messageText: "",
            messageColor: "",
            toLogin: false

        }
    },
    methods: {
       goToLogin() {
            this.showMessage = false
            this.toLogin = false
            this.messageHeader = ""
            this.messageText = ""
            this.messageColor = ""
            this.email = ""
            this.$router.push('/login')
       },
        closeDialog() {
            this.showMessage = false
            this.toLogin = false
            this.messageHeader = ""
            this.messageText = ""
            this.messageColor = ""
            this.email = ""
        },
        successDialog() {
            this.toLogin = true
            this.showMessage = true
            this.messageHeader = "Success!"
            this.messageText = "Your password have been changed."
            this.messageColor = "green"
        },
        sendForgotPasswordRequest() {
          if (this.UserData.newPassword == this.UserData.passwordagain) {
            AccountDataService.ChangePassword(this.UserData)
            .then(()=>{
              this.successDialog()
            })
            .catch(err => {
                console.log(err.response.data)
                this.errorDialog(err.response.data.error)
            })
          }
          else
          {
            this.errorDialog("Passwords don't match!")
          }
            
        },
        errorDialog(message) {
          this.toLogin = false
            this.showMessage = true
            this.messageHeader = "ERROR"
            this.messageText = message
            this.messageColor = "red"
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



