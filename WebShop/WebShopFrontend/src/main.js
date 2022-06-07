import { createApp } from 'vue'
import ToastService from 'primevue/toastservice';
import App from './App.vue'
import router from './router/router.js'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';

import 'primevue/resources/themes/saga-blue/theme.css'      
import 'primevue/resources/primevue.min.css'                
import 'primeicons/primeicons.css'                        
import 'primeflex/primeflex.scss';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.scss'
import './assets/css/Navbar.scss'
import './assets/css/Text.css'
import './assets/css/CostumeVariables.scss'
import './assets/css/ProductCard.scss'
import './assets/css/FilterBar.scss'





createApp(App).use(router).use(PrimeVue).use(ToastService).component('Dialog', Dialog).mount('#app')
