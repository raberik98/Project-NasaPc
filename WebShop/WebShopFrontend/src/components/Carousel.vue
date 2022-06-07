<template>
    <div id="carouselMainPage" class="carousel carousel-dark slide w-100 mt-4" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselMainPage" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" v-for="(item,i) in carousel_items" :key="i" data-bs-target="#carouselMainPage" :data-bs-slide-to='i+1' :aria-label="'Slide' + i+2"/>
        </div>
        <div class="carousel-inner">

            <div class="carousel-item active" data-bs-interval="10000">
                <img src="/image/Cooler Master MasterLiquid ML240L RGB V2.jpg" class="d-block w-100">
                <div class="carousel-caption d-none d-md-block">
                    <h4 style="color:purple; font-weight:bold">Upgrade you cooling system!</h4>
                    <p></p>
                </div>
            </div>
            <div v-for="(item,i) in carousel_items" :key="i" class="carousel-item" data-bs-interval="10000" >
                <img :src="item.imageURl" class="d-block w-100" >
                <div class="carousel-caption d-none d-md-block">
                    <h4 style="color:purple; font-weight:bold">{{item.title}}</h4>
                    <p>{{item.text}}</p>
                </div>
            </div>
            <!-- <div v-for="(item,i) in carousel_items" :key="i" class="carousel-item" data-bs-interval="10000" >
                <img :src="item.imageURl" class="d-block w-100" >
                <div class="carousel-caption d-none d-md-block">
                    <h4>{{item.title}}</h4>
                    <p>{{item.text}}</p>
                </div>
            </div> -->
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselMainPage" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselMainPage" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'Carousel',
    data() {
        return{
            carousel_items: [
                {title: "Titan GPU that is what you need. Start your browsing journey now!", text: "", imageURl: "/image/ASUS ROG Strix NVIDIA GeForce RTX 3070 V2 OC Edition.jpg"},
            ]
        }
    }
}
</script>

<style>

</style>

