// mockBackend.js
export const mockBackend = async (paymentData) => {
  console.log("Received payment data:", paymentData);

  const { currency, method, amount } = paymentData;
  const validCurrencies = ["RUB1", "RUB2", "RUB3", "RUB4", "RUB5"];
  const validMethods = [
    "card_rf", "card_mir", "sbp", "payeer", "paypal", "beeline",
    "cryptomus", "fk_wallet", "lava", "marstercard", "megafon",
    "perfect_money", "steam_pay", "stripe", "tele2", "visa", "volet"
  ];

  const isCurrencyValid = validCurrencies.includes(currency);
  const isMethodValid = validMethods.includes(method);
  const isAmountValid = typeof amount === 'number' && amount > 0;

  if (isCurrencyValid && isMethodValid && isAmountValid) {
    return {
      success: true,
      data: paymentData
    };
  } else {
    return {
      success: false,
      message: "Некорректные данные для создания платежа"
    };
  }
};
