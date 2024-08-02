<template>
    <div 
        class="
        @container max-w-[1190px]
        mx-auto px-[15px] sm-max:px-[15px] lg-max:px-[25px] bmd-max:px-[25px] md-max:px-[25px]
        lg-max:pt-10 pt-[30px] 
        ">
        <h1 class="
        mb-[30px] sm-max:mb-[10px]
        text-4xl md-max:text-3xl sm-max:text-[18px] sm-max:leading-[19.8px]"
        >
            <span class="text-primary font-[700]">Пополните баланс,</span>
            <span class="text-secondary font-[500]">
                чтобы получить номер для приема смс</span
            >
        </h1>
        <div class="text-primary">
            <div 
                class="
                relative flex items-center 
                mb-[12px] sm-max:mb-[10px]">
                <span
                    class="
                    block 
                    mr-[9px] 
                    text-[20px] sm-max:text-[14px] font-[400]"
                    >Выберите валюту оплаты</span
                >
                <div class="relative flex items-center sm-max:hidden">
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
                            class="
                            absolute top-[23px] w-[247px] 
                            px-3 py-2 
                            font-[500] text-[14px] 
                            bg-white 
                            rounded-[10px] 
                            tooltip-shadow z-10"
                        >
                            Тут выбирается способ которым вы будете оплачивать
                        </div>
                    </transition>
                </div>
            </div>
            <div class="
                flex flex-wrap gap-4 sm-max:gap-[14px]
                mb-[30px] sm-max:mb-[22px]
                ">
                <!-- Криптовалюты -->
                <div
                    class="
                    relative flex items-center
                    py-[22px] pr-[24px] pl-[20px] 
                    sm-max:pt-[10px] sm-max:pb-3 sm-max:pl-4 sm-max:pr-[18px]
                    bg-white rounded-[12px] 
                    shadow-custom 
                    cursor-pointer"
                    @click="toggleCurrencies('CRYPTO')"
                >
                    <img
                        src="/src/assets/images/icons/crypto-icon.svg"
                        alt="Криптовалюты"
                        class="
                        w-6 h-6
                        mr-[10px]"
                    />
                    <span class="font-[500] text-[14px] sm-max:text-[13px]">Криптовалюты</span>
                    <span
                        class="
                        absolute top-[3px] right-[2px] sm-max:top-[1px] sm-max:right-1  
                        pr-[7px] pl-[6px] pt-[0] pb-[1px]

                        sm-max:pr-[3px] sm-max:pl-[5px] 
                        text-[10px] sm-max:text-[9px] rounded-[100px] text-white recommend-bg"
                        >Рекомендуем</span
                    >
                </div>

                <!-- Обычные валюты -->
                <div
                    class="
                    relative flex items-center 
                    py-2 px-1 sm-max:py-1 sm-max:px-[2px] 
                    bg-white 
                    rounded-lg 
                    shadow-custom 
                    cursor-pointer"
                    @click="toggleCurrencies('FIAT')"
                >
                    <div
                        class="
                        flex item-center 
                        py-3 pr-[20px] pl-4 mr-[10px] sm-max:py-2 sm-max:pr-[16px] sm-max:pl-3    
                        border-r"
                    >
                        <img
                            src="/src/assets/images/icons/rub-icon.svg"
                            alt="RUB"
                            class="
                            w-[28px] h-[28px] sm-max:w-6 sm-max:h-6 
                            mr-3"
                        />
                        <span 
                            class="
                            text-[16px] sm-max:text-[14px] font-[500]">
                        RUB
                        </span>
                    </div>
                    <div 
                        class="
                        flex items-center 
                        p-3 pr-4 sm-max:p-2 sm-max:pr-3">
                        <img
                            src="/src/assets/images/icons/exchange-icon.svg"
                            alt="RUB"
                            class="w-6 h-6 sm-max:mr-2 mr-[8px]"
                        />
                        <span 
                            class="
                            mr-[10px] sm-max:mr-2
                            text-[14px] sm-max:text-[13px] font-[500]"
                            >Другие валюты</span
                        >
                        <img
                            src="/src/assets/images/icons/arrow-icon.svg"
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
                    class="
                    flex flex-wrap gap-[15px] sm-max:gap-2 sm-max:grid sm-max:grid-cols-3
                    mb-[15px] 
                    transition-all duration-300"
                >
                    <div
                        v-for="currency in availableCurrencies"
                        :key="currency.code"
                        class="
                        relative flex items-center 
                        py-3 pr-6 pl-[20px] sm-max:py-[10px] sm-max:pl-4 sm-max:pr-[21px]
                        bg-white 
                        rounded-xl 
                        shadow-custom 
                        cursor-pointer 
                        transition-all duration-300"
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
                        <span class="text-[14px] sm-max:text-[12px] font-[500]">{{
                            currency.title
                        }}</span>
                    </div>
                </div>
            </transition>
        </div>
    </div>
    <!-- Блок выбора конкретного метода оплаты -->
    <div 
        class="
        @container max-w-[1210px] 
        mx-auto px-[15px] mb-[11px] sm-max:px-[5px]">
        <label
            class="
            block 
            @md:mb-[5px] pl-[10px] 
            text-[20px] md-max:text-[20px] sm-max:text-[14px] font-[400] leading-[23.44px] sm-max:leading-[1]"
            >Выберите способ оплаты</label
        >
        <div
            class="
            max-h-[214px] sm-max:max-h-[155px]  
            overflow-y-auto
            overflow-x-hidden 
            custom-scrollbar 
            py-[10px] pl-[12px] pr-[8px]"
        >
            <div
                class="
                methods 
                grid gap-4 grid-cols-5 
                sm-max:gap-2
                sm-max:grid-cols-2 
                md-max:grid-cols-2 
                bmd-max:grid-cols-3 
                "
            >
                <div
                    v-for="method in paymentMethods"
                    :key="method.code"
                    class="
                    relative flex items-center 
                    py-[16px] pl-[20px] sm-max:py-[10px] sm-max:pl-[12px]  
                    text-[16px] md-max:text-[14px] sm-max:text-[13px] 
                    bg-white rounded-xl shadow-custom cursor-pointer transition-all duration-300"
                    @click="selectPaymentMethod(method.code)"
                    :class="{
                        'active-border': selectedPaymentMethod === method.code,
                    }"
                >
                    <img
                        :src="getIcon(method.code)"
                        alt=""
                        class="
                        w-[48px] h-[36px] sm-max:w-[36px] sm-max:h-[30px]
                        mr-[13px] sm-max:mr-[6px]"
                    />
                    <div class="flex flex-col leading-[15.36px]">
                        <span 
                            class="
                            text-[16px] sm-max:text-[13px] font-[500]">{{
                            method.title
                        }}</span>
                        <div>
                            <span 
                                class="
                                mr-[2px]
                                text-[13px] sm-max:text-[11px] font-[400] 
                                opacity-60"
                                >Комиссия:</span
                            >
                            <span 
                            class="
                            text-[13px] sm-max:text-[11px] font-[500]">{{
                                method.commission
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="
        @container max-w-[1190px]
        mx-auto px-[15px] sm-max:px-[15px] lg-max:px-[25px] bmd-max:px-[25px] md-max:px-[25px] mb-[60px]">
        <!-- Список стран -->
        <div class="information-toggle relative">
            <button @click="toggleInfo" class="flex items-center mb-[30px] sm-max:mb-[20px]">
                <img
                    @mouseover="showTooltipAtt = true"
                    @mouseleave="showTooltipAtt = false"
                    :src="iconSourceAtt"
                    alt="tooltip"
                    class="w-[13px] h-[13px] cursor-pointer transition-all duration-300 mr-[6px]"
                />
                <span 
                    class="
                    text-[14px] sm-max:text-[12px] font-[500] text-left leading-[14.06px]">{{
                    showInfo
                        ? "Внимание, при нажатии скрывается информация про страны"
                        : "Внимание, при нажатии раскрывается информация про страны"
                }}</span>
                <img
                    src="/src/assets/images/icons/arrow-icon.svg"
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
            <div
                v-if="showInfo"
                class="sm-max:text-3 text-[14px] font-[400] max-w-[462px] transition-all duration-300"
            >
                <p class="mb-[10px] sm-max:mb-[8px]">Зачисление до 6 минут</p>
                <p class="mb-[2px] sm-max:pr-[50px] sm-max:mb-[4px]">Эта платежная система не принимает платежи из стран:</p>
                <ul class="sm-max:leading-[16.8px] mb-[20px]">
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

        <div class="">
            <label
                class="
                block 
                mb-[13px] sm-max:mb-[5px]
                text-[20px] sm-max:text-[14px] font-[400]"
                >Укажите сумму платежа</label
            >
            <div
                ref="inputWrapper"
                :class="[
                    'relative block border mb-[10px] sm-max:mb-[5px] border-[#0000001A] custom-placeholder rounded-[12px] w-full transition-all duration-100',
                    { 'active-border': inputActive },
                    { 'border-[#E86068]': errorMessage },
                ]"
            >
                <input
                    v-model="amount"
                    v-money="amount"
                    class="
                    w-full 
                    py-[15px] pl-[20px] sm-max:pl-4 sm-max:pt-[16px] sm-max:pb-[12px] 
                    text-[16px] sm-max:text-[14px] font-[500] leading-[18.75px] sm-max:leading-[16.41px] 
                    rounded-[12px] 
                    custom-placeholder 
                    focus:outline-none focus:border-transparent"
                    :placeholder="placeholderText"
                    @input="validateAmount"
                    @click="inputClick"
                />
                <span
                    id="clear-input"
                    @click="clearInput"
                    class="absolute right-2.5 top-1/2 transform -translate-y-1/2 cursor-pointer p-2"
                    v-if="isClearVisible"
                >
                    ✕
                </span>
            </div>
            <div
                v-if="errorMessage"
                class="text-[#E86068] text-[14px] sm-max:text-[12px] mb-[10px] mt-[-5px]"
            >
                {{ errorMessage }}
            </div>
            <div 
                class="
                flex gap-[10px] mb-[24px] sm-max:mb-[10px]
                hide-scrollbar
                sm-max:overflow-x-scroll
                md-max:overflow-x-scroll
                sm-max:py-[2px] sm-max:px-[2px]
                md-max:py-[2px] md-max:px-[2px]
                ">
                <button
                    v-for="preset in presets"
                    :key="preset"
                    class="
                    px-3 py-2 
                    text-[14px] font-[500] text-[#21252999] 
                    bg-[#2125290A] 
                    hover:text-[#212529] focus:text-[#212529]
                    rounded-[10px] transition-colors duration-100" 
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
                class="
                w-full
                mb-[20px] py-[19px] sm-max:py-[14px] 
                text-white text-[20px] font-[500] sm-max:text-[18px] leading-[23.44px] sm-max:leading-[21.09px]
                bg-gradient-to-r from-[#C5A67C] to-[#E2C299] hover:opacity-[80%] 
                rounded-[12px]
                transition-opacity duration-100"
            >
                Оплатить
            </button>
        </div>
        <div
            class="
            sm-max:block hidden 
            text-[12px] font-[400] leading-[20px]"
        >
            <p class="mb-[8px]">Зачисление до 6 минут</p>
            <p class="pr-[50px] mb-[4px]">Эта платежная система не принимает платежи из стран:</p>
            <ul class="leading-[16.8px]">
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
/* import axios from "axios"; */
/* import { useRouter } from "vue-router"; */
import { paymentInfo } from "../mockData";
import { mockBackend } from "../mockBackend";

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
                "/src/assets/images/question-mark-passive.svg",
                import.meta.url
            ).href,
            activeIcon: new URL(
                "/src/assets/images/question-mark-active.svg",
                import.meta.url
            ).href,
            activeIcon2: new URL(
                "/src/assets/images/attention-mark-passive.svg",
                import.meta.url
            ).href,
            passiveIcon2: new URL(
                "/src/assets/images/attention-mark-active.svg",
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
        isClearVisible() {
            return this.amount > 0;
        }
    },
    methods: {
        getPlaceholderText() {
            return `Минимальная сумма платежа: ${this.formatNumber(
                this.minAmount
            )}₽`;
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
            this.paymentMethods = selectedCurrency
                ? selectedCurrency.methods
                : [];
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
                this.errorMessage = "Выберите валюту и метод оплаты";
                return;
            }
            if (this.amount < this.minAmount) {
                this.errorMessage = `Внимание, минимальная сумма: ${this.formatNumber(
                    this.minAmount
                )}₽`;
                return;
            }

            const paymentData = {
                currency: this.selectedCurrency,
                method: this.selectedPaymentMethod,
                amount: this.amount,
            };
            console.log("paymentData: ", paymentData);

            try {
                const response = await mockBackend(paymentData);
                if (response.success) {
                    this.$router.push({
                        name: "PaymentSuccess",
                        params: { paymentData: JSON.stringify(paymentData) },
                    });
                } else {
                    this.errorMessage = response.message;
                }
            } catch (error) {
                this.errorMessage = "Ошибка при создании платежа";
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
                ? `/assets/images/icons/${icons[icon_code]}`
                : "/assets/images/icons/default-icon.svg";
            console.log("iconPath: ", iconPath);
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
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


.custom-scrollbar::-webkit-scrollbar {
    width: 4px; 
}
.custom-scrollbar::-webkit-scrollbar-track {
    background-color: #fff;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #d8d8d8; 
    border-radius: 50px; 
}
.custom-scrollbar::-webkit-scrollbar-button {
    background-color: transparent; 
    border: none; 
    display: block;
    height: 5px;
}

.hide-scrollbar {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    overflow: -moz-scrollbars-none;
    overflow: -webkit-paged-x;
}

.hide-scrollbar::-webkit-scrollbar {
    display: none; /* Safari и Chrome */
}
.custom-placeholder::placeholder {
    font-size: 16px;
    font-weight: 400;
    line-height: 18.75px;
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
</style>
