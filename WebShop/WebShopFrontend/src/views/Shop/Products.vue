<template>
<main class="mainContent">
    <Navbar/>
	<div class="m-3">
		<div class="card">
			<DataView :value="filteredProducts" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
				<template #header>
					<div class="grid grid-nogutter">

							<div class="col-xl-3 col-md-12 d-flex" style="text-align: left">
								<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
							</div>
							<div class="col-xl-3 col-md-12" style="text-align: left">
								<span class="p-input-icon-left">
									<i class="pi pi-search" />
									<InputText type="text" v-model="this.searchName" placeholder="Search" @change="searchByName()"/>
								</span>
							</div>
							<div class="col-xl-3 col-md-12 d-flex" style="text-align: right">
								<DataViewLayoutOptions v-model="layout" />
							</div>
						
					</div>
				</template>

				<template #list="slotProps">
					<div class="col-12">
						<div class="product-list-item">
							<img :src="'/image/'+slotProps.data.path" :alt="slotProps.data.name"/>
							<div class="product-list-detail">
								<div class="product-name"><a class="LinkToDetails" :href="'/product-details/'+slotProps.data._id" target="blank">{{slotProps.data.name}}</a></div>
								<div class="product-description">{{slotProps.data.description}}</div>
								<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
								<i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.category}}</span>
							</div>
							<div class="product-list-action">
								<span class="product-price">{{this.priceConverter(slotProps.data.price)}} HUF</span>
								<Button icon="pi pi-shopping-cart" :id="slotProps.data._id+'cart'" label="Add to Cart" @click="addToCart(slotProps.data._id)"></Button>
								<Button icon="pi pi-star-fill" :id="slotProps.data._id+'wish'" label="Add to WishList" @click="addToWishList(slotProps.data._id)"></Button>
							</div>
						</div>
					</div>
				</template>

				<template #grid="slotProps">
					<div class=" xl:col-4 lg:col-6 md:col-12 sm:col-12">
						<div class="product-grid-item card">
							<div class="product-grid-item-top">
								<div>
									<i class="pi pi-tag product-category-icon"></i>
									<span class="product-category">{{slotProps.data.category}}</span>
								</div>
							</div>
							<div class="product-grid-item-content">
								<img :src="'/image/'+slotProps.data.path" :alt="slotProps.data.name"/>
								<div class="product-name"><a class="LinkToDetails" :href="'/product-details/'+slotProps.data._id" target="blank">{{slotProps.data.name}}</a></div>
								<div class="product-description">{{slotProps.data.description}}</div>
								<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
							</div>
							<div class="product-grid-item-bottom">
								<span class="product-price">{{this.priceConverter(slotProps.data.price)}} HUF</span>
								<Button :id="slotProps.data._id+'cart'" icon="pi pi-shopping-cart" label="Cart" @click="addToCart(slotProps.data._id)"></Button>
								<Button :id="slotProps.data._id+'wish'" icon="pi pi-star-fill" @click="addToWishList(slotProps.data._id)"></Button>
							</div>
						</div>
					</div>
				</template>
			</DataView>
		</div>
	</div>
    <Footer/>
</main>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import DataView from 'primevue/dataview';
import Rating from 'primevue/rating'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import DataService from '../../services/DataService.js';
import AccountDataService from '../../services/AccountDataService.js'

export default {
    name: "Products",
    components: {
        Navbar,
        Footer,
        DataView,
        Rating,
        Dropdown,
        Button,
        DataViewLayoutOptions,
		InputText
    },
	data() {
		return {
			products: [],
			filteredProducts: [],
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Price High to Low', value: '!price'},
                {label: 'Price Low to High', value: 'price'},
            ],
			searchName: ""
		}
	},
	methods: {
		searchByName() {
			this.filteredProducts= [],
			this.products.forEach(element => {
				if (element.name.includes(this.searchName)) {
					this.filteredProducts.push(element)
				}
			});
			if (this.searchName === "") {
				this.filteredProducts = this.products
			}
		},
        onSortChange(event){
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
		},
		addToCart(_id) {
			var cartItem = {_id, quantity: 1};
			var match = false;
			if(!JSON.parse(localStorage.getItem('cart'))) {
				localStorage.setItem('cart', JSON.stringify([cartItem]));
			} else {
				var locArr = JSON.parse(localStorage.getItem('cart'));
				for (let i = 0; i < locArr.length; i++) {
				if(locArr[i]._id == cartItem._id) {
					match = true;
					locArr[i] = ({_id: cartItem._id, quantity: (locArr[i].quantity+1)});
				}
				}
				if(!match) locArr.push({_id: cartItem._id, quantity: 1});
				localStorage.setItem('cart', JSON.stringify(locArr));
			}
		},
		addToWishList(_id) {
			AccountDataService.addToWishList(_id)
			.then(()=>{})
			.catch(err => {console.log(err.response.data.error)});
		},
		priceConverter(num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		},
	},
	mounted() {
    DataService.getAllProducts().then(data => this.products = data).then(data => this.filteredProducts = data).catch(err => {console.log(err.response.data.error)});
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/CostumeVariables.scss";
.card {
    background: #ffffff;
    padding: 0.5rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.LinkToDetails{
	text-decoration: none;
	color: $darkblue;
}
.LinkToDetails:hover {
	color: $lightestblue;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.product-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.product-description {
	margin: 0 0 1rem 0;
}

.product-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.product-category {
	font-weight: 600;
	vertical-align: middle;
}

::v-deep(.product-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;

	img {
		width: 50px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}

	.product-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}

	.product-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.product-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);
	width: 400px;


	.product-description {
		overflow-x: hidden;
		overflow-y: auto;
		height: 100px;
	}

	.product-name {
		overflow-x: hidden;
		overflow-y: auto;
		height: 150px;
	}

	.product-grid-item-top,
	.product-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 1rem 0;
		width: 250px;
		max-height: 250px;
	}

	.product-grid-item-content {
		text-align: center;
		height: 600px;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
	}
}

@media screen and (max-width: 576px) {
	.product-list-item {
		flex-direction: column;
		align-items: center;

		img {
			margin: 2rem 0;
		}

		.product-list-detail {
			text-align: center;
		}

		.product-price {
			align-self: center;
		}

		.product-list-action {
			display: flex;
			flex-direction: column;
		}

		.product-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}
</style>