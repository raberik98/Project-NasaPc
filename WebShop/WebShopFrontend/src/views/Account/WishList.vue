<template>
    <main class="mainContent">
        <Navbar/>
        <div class="m-5">
            <div class="card">
                <OrderList v-model="this.wishList" listStyle="height:auto" dataKey="_id">
                    <template #header>
                        This is your WishList:
                    </template>
                    <template #item="slotProps">
                        <div class="product-item">
                            <div class="image-container">
                                <img :src="'/image/'+slotProps.item.path" :alt="slotProps.item.path" />
                            </div>
                            <div class="product-list-detail">
                                <h6 class="mb-2" :id="slotProps.item._id+'name'">{{slotProps.item.name}}</h6>
                                <i class="pi pi-tag product-category-icon"></i>
                                <span class="product-category">{{slotProps.item.category}}</span>
                            </div>
                            <div class="product-list-action">
                                <h6 class="mb-2">{{slotProps.item.price}} HUF</h6>
                                <Button :id="slotProps.item._id+'remove'" icon="pi pi-minus" @click="removeFromWishlist(slotProps.item._id)" class="p-button-raised p-button-danger" />
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
import AccountDataService from '../../services/AccountDataService.js'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import OrderList from 'primevue/orderlist'
import Button from 'primevue/button'
// import { ref, onMounted } from 'vue';
export default {
  name: 'Cart',
  components: {
    Navbar,
    Footer,
    OrderList,
    Button
  },
  data(){
      return {
          wishList: []
      }
  },
  methods: {
      removeFromWishlist(_id) {
          AccountDataService.removeFromWishList(_id)
          .then(() => {
              for (let index = 0; index < this.wishList.length; index++) {
                  if (this.wishList[index]._id == _id) {
                      this.wishList.splice(index, 1)
                  }
              }
          })
          .catch(() => {})
      }
  },
  mounted() {
      AccountDataService.getWishList().then((data) => this.wishList = data)
        .then(()=>{})
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