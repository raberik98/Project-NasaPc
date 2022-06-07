<template>
    <Navbar/>
    <div class="row formAndInfobox">
        <div style="margin-bottom: 2em">
            <div class="form-demo">
                <div class="flex justify-content-center">
                    <div class="col-xs-12 col-lg-8 card">
                        <h5 class="text-center">Personal Information</h5>
                        <form class="p-fluid">
                            <div class="field">
                                <div class="p-float-label p-input-icon-right">
                                    <i class="pi pi-user"></i>
                                    <InputText id="name" v-model="UserName" />
                                    <label for="name" >Name*</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="p-float-label p-input-icon-right">
                                    <i class="pi pi-envelope" />
                                    <InputText id="email" v-model="UserEmail"/>
                                    <label for="email" >Email*</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="p-float-label">
                                    <Password id="password" v-model="UserPassword">
                                        <template #header>
                                            <h6>Pick a password</h6>
                                        </template>
                                        <template #footer="sp">
                                            {{sp.level}}
                                            <Divider />
                                            <p class="mt-2">Suggestions</p>
                                            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                                <li>At least one lowercase</li>
                                                <li>At least one uppercase</li>
                                                <li>At least one numeric</li>
                                                <li>Minimum 8 characters</li>
                                            </ul>
                                        </template>
                                    </Password>
                                    <label for="password">Password*</label>
                                </div>
                            </div>
                            <div class="field">
                              <span class="p-float-label">
                                  <InputText id="inputtext" type="text" v-model="UserPasswordAgain" />
                                  <label for="inputtext">Password Again*</label>
                              </span>
                            </div>
                            <div class="field">
                                <div class="p-float-label">
                                    <Calendar id="date" v-model="UserDate" :showIcon="true" />
                                    <label for="date">Birthday</label>
                                </div>
                            </div>
                            <Button type="submit" label="Submit" class="mt-2" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
// import { email, required } from "@vuelidate/validators"
// import { useVuelidate } from "@vuelidate/core"
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Password from 'primevue/password'
import InputText from 'primevue/inputtext'

export default {
    name: 'Account-settings',
    components: {
        Navbar,
        Footer,
        Button,
        Calendar,
        Password,
        InputText,
    },
    data() {
        return {
            UserName: '',
            UserEmail: '',
            UserPassword: '',
            UserPasswordAgain: '',
            UserDate: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.form-demo {
    .card {
        min-width: 300px;

        form {
            margin-top: 2rem;
        }
        .field {
            margin-bottom: 1.5rem;
        }
    }
}
.formAndInfobox {
    margin: 5%;
}

</style>