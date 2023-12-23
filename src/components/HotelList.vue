<template>
    <div class="container">
        <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Hotel Name</th>
                <th scope="col">Hotel Description</th>
                <th scope="col">Action</th>

                

            </tr>
        </thead>

        <tbody v-for="hotel in hotels" :key="hotel.id">
                <tr class="table-secondary">
                        <th scope="row">{{ hotel.id }}</th>
                        <th scope="row">{{ hotel.name }}</th>
                        <th scope="row">{{ hotel.description }}</th>
                     
                        <th scope="row"><router-link :to="{ name:'EditHotel', params: { id: hotel.id } }" class="btn btn-primary btn-sm" 
                        >Edit
                        </router-link></th>
                        <th scope="row"><button class="btn btn-danger btn-sm" 
                        @click.prevent="deleteHotel(hotel.id)">Delete
                        </button></th>
                 </tr>


        </tbody>



        </table>
 
    
    </div>
    
    </template>
    
    <script>
    import axios from 'axios';
    export default{
            name: 'HotelList',
            data(){
                return{
                    hotels:Array
                }
            },
            created(){
                this.getHotels();
            },
            methods:{
                async getHotels(){
                let url = 'http://127.0.0.1:8000/api/hotels';
                await axios.get(url).then(response => {
                        this.hotels = response.data.hotels;
                        console.log(this.hotels);
                }).catch(error => {
                    console.log(error);
                });
            },
               async  deleteHotel(id){
                let url = `http://127.0.0.1:8000/api/delete_hotel/${id}`;
                await axios.delete(url).then(response => {
                    if(response.data.code == 200){
                        alert(response.data.message);
                        this.getHotels();
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
            },
            mounted() {
                console.log('Hotel List Component mounted');


            }
    }
    
    </script>