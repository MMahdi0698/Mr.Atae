/**
 * Session 06 - Homework 01: Safe E-Commerce Cart & Discount Processor
 * File: cart.js
 */

// Step 1: master product catalog (source of truth in the Heap)
const MASTER_CATALOG = Object.freeze([
    { id: 101, title: "Studio Headphones", price: 250, inStock: true },
    { id: 102, title: "Mechanical Keyboard", price: 140, inStock: true },
    { id: 103, title: "USB-C Charging Hub", price: 50, inStock: true },
    { id: 104, title: "Wireless Gaming Mouse", price: 80, inStock: false },
]);

// Step 2: build a safe cart, cloning each item with spread so no reference leaks
const cart = [];

for (const product of MASTER_CATALOG) {
    if (product.id === 101) {
        cart.push({ ...product, quantity: 2 });
    } else if (product.id === 103) {
        cart.push({ ...product, quantity: 1 });
    }
}

// Step 3: calculate the subtotal with a for...of loop
let subtotal = 0;

for (const item of cart) {
    subtotal += item.price * item.quantity;
}

// Step 4: apply discount and shipping rules
const couponCode = "SAVE10";
const isVipMember = true;

let discountAmount = 0;

if (couponCode === "SAVE10") {
    discountAmount = subtotal * 0.10;
} else if (couponCode === "VIP20" && isVipMember) {
    discountAmount = subtotal * 0.20;
} else {
    discountAmount = 0;
}

// VIP members ship free, everyone else pays 15
const shippingFee = isVipMember ? 0 : 15;

const finalTotal = (subtotal - discountAmount) + shippingFee;

// Step 5: print the checkout receipt
console.log("=== CHECKOUT RECEIPT ===");
console.log(`Subtotal: $${subtotal}`);
console.log(`Discount: -$${discountAmount}`);
console.log(`Shipping: $${shippingFee}`);
console.log(`Final Total: $${finalTotal}\n`);

// Automated verification suite
console.log("🧪 Running Verification Tests for cart.js...\n");

// Test 1: verify the master catalog was NOT mutated
const originalPrice = MASTER_CATALOG[0].price;
if (cart.length > 0) {
    cart[0].price = 1; // attempt to mutate a cart item
}
const catalogUnmutated = MASTER_CATALOG[0].price === originalPrice;
console.log(catalogUnmutated
    ? "✅ Test 1 Passed: Master catalog memory isolated against mutations."
    : "❌ Test 1 FAILED: Master catalog was mutated in the Heap!");

// Test 2: verify the subtotal calculation
console.log(subtotal === 550
    ? "✅ Test 2 Passed: Subtotal calculated accurately ($550)."
    : `❌ Test 2 FAILED: Expected 550, got ${subtotal}`);

// Test 3: verify discount and shipping
console.log(discountAmount === 55 && shippingFee === 0 && finalTotal === 495
    ? "✅ Test 3 Passed: Discounts and shipping calculated correctly."
    : "❌ Test 3 FAILED: Final total calculation incorrect.");

console.log("\n🎉 Verification complete!");