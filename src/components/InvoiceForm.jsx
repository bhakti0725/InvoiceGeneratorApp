import React, {useEffect, useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from '../helpers/incrementString';
const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});



const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [CashierAdd, setCashierAdd] = useState('');
  const [CustomerAdd, setCustomerAdd]= useState('');
 

  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
    },
  ]);


  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('http://localhost:3000/currencies'); // Your API URL
        const data = await response.json();
        setCurrencyList(data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  const currencyConversion = {
    USD: 1,       // USD is the base currency
    EUR: 0.93,    // Example conversion rate from USD to EUR
    GBP: 0.81,    // Example conversion rate from USD to GBP
    JPY: 147.40,  // Example conversion rate from USD to JPY
    INR: 83.10,   // Example conversion rate from USD to INR
    AUD: 1.58,    // Example conversion rate from USD to AUD
    CAD: 1.36,    // Example conversion rate from USD to CAD
    CHF: 0.89,    // Example conversion rate from USD to CHF
    CNY: 7.17,    // Example conversion rate from USD to CNY
    BRL: 5.23,    // Example conversion rate from USD to BRL
    AED: 3.67,    // Example conversion rate from USD to AED
    RUB: 96.50,   // Example conversion rate from USD to RUB
    KRW: 1340.50, // Example conversion rate from USD to KRW
    MXN: 17.50,   // Example conversion rate from USD to MXN
    ZAR: 18.80,   // Example conversion rate from USD to ZAR
    SGD: 1.37,    // Example conversion rate from USD to SGD
    TRY: 27.00,   // Example conversion rate from USD to TRY
    NZD: 1.64,    // Example conversion rate from USD to NZD
    HKD: 7.85,    // Example conversion rate from USD to HKD
    NOK: 10.67,   // Example conversion rate from USD to NOK
    SEK: 10.60,   // Example conversion rate from USD to SEK
    DKK: 6.94,    // Example conversion rate from USD to DKK
    THB: 35.50,   // Example conversion rate from USD to THB
    MYR: 4.67,    // Example conversion rate from USD to MYR
    PHP: 56.00,   // Example conversion rate from USD to PHP
    IDR: 15250.00,// Example conversion rate from USD to IDR
    PKR: 290.00,  // Example conversion rate from USD to PKR
    VND: 24500.00,// Example conversion rate from USD to VND
    EGP: 31.00,   // Example conversion rate from USD to EGP
    ARS: 350.00,  // Example conversion rate from USD to ARS
    BDT: 110.00,  // Example conversion rate from USD to BDT
    CLP: 875.00,  // Example conversion rate from USD to CLP
    COP: 4250.00, // Example conversion rate from USD to COP
    CZK: 22.80,   // Example conversion rate from USD to CZK
    HUF: 365.00,  // Example conversion rate from USD to HUF
    ISK: 137.00,  // Example conversion rate from USD to ISK
    ILS: 3.84,    // Example conversion rate from USD to ILS
    KWD: 0.31,    // Example conversion rate from USD to KWD
    MAD: 10.30,   // Example conversion rate from USD to MAD
    NGN: 770.00,  // Example conversion rate from USD to NGN
    PLN: 4.28,    // Example conversion rate from USD to PLN
    QAR: 3.64,    // Example conversion rate from USD to QAR
    SAR: 3.75,    // Example conversion rate from USD to SAR
    RSD: 107.00,  // Example conversion rate from USD to RSD
    LKR: 330.00,  // Example conversion rate from USD to LKR
    TZS: 2500.00, // Example conversion rate from USD to TZS
    UAH: 37.00,   // Example conversion rate from USD to UAH
    UGX: 3700.00, // Example conversion rate from USD to UGX
    VES: 35.00,   // Example conversion rate from USD to VES
    ZMW: 20.30    // Example conversion rate from USD to ZMW
};

  

  const convertCurrency = (amount, currency) => {
    const conversionRate = currencyConversion[currency] || 1;
    return amount * conversionRate;
  };

  const convertedSubtotal = convertCurrency(subtotal, selectedCurrency);
  const convertedTaxRate = convertCurrency(taxRate, selectedCurrency);
  const convertedDiscountRate = convertCurrency(discountRate, selectedCurrency);
  const convertedTotal = convertCurrency(total, selectedCurrency);

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              required
              className="max-w-[130px]"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
            />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">INVOICE</h1>

        <div className="flex items-center space-x-2 mb-3">
          <label className="font-bold" htmlFor="currency">
            Currency:
          </label>
          <select
            id="currency"
            value={selectedCurrency}
            placeholder="USD"
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="border rounded p-2"
          >
            {currencyList.map((currencies) => (
              <option key={currencies.abbreviation} value={currencies.abbreviation}>
                {currencies.name} ({currencies.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
          <label
            htmlFor="cashierName"
            className="text-sm font-bold sm:text-base"
          >
            Cashier:
          </label>
          <input 
            required
            className="flex-1"
            placeholder="Cashier name"
            type="text"
            name="cashierName"
            id="cashierName"
            value={cashierName}
            onChange={(event) => setCashierName(event.target.value)}
          />
          <label
            htmlFor="customerName"
            className="col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Customer:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Customer name"
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />
          <label
            htmlFor="cashierAdd"
            className="text-sm font-bold sm:text-base"
          >
            CashierAddress:
          </label>
          <textarea
            required
            className="flex-2"
            placeholder="Cashier address"
            type="text"
            name="cashierAdd"
            id="cashierAdd"
            value={CashierAdd}
            onChange={(event) => setCashierAdd(event.target.value)}
          />
          <label
            htmlFor="customerAdd"
            className="text-sm font-bold sm:text-base"
          >
            CustomerAddress:
          </label>
          <textarea
            required
            className="flex-2"
            placeholder="Customer address"
            type="text"
            name="customerAdd"
            id="customerAdd"
            value={CustomerAdd}
            onChange={(event) => setCustomerAdd(event.target.value)}
          />
        </div>
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>ITEM</th>
              <th>QTY</th>
              <th className="text-center">PRICE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
        </button>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>
              {currencyList.find((currency) => currency.abbreviation === selectedCurrency)?.symbol}
              {convertedSubtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Discount:</span>
            <span>
              ({discount || '0'}%) {currencyList.find((currency) => currency.abbreviation === selectedCurrency)?.symbol}
              {convertedDiscountRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Tax:</span>
            <span>
              ({tax || '0'}%) {currencyList.find((currency) => currency.abbreviation === selectedCurrency)?.symbol}
              {convertedTaxRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              {currencyList.find((currency) => currency.abbreviation === selectedCurrency)?.symbol}
              {convertedTotal % 1 === 0 ? convertedTotal : convertedTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="basis-1/4 bg-transparent">
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review Invoice
          </button>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              cashierName,
              customerName,
              cashierAddress: CashierAdd,
              customerAddress: CustomerAdd,
              convertedSubtotal,
              convertedTaxRate,
              convertedDiscountRate,
              convertedTotal,

            }}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          />

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-bold md:text-base" htmlFor="tax">
                Tax rate:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="number"
                  name="tax"
                  id="tax"
                  min="0.01"
                  step="0.01"
                  placeholder="0.0"
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  %
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="discount"
              >
                Discount rate:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;