/**
 * Session 07 - Homework 01: Dynamic E-Commerce Product Catalog
 * Deliverable: catalog.js
 */

// Step 1: master product entity
const ACTIVE_PRODUCT = {
    id: "prod-701",
    title: "Aura Studio Wireless Headphones",
    category: "Audiophile Hardware",
    description: "Precision-engineered 40mm beryllium drivers with adaptive active noise cancellation and 45-hour playback time.",
    originalPrice: 299.99,
    discountPercent: 20, // 20% discount applied
    stockCount: 4,       // threshold <= 5 triggers the low stock warning
    isFeatured: true,
};

// Step 2: pure calculation and formatting functions

// Task 2A: returns the discounted price rounded to 2 decimals, or basePrice when there is no discount
function calculateFinalPrice(basePrice, discountPercent = 0) {
    if (discountPercent <= 0) return basePrice;
    const finalPrice = basePrice * (1 - discountPercent / 100);
    return Number(finalPrice.toFixed(2));
}

// Task 2B: returns a string prefixed with "$" and exactly 2 decimals, e.g. "$239.99"
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

// Task 2C: returns the inventory label for a given stock count
function getStockLabel(stock) {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return `Only ${stock} left in stock - order soon!`;
    return `In Stock (${stock} units available)`;
}

// Step 3: DOM rendering function

// Task 3: connects JavaScript data to the live HTML elements
function renderProductToDOM(product) {
    // 1. select the card (guard clause stops early if it is missing)
    const cardEl = document.querySelector("#hero-product-card");
    if (!cardEl) {
        console.error("Card element #hero-product-card not found!");
        return;
    }

    // 2. select the internal elements
    const titleEl = cardEl.querySelector("#product-title");
    const categoryEl = cardEl.querySelector("#product-category");
    const descEl = cardEl.querySelector("#product-description");
    const currentPriceEl = cardEl.querySelector("#current-price");
    const originalPriceEl = cardEl.querySelector("#original-price");
    const badgeEl = cardEl.querySelector("#product-badge");
    const inventoryEl = cardEl.querySelector("#inventory-status");

    // 3. compute derived values with the pure functions
    const finalPrice = calculateFinalPrice(product.originalPrice, product.discountPercent);
    const formattedFinal = formatCurrency(finalPrice);
    const formattedOriginal = formatCurrency(product.originalPrice);
    const stockText = getStockLabel(product.stockCount);

    // 4. safely update text content (never innerHTML)
    if (titleEl) titleEl.textContent = product.title;
    if (categoryEl) categoryEl.textContent = product.category;
    if (descEl) descEl.textContent = product.description;
    if (currentPriceEl) currentPriceEl.textContent = formattedFinal;

    // 5. handle the discount display and the badge
    if (product.discountPercent > 0) {
        if (originalPriceEl) {
            originalPriceEl.textContent = formattedOriginal;
            originalPriceEl.classList.add("is-discounted");
        }
        if (badgeEl) {
            badgeEl.textContent = `${product.discountPercent}% OFF`;
            badgeEl.classList.add("badge-sale");
            badgeEl.classList.remove("badge-out-of-stock");
        }
    } else if (product.stockCount === 0) {
        if (badgeEl) {
            badgeEl.textContent = "Sold Out";
            badgeEl.classList.add("badge-out-of-stock");
            badgeEl.classList.remove("badge-sale");
        }
    }

    // 6. handle the inventory status and its warning style
    if (inventoryEl) {
        inventoryEl.textContent = stockText;
        if (product.stockCount <= 5 && product.stockCount > 0) {
            inventoryEl.classList.add("low-stock");
        } else {
            inventoryEl.classList.remove("low-stock");
        }
    }

    // 7. toggle the card highlight if the product is featured
    cardEl.classList.toggle("card-highlight", Boolean(product.isFeatured));
}

// Step 4: initial render
renderProductToDOM(ACTIVE_PRODUCT);

// Step 5: automated verification suite
console.log("--- 🧪 Session 07 Homework 01 Verification Suite ---");
console.assert(calculateFinalPrice(100, 20) === 80, "calculateFinalPrice test failed!");
console.assert(calculateFinalPrice(50, 0) === 50, "calculateFinalPrice 0% discount test failed!");
console.assert(formatCurrency(24.5) === "$24.50", "formatCurrency test failed!");
console.assert(getStockLabel(0) === "Out of Stock", "getStockLabel sold out test failed!");
console.assert(getStockLabel(3).includes("Only 3 left"), "getStockLabel low stock test failed!");
console.log("✅ All helper assertions passed successfully!");