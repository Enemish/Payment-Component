<template>
	<div class="container mx-auto lg:pt-10 pt-[25px] max-w-[1190px] px-[15px]">
			<h1 class="text-[18px] sm:text-3xl lg:text-4xl font-bold mb-[30px]">
					<span class="text-primary">Пополните баланс,</span>
					<span class="text-secondary">
							чтобы получить номер для приема смс</span
					>
			</h1>
			<div class="text-primary">
					<div class="relative flex items-center mb-[15px]">
							<span
									class="block text-[14px] lg:text-[20px] sm:text-[20px] font-[400] mr-[9px]"
									>Выберите валюту оплаты</span
							>
							<div class="relative flex items-center lg:block hidden">
									<img
											@mouseover="showTooltip = true"
											@mouseleave="showTooltip = false"
											:src="iconSource"
											alt="tooltip"
											class="w-[13px] h-[13px] cursor-pointer transition-all duration-300"
									/>
									<transition name="fade">
											<div
													v-if="showTooltip"
													class="absolute top-[23px] w-[247px] px-3 py-2 font-[500] text-[14px] bg-white rounded-[10px] tooltip-shadow z-10"
											>
													Тут выбирается способ которым вы будете оплачивать
											</div>
									</transition>
							</div>
					</div>
					<div class="flex flex-wrap gap-4 mb-[30px]">
							<!-- Криптовалюты -->
							<div
									class="relative flex items-center py-[22px] pr-[24px] pl-[20px] bg-white rounded-[12px] shadow-custom cursor-pointer"
									@click="toggleCurrencies('CRYPTO')"
							>
									<img
											src="../assets/images/icons/crypto-icon.svg"
											alt="Криптовалюты"
											class="w-6 h-6 mr-[10px]"
									/>
									<span class="font-[500] text-[14px]">Криптовалюты</span>
									<span
											class="absolute top-[3px] right-[3px] px-[6px] py-[2px] text-[10px] rounded-[100px] text-white recommend-bg"
											>Рекомендуем</span
									>
							</div>

							<!-- Обычные валюты -->
							<div
									class="relative flex items-center py-2 px-1 bg-white rounded-lg shadow-custom cursor-pointer"
									@click="toggleCurrencies('FIAT')"
							>
									<div
											class="flex item-center py-3 pr-[20px] pl-4 mr-[10px] border-r"
									>
											<img
													src="../assets/images/icons/rub-icon.svg"
													alt="RUB"
													class="w-6 h-6 mr-3"
											/>
											<span class="text-4 font-[500]">RUB</span>
									</div>
									<div class="flex items-center p-3 pr-4">
											<img
													src="../assets/images/icons/exchange-icon.svg"
													alt="RUB"
													class="w-6 h-6 mr-3"
											/>
											<span class="text-[14px] font-[500] mr-[10px]"
													>Другие валюты</span
											>
											<img
													src="../assets/images/icons/arrow-icon.svg"
													alt="Dropdown"
													class="w-4 h-4 transition-transform duration-300"
													:class="{ 'rotate-180': showDropdown }"
											/>
									</div>
							</div>
					</div>

					<!-- Блок выбора конкретной валюты -->
					<transition name="fade">
							<div
									v-if="showCurrencies"
									class="flex flex-wrap gap-[15px] mb-[15px] transition-all duration-300"
							>
									<div
											v-for="currency in availableCurrencies"
											:key="currency.code"
											class="relative flex items-center py-3 pr-6 pl-[20px] bg-white rounded-xl shadow-custom cursor-pointer transition-all duration-300"
											@click="selectCurrency(currency.code)"
											:class="{
													'active-border': selectedCurrency === currency.code,
											}"
									>
											<img
													:src="getIcon(currency.icon_code)"
													:alt="currency.title"
													class="w-6 h-6 mr-2"
											/>
											<span class="text-sm font-medium">{{
													currency.title
											}}</span>
									</div>
							</div>
					</transition>
			</div>
	</div>
	<!-- Блок выбора конкретного метода оплаты -->
	<div class="container mx-auto max-w-[1210px] px-[15px] mb-[5px]">
			<label class="block lg:text-[20px] sm:text-[20px] text-[14px] font-[400] lg:pl-[10px]"
					>Выберите способ оплаты</label
			>
			<div
					class="max-h-[214px] overflow-y-scroll custom-scrollbar py-[10px] px-[10px]"
			>
					<div
							class="methods grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4"
					>
							<div
									v-for="method in paymentMethods"
									:key="method.code"
									class="relative flex items-center text-[13px] sm:text-[14px] lg:text-[16px] py-[10px] pl-[12px] lg:py-[18px] lg:pl-[20px] bg-white rounded-xl shadow-custom cursor-pointer transition-all duration-300"
									@click="selectPaymentMethod(method.code)"
									:class="{
											'active-border': selectedPaymentMethod === method.code,
									}"
							>
									<img
											:src="getIcon(method.code)"
											alt=""
											class="w-10 h-8 mr-[13px]"
									/>
									<div class="flex flex-col leading-none">
											<span class="text-4 font-[500]">{{
													method.title
											}}</span>
											<div>
													<span class="text-[13px] font-[400] opacity-60"
															>Комиссия:</span
													>
													<span class="text-[13px] font-[500]">{{
															method.commission
													}}</span>
											</div>
									</div>
							</div>
					</div>
			</div>
	</div>
	<div class="container mx-auto max-w-[1190px] px-[15px] mb-[60px]">
			<!-- Список стран -->
			<div class="information-toggle relative">
					<button @click="toggleInfo" class="flex items-center mb-[10px]">
							<img
									@mouseover="showTooltipAtt = true"
									@mouseleave="showTooltipAtt = false"
									:src="iconSourceAtt"
									alt="tooltip"
									class="w-[13px] h-[13px] cursor-pointer transition-all duration-300 mr-[6px]"
							/>
							<span class="text-3 lg:text-[14px] font-[500] text-left">{{
									showInfo
											? "Внимание, при нажатии скрывается информация про страны"
											: "Внимание, при нажатии раскрывается информация про страны"
							}}</span>
							<img
									src="../assets/images/icons/arrow-icon.svg"
									alt="Dropdown"
									class="w-4 h-4 ml-2 transition-transform duration-300"
									:class="{ 'rotate-180': showInfo }"
							/>
							<transition name="fade">
									<div
											v-if="showTooltipAtt"
											class="absolute top-[23px] w-[167px] text-left pl-3 py-2 font-[500] text-[14px] text-[#21252980] bg-white rounded-[10px] tooltip-shadow z-10"
									>
											Минимальная сумма: <br />
											<span class="text-[#212529] font-[500]"
													>{{ minAmount }}₽</span
											>
									</div>
							</transition>
					</button>
					<div v-if="showInfo" class="text-3 sm:text-[14px] lg:text-[14px] font-[400]">
							<p class="mb-[10px]">Зачисление до 6 минут</p>
							<p>Эта платежная система не принимает платежи из стран:</p>
							<ul>
									<li>
											Армения, Австрия, Азербайджан, Бельгия, Болгария, Кипр,
											Чешская Республика, Дания, Эстония, Финляндия, Франция,
											Грузия, Германия, Греция, Венгрия, Исландия, Ирландия,
											Испания, Италия, Кыргызстан, Латвия, Литва, Люксембург,
											Мальта, Румыния, Сербия и Черногория, Словакия,
											Словения, Швеция, Швейцария, Таджикистан, Турция,
											Туркменистан, Соединенное Королевство, Узбекистан,
											Австралия, Норвегия, Израиль, Португалия, Нидерланды,
											Саудовская Аравия, Объединенные Арабские Эмираты,
											Сингапур, Новая Зеландия, Хорватия, Польша,
											Бруней-Даруссалам, Перу, Южная Корея, Катар, Египет.
									</li>
							</ul>
					</div>
			</div>

			<div class="mt-6">
					<label
							class="block text-[14px] sm:text-[20px] lg:text-[20px] font-[400] mb-[15px]"
							>Укажите сумму платежа</label
					>
					<div
							ref="inputWrapper"
							:class="[
									'relative block border mb-[10px] border-[#0000001A] custom-placeholder rounded-[12px] w-full transition-all duration-100',
									{ 'active-border': inputActive },
									{ 'border-[#E86068]': errorMessage },
							]"
					>
							<input
									v-model="amount"
									v-money="amount"
									class="py-4 lg:pl-[20px] pl-4 rounded-[12px] w-full custom-placeholder focus:outline-none focus:border-transparent"
									:placeholder="placeholderText"
									@input="validateAmount"
									@click="inputClick"
							/>
							<span
									id="clear-input"
									@click="clearInput"
									class="absolute right-2.5 top-1/2 transform -translate-y-1/2 cursor-pointer p-2"
									>✕</span
							>
					</div>
					<div
							v-if="errorMessage"
							class="text-[#E86068] text-[12px] sm:text-sm lg:text-[14px] mb-[10px] mt-[-5px]"
					>
							{{ errorMessage }}
					</div>
					<div class="flex flex-wrap gap-[10px] mb-[30px]">
							<button
									v-for="preset in presets"
									:key="preset"
									class="text-[14px] font-[500] px-3 py-2 bg-[#2125290A] text-[#21252999] rounded-[10px] transition-colors duration-100 hover:text-[#212529] focus:text-[#212529]"
									@click="setPresetAmount(preset)"
									:class="[
											{ 'active-border bg-white': presetActive === preset },
									]"
							>
									{{ formatNumber(preset) }}₽
							</button>
					</div>
					
			</div>
			<div class="">
					<button
							@click="handlePayment"
							class="bg-gradient-to-r from-[#C5A67C] to-[#E2C299] hover:opacity-[80%] mb-[20px] p-2 rounded-[12px] text-white text-[20px] font-[500] w-full text-sm sm:text-base lg:text-lg transition-opacity duration-100"
					>
							Оплатить
					</button>
			</div>
			<div class="block lg:hidden text-3 sm:text-[14px] lg:text-[14px] font-[400]">
					<p class="mb-[10px]">Зачисление до 6 минут</p>
					<p>Эта платежная система не принимает платежи из стран:</p>
					<ul>
							<li>
									Армения, Австрия, Азербайджан, Бельгия, Болгария, Кипр,
									Чешская Республика, Дания, Эстония, Финляндия, Франция,
									Грузия, Германия, Греция, Венгрия, Исландия, Ирландия,
									Испания, Италия, Кыргызстан, Латвия, Литва, Люксембург,
									Мальта, Румыния, Сербия и Черногория, Словакия, Словения,
									Швеция, Швейцария, Таджикистан, Турция, Туркменистан,
									Соединенное Королевство, Узбекистан, Австралия, Норвегия,
									Израиль, Португалия, Нидерланды, Саудовская Аравия,
									Объединенные Арабские Эмираты, Сингапур, Новая Зеландия,
									Хорватия, Польша, Бруней-Даруссалам, Перу, Южная Корея,
									Катар, Египет.
							</li>
					</ul>
			</div>
	</div>
</template>

<script>
import axios from 'axios';
import { paymentInfo } from "../mockData";
import { mockBackend } from '../mockBackend';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      showInfo: false,
      selectedType: "FIAT",
      selectedCurrency: "RUB1",
      selectedPaymentMethod: null,
      amount: "",
      errorMessage: "",
      showDropdown: false,
      showTooltip: false,
      showTooltipAtt: false,
      showCurrencies: true,
      currencies: paymentInfo.data.currencies,
      paymentMethods: [],
      passiveIcon: new URL(
        "../assets/images/question-mark-passive.svg",
        import.meta.url
      ).href,
      activeIcon: new URL(
        "../assets/images/question-mark-active.svg",
        import.meta.url
      ).href,
      activeIcon2: new URL(
        "../assets/images/attention-mark-passive.svg",
        import.meta.url
      ).href,
      passiveIcon2: new URL(
        "../assets/images/attention-mark-active.svg",
        import.meta.url
      ).href,
      placeholderText: "",
      money: {
        decimal: "",
        thousands: ".",
        prefix: "",
        suffix: " ₽",
        precision: 0,
        masked: false,
      },
      inputActive: false,
      presets: [1000, 2000, 5000, 10000, 20000, 50000],
      presetActive: null,
    };
  },
  computed: {
    minAmount() {
      if (!this.paymentMethods) return 0;
      const selectedMethod = this.paymentMethods.find(
        (method) => method.code === this.selectedPaymentMethod
      );
      return selectedMethod ? selectedMethod.min_amount : 0;
    },
    availableCurrencies() {
      if (this.selectedType) {
        return this.currencies[this.selectedType];
      }
      return [];
    },
    iconSource() {
      return this.showTooltip ? this.activeIcon : this.passiveIcon;
    },
    iconSourceAtt() {
      return this.showTooltipAtt ? this.activeIcon2 : this.passiveIcon2;
    },
  },
  methods: {
    getPlaceholderText() {
      return `Минимальная сумма платежа: ${this.formatNumber(this.minAmount)} ₽`;
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    handleClickOutside(event) {
      const inputWrapper = this.$refs.inputWrapper;
      if (inputWrapper && !inputWrapper.contains(event.target)) {
        this.inputActive = false;
      }
    },
    toggleInfo() {
      this.showInfo = !this.showInfo;
    },
    toggleCurrencies(type) {
      if (this.selectedType === type) {
        this.showCurrencies = !this.showCurrencies;
      } else {
        this.selectedType = type;
        this.selectedCurrency = null;
        this.selectedPaymentMethod = null;
        this.paymentMethods = [];
        this.showCurrencies = true;
        this.selectCurrency("RUB1");
      }
      this.showDropdown = this.showCurrencies;
    },
    selectCurrency(currencyCode) {
      this.selectedCurrency = currencyCode;
      const selectedCurrency = this.availableCurrencies.find(
        (currency) => currency.code === currencyCode
      );
      this.paymentMethods = selectedCurrency ? selectedCurrency.methods : [];
      this.selectedPaymentMethod = this.paymentMethods.length
        ? this.paymentMethods[0].code
        : null;
    },
    selectPaymentMethod(methodCode) {
      this.selectedPaymentMethod = methodCode;
    },
    validateAmount(input) {
      let value;

      try {
        if (typeof input === "number") {
          value = input;
        } else if (
          input &&
          input.target &&
          typeof input.target.value !== "undefined"
        ) {
          const inputValue = input.target.value.toString();
          value = parseFloat(inputValue.replace(/[^\d]/g, ""));
        } else if (typeof input === "string") {
          value = parseFloat(input.replace(/[^\d]/g, ""));
        } else {
          console.error("Invalid input type:", input);
          throw new Error("Invalid input type");
        }

        if (isNaN(value) || value <= 0) {
          this.amount = "";
          this.errorMessage = "Пожалуйста, введите корректную сумму";
        } else {
          this.amount = value;
          this.errorMessage = "";
        }
      } catch (error) {
        console.error("Error in validateAmount:", error);
      }
    },
    async handlePayment() {
      if (!this.selectedCurrency || !this.selectedPaymentMethod) {
        this.errorMessage = 'Выберите валюту и метод оплаты';
        return;
      }
      if (this.amount < this.minAmount) {
        this.errorMessage = `Минимальная сумма для этого метода оплаты: ${this.formatNumber(this.minAmount)} ₽`;
        return;
      }

      const paymentData = {
        currency: this.selectedCurrency,
        method: this.selectedPaymentMethod,
        amount: this.amount
      };
      console.log("paymentData: ", paymentData);

      try {
        const response = await mockBackend(paymentData);
        if (response.success) {
          this.$router.push({ name: 'PaymentSuccess', params: { paymentData: JSON.stringify(paymentData) } });
        } else {
          this.errorMessage = response.message;
        }
      } catch (error) {
        this.errorMessage = 'Ошибка при создании платежа';
      }
    },
    getIcon(icon_code) {
      const icons = {
        dropdown: "arrow-icon.svg",
        RUB: "rub-icon.svg",
        card_rf: "card-rf.svg",
        card_mir: "mir.svg",
        sbp: "sbp.svg",
        other: "card.svg",
        payeer: "payeer.svg",
        paypal: "paypal.svg",
        beeline: "beeline.svg",
        crypto_icon: "crypto-icon.svg",
        cryptomus: "cryptomus.svg",
        exchange_icon: "exchange-icon.svg",
        fk_wallet: "fkwallet.svg",
        lava: "lava.svg",
        marstercard: "marstercard.svg",
        megafon: "megafon.svg",
        paypal: "paypal.svg",
        perfect_money: "perfectmoney.svg",
        steam_pay: "steampay.svg",
        stripe: "stripe_2.svg",
        tele2: "tele2.svg",
        card: "visa.svg",
        volet: "volet.svg",
      };

      const iconPath = icons[icon_code]
        ? `../assets/images/icons/${icons[icon_code]}`
        : "../assets/images/icons/default-icon.svg";
      return new URL(iconPath, import.meta.url).href;
    },
    inputClick() {
      this.inputActive = true;
    },
    setPresetAmount(amount) {
      this.amount = amount;
      this.presetActive = amount;
      this.validateAmount({ target: { value: amount } });
    },
    clearInput() {
      this.amount = "";
    },
  },
  watch: {
    selectedPaymentMethod() {
      this.placeholderText = this.getPlaceholderText();
    },
  },
  mounted() {
    this.toggleCurrencies("FIAT");
    this.selectCurrency("RUB1");
    this.placeholderText = this.getPlaceholderText();
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.text-primary {
    color: #212529;
}
.text-secondary {
    color: rgba(33, 37, 41, 0.6);
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.tooltip-shadow {
    box-shadow: 0px 0px 20px 0px #00000014;
}
.shadow-custom {
    box-shadow: 0px 0px 15px 0px #0000000f;
}
.shadow-custom:hover {
    box-shadow: 0px 0px 20px 0px #00000014;
}
.recommend-bg {
    background: linear-gradient(269.01deg, #e2c299 5.64%, #c5a67c 94.29%);
}
.active-border {
    position: relative;
    border-radius: 12px;
}

.active-border::before {
    content: "";
    position: absolute;
    width: calc(100% + 4px);
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 15px;
    background-image: linear-gradient(269.01deg, #e2c299 5.64%, #c5a67c 94.29%);
    z-index: -1;
    pointer-events: none; /* чтобы градиент не перекрывал содержимое */
}

.custom-scrollbar {
    scrollbar-width: 4px;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #d8d8d8;
    border-radius: 50px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-placeholder::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: #212529;
    opacity: 0.6;
}
.custom-placeholder:hover {
    border-color: #0000004d;
}
.custom-placeholder:hover.custom-placeholder::placeholder {
    opacity: 1;
}
@media (max-width: 640px) {
  .custom-placeholder::placeholder {
    font-size: 14px;
  }
}
@media (max-width: 373px) {
  .methods {
    grid-template-columns: 1fr;
  }
}
</style>
