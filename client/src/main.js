import mongoose from 'mongoose'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
//import Vue from 'vue';



createApp(App).use(router).use(mongoose).mount('#app')


