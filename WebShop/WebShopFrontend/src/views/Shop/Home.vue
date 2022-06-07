<template>
<main class="mainContent">
  <Navbar/>
  <div class="mainContent" style="margin-top:5%; margin-left:20%; margin-right:20%">
    <Carousel/>
    <div class="line"></div>
  </div>
  <div class="mainContent container ">
    <div class="row" style="margin-bottom: 3%"></div>
    <div v-for="(promotion,i) in promotions" :key="i" style="color:white">
      <div class="row mb-1 promotionOne" style="padding: 5px;" v-if="i%2==0">

        <div class="col-sm-0 col-lg-1"></div>
          <div class="col-sm-12 col-lg-10">
            <div class="row">
              <div class="col-sm-12 col-lg-6">
                <img style="height:300px; width:300px" class="img-fluid float-start" :src="'/image/'+promotion.picture">
              </div>
              <div class="col-sm-12 col-lg-6">
                <h2  >{{promotion.title}}</h2>
                <h5>{{promotion.text}}</h5>
                <router-link to="/products" style="text-decoration:none"><Button class="p-button-secondary" style="width:175px; height: 75px; font-size: 25px; align-self:middle;" label="Let's go!"/></router-link>
            </div>
          </div>
        </div>
        
        <div class="cl-sm-0 col-lg-1"></div>
      </div>

      <div class="row mb-2 promotionTwo" style="padding: 5px;" v-else>
        <div class="col-sm-0 col-lg-1"></div>
          <div class="col-sm-12 col-lg-10">
            <div class="row">
              <div class="col-sm-12 col-lg-6">
                <h2>{{promotion.title}}</h2>
                <h5>{{promotion.text}}</h5>
                <router-link to="/products" style="text-decoration:none"><Button class="p-button-secondary" style="width:175px; height: 75px; font-size: 25px; align-self:middle;" label="Let's go!"/></router-link>
            </div>
            <div class="col-sm-12 col-lg-6">
                <img style="height:300px; width:300px" class="img-fluid float-end" :src="'/image/'+promotion.picture">
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>


    <!-- <HotSalesHomePage/> -->
  <Footer/>
</main>
</template>

<script>
import AccountDataService from '../../services/AccountDataService.js'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import Carousel from '../../components/Carousel.vue'
import Button from 'primevue/button';
// import HotSalesHomePage from '../../components/HotSalesHomePage.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Footer,
    Carousel,
    Button
    // HotSalesHomePage
  },
  data(){
    return {
      promotions: [
        {title:"ZOTAC Gaming GeForce RTX 3060 Twin Edge OC 12GB GDDR6 192-bit 15 Gbps PCIE 4.0 Gaming Graphics Card", link: "http://localhost:8080/product-details/6269b3c1764b955a18307168", text:"Don't miss out on this check it out now!", picture:"ZOTAC Gaming GeForce RTX 3060 Twin Edge OC.jpg"},
        {title:"Intel Core i9-12900K Desktop Processor 16 (8P+8E) Cores up to 5.2 GHz Unlocked LGA1700 600 Series Chipset 125W", link: "http://localhost:8080/product-details/6269b42c764b955a18307171", text:"This CPU practicly has your name on it, claim it!", picture:"Intel Core i9-12900K Desktop Processor 16 (8P+8E).jpg"},
        {title:"ASUS ROG Strix B550-F Gaming (WiFi 6) AMD AM4 Zen 3 Ryzen 5000 & 3rd Gen Ryzen ATX Gaming Motherboard", link: "http://localhost:8080/product-details/6269b598764b955a18307194", text:"Check out this beast, use it well.", picture:"ASUS ROG Strix B550-F Gaming (WiFi 6) AMD AM4 Zen 3 Ryzen 5000.jpg"},
        {title:"Corsair Vengeance RGB PRO 16GB (2x8GB) DDR4 3200MHz C16 LED Desktop Memory - Black", link: "http://localhost:8080/product-details/6269b26f764b955a1830714d", text:"Sooo much memory, wish I had that much.", picture:"Corsair Vengeance RGB PRO 16GB.jpg"},
      ]
    }
  },
  mounted() {
    AccountDataService.GetSession().then(() => {
    })
    .catch((err) => {
      console.log(err.response.data.error)
    })
  }

}
</script>

<style  lang="scss">
@import "../../assets/css/CostumeVariables.scss";
.promotionOne {
  background-color: $darkblue;
}
.promotionTwo {
  background-color: $notasdarkblue;
}
.line {
  height: 4px;
  border-radius: 2px;
  background-color: white;
  margin-top: 100px;
}

</style>