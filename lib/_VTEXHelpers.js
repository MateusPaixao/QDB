/* eslint-disable no-undef */
export const getOrderForm = () => (vtexjs.checkout.getOrderForm());

export const updateOrderForm = (string, object) => (vtexjs.checkout.sendAttachment(string, object));

export const addToCart = (item) => (vtexjs.checkout.addToCart([item]));

export const updateItem = (item) => (vtexjs.checkout.updateItems([item]));

export const removeItem = (item) => (vtexjs.checkout.removeItems(item)); 

