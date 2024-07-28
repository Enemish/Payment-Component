import { createRouter, createWebHistory } from 'vue-router';
import PaymentPage from '../components/PaymentPage.vue';
import PaymentSuccess from '../components/PaymentSuccess.vue';

const routes = [
  {
    path: '/',
    name: 'PaymentPage',
    component: PaymentPage
  },
  {
    path: '/payment-success',
    name: 'PaymentSuccess',
    component: PaymentSuccess,
    props: (route) => ({ paymentData: JSON.parse(route.params.paymentData) })
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
