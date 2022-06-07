<template>
    <main>
        <Navbar/>
        <!-- <Toast />
        <Toast position="top-left" group="tl" />
        <Toast position="bottom-left" group="bl" />
        <Toast position="bottom-right" group="br" />

        <Toast position="bottom-center" group="bc">
            <template #message="slotProps">
                <div class="flex flex-column">
                    <div class="text-center">
                        <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
                        <h4>{{slotProps.message.summary}}</h4>
                        <p>{{slotProps.message.detail}}</p>
                    </div>
                    <div class="grid p-fluid">
                        <div class="col-6">
                            <Button class="p-button-success" label="Yes" @click="onConfirm"></Button>
                        </div>
                        <div class="col-6">
                            <Button class="p-button-secondary" label="No" @click="onReject"></Button>
                        </div>
                    </div>
                </div>
            </template>
        </Toast>
        <Button label="Success" class="p-button-success" @click="showSuccess" /> -->

        <div class="m-5 mainContent">
            <div class="card">
                <Toolbar class="mb-4">
                    <template #start>
                        <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" style="margin-right:15px"/>
                        <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                    </template>

                    <template #end>
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                    </template>
                </Toolbar>

                <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="_id" 
                    :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                    <template #header>
                        <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Products</h5>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                    <Column field="_id" header="_id" :sortable="true" style="min-width:12rem"></Column>
                    <Column field="name" header="Name" :sortable="true" style="min-width:16rem"></Column>
                    <Column header="Image">
                        <template #body="slotProps">
                            <img :src="'/image/'+slotProps.data.path" :alt="slotProps.data.path" class="product-image" />
                        </template>
                    </Column>
                    <Column field="price" header="Price" :sortable="true" style="min-width:8rem">
                        <template #body="slotProps">
                            {{slotProps.data.price}}
                        </template>
                    </Column>
                    <Column field="category" header="Category" :sortable="true" style="min-width:10rem"></Column>
                    <Column field="rating" header="Reviews" :sortable="true" style="min-width:12rem">
                        <template #body="slotProps">
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                        </template>
                    </Column>
                    <Column field="inventoryStatus" header="Status" :sortable="true" style="min-width:12rem">
                        <template #body="slotProps">
                            <span :class="'product-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">{{slotProps.data.inventoryStatus}}</span>
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success" @click="editProduct(slotProps.data)" style="margin-right:15px" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>

            <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
                <img :src="'/image/'+product.path" :alt="product.image" class="product-image" v-if="product.path" />
                <div class="field">
                    <label for="name">Name</label>
                    <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
                    <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
                </div>
                <div class="field">
                    <label for="description">Description</label>
                    <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
                </div>

                <div class="field">
                    <label for="inventoryStatus" class="mb-3">Inventory Status</label>
                    <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
                        <template #value="slotProps">
                            <div v-if="slotProps.value && slotProps.value.value">
                                <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
                            </div>
                            <div v-else-if="slotProps.value && !slotProps.value.value">
                                <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
                            </div>
                            <span v-else>
                                {{slotProps.placeholder}}
                            </span>
                        </template>
                    </Dropdown>
                </div>

                <div class="field">
                    <label class="mb-3">Category</label>
                    <div class="formgrid grid">
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category1" name="category" value="motherboard" v-model="product.category" />
                            <label for="category1">motherboard</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category2" name="category" value="gpu" v-model="product.category" />
                            <label for="category2">gpu</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category3" name="category" value="cpu" v-model="product.category" />
                            <label for="category3">cpu</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category4" name="category" value="power-supply" v-model="product.category" />
                            <label for="category4">power-supply</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category5" name="category" value="RAM" v-model="product.category" />
                            <label for="category5">RAM</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category6" name="category" value="SSD" v-model="product.category" />
                            <label for="category6">SSD</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category7" name="category" value="HDD" v-model="product.category" />
                            <label for="category7">HDD</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category8" name="category" value="mouse" v-model="product.category" />
                            <label for="category8">mouse</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category9" name="category" value="keyboard" v-model="product.category" />
                            <label for="category9">keyboard</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category10" name="category" value="headset" v-model="product.category" />
                            <label for="category10">headset</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category11" name="category" value="phone" v-model="product.category" />
                            <label for="category11">phone</label>
                        </div>
                        <div class="field-radiobutton col-6">
                            <RadioButton id="category12" name="category" value="cooler" v-model="product.category" />
                            <label for="category12">cooler</label>
                        </div>
                    </div>
                </div>

                <div class="formgrid grid">
                    <div class="field col">
                        <label for="price">Price</label>
                        <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US"/>
                    </div>
                    <div class="field col">
                        <label for="quantity">Quantity</label>
                        <InputNumber id="quantity" v-model="product.quantity" integeronly />
                    </div>
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="path">Path (picture)</label>
                        <InputText id="path" v-model="product.path"/>
                    </div>
                    <div class="field col">
                        <label for="discount">Discount</label>
                        <InputNumber id="discount" v-model="product.discount" integeronly />
                    </div>
                </div>
                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                    <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
                </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="product">Are you sure you want to delete the selected products?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
                </template>
            </Dialog>
        </div>
        <Footer/>
    </main>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import AdminDataService from '../../services/AdminDataService.js'
import AccountDataService from '../../services/AccountDataService.js'
import DataService from '../../services/DataService.js'
import { ref, onMounted } from 'vue';
// import { defineComponent } from "vue";
import { FilterMatchMode } from 'primevue/api';
// import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog'
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Column from 'primevue/column'
import Rating from 'primevue/rating'
import DataTable from 'primevue/datatable'
// import ProductService from './service/ProductService';

export default {
    components: {
        Navbar,
        Footer,
        Dialog,
        Toolbar,
        Button,
        InputNumber,
        InputText,
        RadioButton,
        Dropdown,
        Textarea,
        Column,
        Rating,
        DataTable
    },
    mounted() {
        AccountDataService.GetSession().then((response) => {
                if (response.data[0].admin == false) {
                    this.$router.push('/')
                }
            })
            .catch(() => {
                console.log("Error accured")
                this.$router.push('/')
            })
    },
    // methods: {
    //     showSuccess() {
    //         this.$toast.add({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    //     },
    // },
    setup() {
        onMounted(() => {
            DataService.getAllProducts().then(data => products.value = data);
        })

        // const toast = useToast();
        const dt = ref();
        const products = ref();
        const productDialog = ref(false);
        const deleteProductDialog = ref(false);
        const deleteProductsDialog = ref(false);
        const product = ref({});
        // const productService = ref(new ProductService());
        const selectedProducts = ref();
        const filters = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        });
        const submitted = ref(false);
        const statuses = ref([
            {label: 'INSTOCK', value: 'instock'},{label: 'LOWSTOCK', value: 'lowstock'},{label: 'OUTOFSTOCK', value: 'outofstock'}
        ]);

        
        const openNew = () => {
            product.value = {};
            submitted.value = false;
            productDialog.value = true;
        };
        const hideDialog = () => {
            productDialog.value = false;
            submitted.value = false;
        };
        const saveProduct = () => {
            submitted.value = true;

			if (product.value.name.trim()) {
                if (product.value._id) {
                    AdminDataService.modifyProduct(product.value._id, product.value)
                    // toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
                else {
                    AdminDataService.addProduct(product.value)
                    // toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
                }

                productDialog.value = false;
                product.value = {};
            }
        };
        const editProduct = (prod) => {
            product.value = {...prod};
            productDialog.value = true;
        };
        const confirmDeleteProduct = (prod) => {
            product.value = prod;
            deleteProductDialog.value = true;
        };
        const deleteProduct = () => {
            AdminDataService.deleteProduct(product.value._id)
            deleteProductDialog.value = false;
            product.value = {};
            // toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        };
        const exportCSV = () => {
            dt.value.exportCSV();
        };
        const confirmDeleteSelected = () => {
            deleteProductsDialog.value = true;
        };
        const deleteSelectedProducts = () => {
            selectedProducts.value.forEach(oneProduct => {
                AdminDataService.deleteProduct(oneProduct._id)
            });
            deleteProductsDialog.value = false;
            selectedProducts.value = null;
            // toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        };

        return { dt, products, productDialog, deleteProductDialog, deleteProductsDialog, product, 
            selectedProducts, filters, submitted, statuses, openNew, hideDialog, saveProduct, editProduct,
            confirmDeleteProduct, deleteProduct, exportCSV, confirmDeleteSelected, deleteSelectedProducts}
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/CostumeVariables.scss";
main {
    background-color: $lightblue;
}



.card {
    box-shadow: 0 3px 6px $shadowofdarkblue;
    background-color: $lightblue;
}

.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>