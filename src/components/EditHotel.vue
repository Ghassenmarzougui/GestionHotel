<template>


    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="alert alert-danger mt-4" v-if="errors.length">
                    <ul class="mb-8">
                        <li v-for="(error, index) in errors" :key="index">
                            {{ error }}
                        </li>

                    </ul>
                </div>
                 <form @submit.prevent="updateHotel" novalidate>
                    <fieldset>
                        <div class="form-group">
                            <label class="form-label mt-4">Hotel Name</label>
                            <input type="text" class="form-control" v-model="hotel.name"
                            placeholder="Enter Hotel Name">
                        </div>
                        <div class="form-group">
                            <label class="form-label mt-4">Hotel Description</label>
                            <input type="text" class="form-control" v-model="hotel.description"
                            placeholder="Enter Hotel Description">
                        </div>
                        <button class="btn btn-primary mt-4">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
export default{
        name: 'EditHotel',
        data() {
            return {
                hotel: {},
                name: '',
                description: '',
                errors: []
            }
        },
        created(){
            this.getHotelById();
        },
        methods: {
            async getHotelById(){
           let url =`http://127.0.0.1:8000/api/get_hotel/${this.
            $route.params.id}`;
           await axios.get(url).then(response => {
            console.log(response);
            this.hotel = response.data;
           });   
        
        },
           async updateHotel() {
                this.errors = [];
                if(!this.hotel.name){
                    this.errors.push("Hotel Name is required")
                }
                if(!this.hotel.description){
                    this.errors.push("Hotel Description is required")
                }
                if (!this.errors.length){
                    let formData = new FormData();
                    formData.append('name',this.hotel.name);
                    formData.append('description',this.hotel.description);
                    let url = `http://127.0.0.1:8000/api/update_hotel/${this.$route.params.id}`;
                    await axios.post(url, formData).then((response) => {
                        console.log(response);
                        if(response.status == 200) {
                          
                            alert(response.data.message);
                        }else {
                            console.log('error');
                        }
                    }).catch(error => {
                        this.errors.push(error.response);
                    });
                }
            }
        },
        mounted: function() {
            console.log('Edit Component Form Component Loaded...');
        } 
}

</script>