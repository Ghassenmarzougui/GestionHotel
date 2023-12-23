import HotelList from '../components/HotelList';
import AddHotel from '../components/AddHotel';
import EditHotel from '../components/EditHotel';

import { createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        name: 'HotelList',
        path: '/',
        component: HotelList
    },
    {
        name: 'AddHotel',
        path: '/add_hotel',
        component: AddHotel
    },
    {
        name: 'EditHotel',
        path: '/hotel/edit/:id?',
        component: EditHotel
    },
];



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;