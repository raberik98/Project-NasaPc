<template>
<main class="mainContent">
    <Navbar/>
            <Dialog v-model:visible="this.showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
                <div class="flex align-items-center flex-column pt-6 px-3">
                    <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: messageColor}"></i>
                    <h5>{{messageHeader}}</h5>
                    <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                        {{messageText}}
                    </p>
                </div>
                <template #footer>
                    <div class="flex justify-content-center">
                        <Button label="OK" @click="toggleDialog()" class="p-button-text" />
                    </div>
                </template>
            </Dialog>
        <div style="height: 40rem"></div>
    <Footer/>
</main>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import AccountDataService from '../../services/AccountDataService.js'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

export default {
    name: 'ActivateAccount',
     components: {
        Navbar,
        Footer,
        Dialog,
        Button
    },
    data(){
        return {
            token: this.$route.params.activatorToken,
            showMessage: true,
            messageHeader: "",
            messageText: "",
            messageColor: ""
        }
    },
    mounted() {
        AccountDataService.ActivateAccount(this.token)
        .then(() => {this.successDialog()})
       .catch(err => {
           console.log(err.response.data+" --- "+this.token)
           this.errorDialog(err.response.data.error)
       })
    },
    methods: {
        toggleDialog() {
            this.$router.push('/login')
        },
        successDialog() {
            this.showMessage = true
            this.messageHeader = "Success!"
            this.messageText = "Your account have been activated!"
            this.messageColor = "green"
        },
        errorDialog(message) {
            this.showMessage = true
            this.messageHeader = "ERROR"
            this.messageText = message
            this.messageColor = "red"
        }
    }
}
</script>

<style>

</style>



