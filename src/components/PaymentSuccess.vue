<template>
  <div class="container mx-auto pt-10 max-w-[1190px] px-[15px]">
    <h1 class="text-3xl font-bold mb-[30px]">Оплата успешна</h1>
    <div class="text-lg mb-4">Ваши данные:</div>
    <div v-if="paymentData" class="bg-white p-4 rounded-lg shadow-lg">
      <p><strong>Валюта:</strong> {{ paymentData.currency }}</p>
      <p><strong>Метод оплаты:</strong> {{ paymentData.method }}</p>
      <p><strong>Сумма:</strong> {{ formatNumber(paymentData.amount) }} ₽</p>
    </div>
    <div v-else class="bg-white p-4 rounded-lg shadow-lg">
      <p>Нет данных для отображения</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['paymentData'],
  methods: {
    formatNumber(number) {
      return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
    }
  },
  created() {
    console.log("Received payment data:", JSON.stringify(this.paymentData, null, 2));
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>