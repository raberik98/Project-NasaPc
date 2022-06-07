<template>
    <div class="row">
                    
                    <div class=" col-6 productCardSettings " v-for="(product,i) in products" :key="i">
                        <img :src="product.productImage">
                        <div class="flex justify-content-between" style="margin: 12px;">
                            <h5>{{product.productName}}</h5>
                            <h5>{{product.productPrice}} FT</h5>
                        </div>
                        
                            <div style="border-top: 2px solid white; padding:5px">
                                <p>{{product.productDescription}}</p>
                            </div>
                            <div style="position: absolute; bottom: 0;">
                                
                                    <button class="btn bg-primary" style="margin:10px">Add to cart</button>
                                    
                                    <button class="btn bg-info" style="margin-left: 140px; margin-right:5px">Details</button>
         
                              
                            </div>
                        
                    </div>

                </div>
</template>

<script>
export default {
    name: 'HotSalesHomePage',
    data(){
        return { 
                products: [
                    {productName: "1OneProduct", productPrice: "1500", productDescription: "A very good product!", productImage: "https://picsum.photos/200/300"},
                    {productName: "2OneProduct123123121", productPrice: "1500", productDescription: "A very good product! I promise! I promise! I promise! I promise! I promise! I promise! I promise! I promise! I promise!", productImage: "https://picsum.photos/200/300"},
                    {productName: "3OneProduct", productPrice: "1500", productDescription: "A very good product!", productImage: "https://picsum.photos/200/300"},
                    {productName: "4OneProduct", productPrice: "1500", productDescription: "A very good product!", productImage: "https://picsum.photos/200/300"},
                    {productName: "5OneProduct", productPrice: "1500", productDescription: "A very good product!", productImage: "https://picsum.photos/200/300"},
                    {productName: "6OneProduct", productPrice: "1500", productDescription: "A very good product!", productImage: "https://picsum.photos/200/300"},
                    {productName: "7OneProduct", productPrice: "1500", productDescription: "A very good product!", productImage: "https://picsum.photos/200/300"}
                ]
        }
    }
}
</script>

<style>

</style>