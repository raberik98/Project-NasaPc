<template>
    <div class="FooterBackground" style="width:100%">
        <div class="row" style="align-items:center; padding:0; margin:0">
            <h3 class="col-12" style="color:white; text-align:center">Important note:</h3>
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-2 col-sm-1"></div>
                <div class="col-xl-4 col-lg-4 col-md-8 col-sm-10">
                    <p class="col-12" style="color:white; text-align:center">
                        This project is the sole property of it's 3 founders, 
                        with this being the case you are prohabited from useing it's                        
                        source code for gaining profit or for turning it in as 
                        your own.
                    </p>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-2 col-sm-1"></div>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-10">
                    <div class="row">
                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 mb-2" v-for="(logo,i) in footerLogos" :key="i">
                            <a target="blank" :href="logo.url">
                                <img style="height:50px; width: auto" v-bind:src="logo.path" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-2"></div>
            </div>
            <p style="text-align: center; text:white;">&copy; 2022 NasaPC all rights reserved</p>
        </div>
    </div>  
</template>

<script>

export default {
    name: 'Footer',
    components: {
        
    },
    data(){
        return{
            footerLogos: [
                {path: require('../assets/svg/bootstrap-logo-black.svg'), url: 'https://getbootstrap.com/'},
                {path: require('../assets/svg/Vue.js-logo.svg'), url: 'https://vuejs.org/'},
                {path: require('../assets/svg/primevue-logo.svg'), url: 'https://www.primefaces.org/primevue/#/'},
                {path: require('../assets/svg/mongodb-logo.svg'), url: 'https://www.mongodb.com/atlas'},
                {path: require('../assets/svg/Visual_Studio_Code-logo.svg'), url: 'https://code.visualstudio.com/'},
            ],
            footerProductLinks: [
                {title: "OneProduct", to: "/products"},
                {title: "TwoProduct", to: "/products"},
                {title: "ManyProduct", to: "/products"},
                {title: "ManyProduct", to: "/products"},
                {title: "ManyProduct", to: "/products"},
                {title: "ManyProduct", to: "/products"},
            ],
            footerAuthLinks: [
                {title: "Signup", to: "/signup"},
                {title: "Login", to: "/login"},
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/CostumeVariables.scss";
    .FooterBackground {
        background-color: $darkblue;
        margin: 0;
        padding: 0;
        color: white;
    }
    .FooterLinkSettings {
        text-decoration: none;
        color: white;
        padding-top: 10px;
    }
</style>