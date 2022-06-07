<template>
    <main class="mainContent">
        <Navbar/>
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


        <div class="m-5">
            <div class="row">
                <div class="col-xl-3 col-lg-2 col-md-2 col-sm-0"></div>
                <div class="col-xl-6 col-lg-8 col-md-8 col-sm-12">
                    <div class="card">
                        <div class="CategoryIcon">							
                            <i class="pi pi-tag"></i>
                            <span style="font-weight:bold">{{this.product.category}}</span>
                        </div>
                        <div style="width:100%; padding:5rem; background-color:white">
                            <img :src="'/image/'+this.product.path" class="cardImage" :alt="this.product.path">
                        </div>
                        <div class="cardName">
                            <h3 >{{this.product.name}}</h3>
                        </div>
                        <div class="line"/>
                        <p class="cardDescription">{{this.product.description}}</p>
                            <div class="review" style="margin-top:30px">
                                <h5>Share your thoughts:</h5>
                                <Rating v-model="this.rating" :cancel="false"/>
                                <Textarea v-model="this.comment" :autoResize="true" rows="5" cols="40" />
                            </div>
                            <div class="d-flex buttons">
                                <Button label="Send rating" class="p-button-raised p-button-success" @click="postReview()" style="margin-right:25px"/>
                                <Button label="Remove rating" class="p-button-raised p-button-danger" @click="removeReview()"/>
                            </div>
                            <div class="line"/>
                            <div class="otherComments">
                                <div class="comment-box" v-for="(review,i) in this.product.reviews" :key="i">
                                <h4>{{review.email}}</h4>
                                    <Rating v-model="review.rating" :readonly="true" :cancel="false"/>
                                    <p>{{review.comment}}</p>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-2 col-md-2 col-sm-0"></div>
            </div>
            

        </div>
        <Footer/>
    </main>
</template>

<script>
// import InputText from 'primevue/inputtext';
// import Dialog from 'primevue/dialog'
// import Password from 'primevue/password';
import Button from 'primevue/button'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import DataService from '../../services/DataService.js';
import Textarea from 'primevue/textarea';
import Rating from 'primevue/rating';
import Dialog from 'primevue/dialog'
import AccountDataService from '../../services/AccountDataService.js'
export default {
    name:"Contact",
    components: {
        Dialog,
        Button,
        Navbar,
        Footer,
        Textarea,
        Rating
        // Password,
        // InputText
    },
    data() {
        return {
            product: "",
            comment: "",
            rating: "",
            showMessage: false,
        }
    },
    methods: {
        postReview() {
            if (this.rating > 0) {
                AccountDataService.postReview(this.product._id,{"rating": this.rating, "comment": this.comment})
                .then(() => {this.successDialog()})
                .catch(err => {
                    console.log(err.response.data.error)
                    this.errorDialog(err.response.data.error)
                }).then(this.$router.go())
            }
            else
            {
                AccountDataService.postReview(this.product._id,{"rating": "5", "comment": this.comment})
                .then(() => {this.successDialog()})
                .catch(err => {
                    console.log(err.response.data.error)
                    this.errorDialog(err.response.data.error)
                }).then(this.$router.go())
            }
            
        },
        removeReview() {
            AccountDataService.postDeleteReview(this.product._id)
            .then(() => {})
            .catch(err => {console.log(err.response.data.error)})
            .then(this.$router.go())
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
            this.messageText = "Thank you for your feedback."
            this.messageColor = "green"
        }
    },
    mounted() {
        DataService.getProductById(this.$route.params.Id)
        .then((resp) => {this.product = resp})
        .catch((err) => {console.log(err.response.data)})
        
    }
}

</script>

<style lang="scss" scoped>
@import "../../assets/css/CostumeVariables.scss";
.card {
    // background: $darkblue;
    // color: white;
    // // padding: 2rem;
    // box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
    align-items: center;
    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.9);
    border: 0;

    .cardImage{
        position: relative;
        // margin-left: 5%;
        // margin-right: 5%;
        // margin-top: 2%;
        width: 100%;
    }
    .line{
        background: $darkblue;
        position: relative;
        margin-left: 3%;
        margin-right: 3%;
        margin-top: 2%;
        border-radius: 2px;
        width: 94%;
        height: 3px;
    }
    .cardName{
        color: $darkblue;
        text-decoration: none;
        background-color: white;
        width: 100%;
        text-align: center;
    }
    .CategoryIcon{
        z-index: 2;
        position: absolute;
        top: 2%;
        left: 2%;
        font-size: 30px;
        color: $darkblue;;
    }
    .cardDescription{
        position: relative;
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 2%;
        width: 80%;
    }
    .otherComments {
        margin-top: 10px;
        position: relative;
        margin-left: 15px;
        margin-right: 15px;
        width: 70%;
        // background-color: $lightblue;
    }
    .comment-box {
        margin-top: 15px;
        // margin-left: 15px;
        background-color: transparent;
        width: 100%;
        align-content: flex-start;
        border-radius: 15px;

        h4{
           padding: 5px;
        }
        p{
            // margin-top: 10px;
            margin-left: 30px;
            // margin-bottom: 20px;
            font-size: 1.1rem;
            padding-left: 10px;
            padding-bottom: 10px;
        }
    }
    
    
}

</style>