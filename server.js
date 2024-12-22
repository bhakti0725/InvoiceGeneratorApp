const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());

const currencies = [
  { name: "United States Dollar", symbol: "$", abbreviation: "USD" },
  { name: "Euro", symbol: "€", abbreviation: "EUR" },
  { name: "British Pound", symbol: "£", abbreviation: "GBP" },
  { name: "Japanese Yen", symbol: "¥", abbreviation: "JPY" },
  { name: "Indian Rupee", symbol: "₹", abbreviation: "INR" },
  { name: "Australian Dollar", symbol: "A$", abbreviation: "AUD" },
  { name: "Canadian Dollar", symbol: "C$", abbreviation: "CAD" },
  { name: "Swiss Franc", symbol: "CHF", abbreviation: "CHF" },
  { name: "Chinese Yuan", symbol: "¥", abbreviation: "CNY" },
  { name: "Brazilian Real", symbol: "R$", abbreviation: "BRL" },
  { name: "United Arab Emirates Dirham", symbol: "د.إ", abbreviation: "AED" },
  { name: "Russian Ruble", symbol: "₽", abbreviation: "RUB" },
  { name: "South Korean Won", symbol: "₩", abbreviation: "KRW" },
  { name: "Mexican Peso", symbol: "MX$", abbreviation: "MXN" },
  { name: "South African Rand", symbol: "R", abbreviation: "ZAR" },
  { name: "Singapore Dollar", symbol: "S$", abbreviation: "SGD" },
  { name: "Turkish Lira", symbol: "₺", abbreviation: "TRY" },
  { name: "New Zealand Dollar", symbol: "NZ$", abbreviation: "NZD" },
  { name: "Hong Kong Dollar", symbol: "HK$", abbreviation: "HKD" },
  { name: "Norwegian Krone", symbol: "kr", abbreviation: "NOK" },
  { name: "Swedish Krona", symbol: "kr", abbreviation: "SEK" },
  { name: "Danish Krone", symbol: "kr", abbreviation: "DKK" },
  { name: "Thai Baht", symbol: "฿", abbreviation: "THB" },
  { name: "Malaysian Ringgit", symbol: "RM", abbreviation: "MYR" },
  { name: "Philippine Peso", symbol: "₱", abbreviation: "PHP" },
  { name: "Indonesian Rupiah", symbol: "Rp", abbreviation: "IDR" },
  { name: "Pakistani Rupee", symbol: "₨", abbreviation: "PKR" },
  { name: "Vietnamese Dong", symbol: "₫", abbreviation: "VND" },
  { name: "Egyptian Pound", symbol: "E£", abbreviation: "EGP" },
  { name: "Argentine Peso", symbol: "ARS$", abbreviation: "ARS" },
  { name: "Bangladeshi Taka", symbol: "৳", abbreviation: "BDT" },
  { name: "Chilean Peso", symbol: "CLP$", abbreviation: "CLP" },
  { name: "Colombian Peso", symbol: "COP$", abbreviation: "COP" },
  { name: "Czech Koruna", symbol: "Kč", abbreviation: "CZK" },
  { name: "Hungarian Forint", symbol: "Ft", abbreviation: "HUF" },
  { name: "Icelandic Krona", symbol: "kr", abbreviation: "ISK" },
  { name: "Israeli New Shekel", symbol: "₪", abbreviation: "ILS" },
  { name: "Kuwaiti Dinar", symbol: "KD", abbreviation: "KWD" },
  { name: "Moroccan Dirham", symbol: "MAD", abbreviation: "MAD" },
  { name: "Nigerian Naira", symbol: "₦", abbreviation: "NGN" },
  { name: "Polish Zloty", symbol: "zł", abbreviation: "PLN" },
  { name: "Qatari Riyal", symbol: "QR", abbreviation: "QAR" },
  { name: "Saudi Riyal", symbol: "SR", abbreviation: "SAR" },
  { name: "Serbian Dinar", symbol: "дин", abbreviation: "RSD" },
  { name: "Sri Lankan Rupee", symbol: "₨", abbreviation: "LKR" },
  { name: "Tanzanian Shilling", symbol: "TSh", abbreviation: "TZS" },
  { name: "Ukrainian Hryvnia", symbol: "₴", abbreviation: "UAH" },
  { name: "Ugandan Shilling", symbol: "USh", abbreviation: "UGX" },
  { name: "Venezuelan Bolivar", symbol: "Bs", abbreviation: "VES" },
  { name: "Zambian Kwacha", symbol: "ZK", abbreviation: "ZMW" }
];

app.get("/", (req, res) => {
  res.send("Welcome to the Currency API! Use /currencies to get data.");
});

app.get("/currencies", (req, res) => {
  res.json(currencies); // Send the currencies array as JSON
});

app.listen(PORT, () => {
  console.log(`Currency API is running at http://localhost:${PORT}`);
});
