function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const korzinkaDiv = document.querySelector(".korzinkadiv");
    if (!korzinkaDiv) return;

    const cart = getCart();
    korzinkaDiv.innerHTML = "";

    if (cart.length === 0) {
        korzinkaDiv.innerHTML = `<p class="text-gray-500 text-lg">Savatingiz bo‘sh</p>`;
        return;
    }

    cart.forEach((product, index) => {
        korzinkaDiv.innerHTML += `
       <div class="border border-gray-200 rounded-xl p-4 flex items-center gap-4 mb-4 bg-white shadow-sm w-[800px]">
    <!-- Checkbox -->
    <input type="checkbox" checked class="h-5 w-5 text-purple-600">

    <!-- Mahsulot rasmi -->
    <img src="${product.image}" alt="${product.name}" class="w-24 h-24 object-cover rounded">

    <!-- Mahsulot ma'lumotlari -->
    <div class="flex-1 flex flex-col justify-between h-full">
        <!-- Nom va sotuvchi -->
        <div>
            <p class="font-semibold text-gray-800">${product.name}</p>
            <p class="text-xs text-gray-500 mt-1">Sotuvchi: ${product.seller || "Oila Tanlovi"}</p>
            <!-- Arzon narx label -->
            <span class="inline-block bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full mt-1">Arzon narx kafolati</span>
        </div>

        <!-- Son boshqaruvi -->
        <div class="flex items-center gap-2 mt-2">
            <button class="minus px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-100" data-i="${index}">−</button>
            <span class="px-2">${product.count}</span>
            <button class="plus px-2 py-1 border rounded-md text-gray-600 hover:bg-gray-100" data-i="${index}">+</button>
        </div>
    </div>

    <!-- Narx va karta narxi -->
    <div class="flex flex-col items-end gap-1">
        <p class="text-purple-600 font-bold text-lg">${product.price} so'm</p>
        <p class="text-gray-400 text-sm">Uzum kartasiz ${product.priceNoCard || product.price} so'm</p>
    </div>

    <!-- Yo‘q qilish tugmasi -->
    <button class="remove text-gray-400 hover:text-red-600 ml-4" data-i="${index}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
    </button>
</div>

`;
    });

const total = cart.reduce((sum, p) => {
    const priceNumber = typeof p.price === "string" 
        ? Number(p.price.replace(/\D/g, "")) 
        : Number(p.price);
    return sum + priceNumber * p.count;
}, 0);



    korzinkaDiv.innerHTML += `
<div class="absolute top-[22%] left-[63%] w-[420px]  bg-white border border-gray-200 rounded-2xl p-5 shadow-lg">

    <!-- Yetkazib berish -->
    <div class="flex items-center gap-3 mb-4">
        <div class="bg-purple-100 text-purple-600 p-2 rounded-lg">
            🚚
        </div>
        <div>
            <p class="font-semibold text-sm">Topshirish punktiga yetkazib berish</p>
            <p class="text-xs text-gray-500">5 000 so‘m</p>
        </div>
    </div>

    <div class="h-[6px] bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div class="h-full w-[60%] bg-purple-600 rounded-full"></div>
    </div>

    <p class="font-semibold mb-3">Buyurtmangiz</p>

    <div class="flex justify-between text-sm mb-1">
        <span class="text-gray-500">Mahsulotlar (${cart.length}):</span>
        <span>${total.toLocaleString()} so‘m</span>
    </div>

    <div class="flex justify-between text-sm mb-1">
        <span class="text-gray-500">Yetkazib berish:</span>
        <span>5 000 so‘m</span>
    </div>

    <hr class="my-3">

    <div class="flex justify-between items-center">
        <div>
            <p class="text-sm text-gray-500">Uzum karta bilan</p>
            <p class="text-2xl font-bold text-purple-600">
                ${(total * 0.9).toLocaleString()} so‘m
            </p>
            <p class="text-sm text-green-600">
                Tejovingiz: ${(total * 0.1).toLocaleString()} so‘m
            </p>
        </div>
    </div>

    <div class="flex justify-between text-sm mt-2">
        <span class="text-gray-500">Uzum kartasiz</span>
        <span>${total.toLocaleString()} so‘m</span>
    </div>

    <button id="checkoutBtn" class="mt-5 w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-xl text-lg font-semibold">
        Rasmiylashtirishga o‘tish
    </button>
</div>
`;

}
console.log(getCart());

document.addEventListener("click", e => {
    let cart = getCart();
    const index = e.target.dataset.i;

    if (e.target.classList.contains("plus")) {
        cart[index].count++;
    }

    if (e.target.classList.contains("minus")) {
        if (cart[index].count > 1) {
            cart[index].count--;
        } else {
            cart.splice(index, 1);
        }
    }

    if (e.target.classList.contains("remove")) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
});

document.addEventListener("DOMContentLoaded", renderCart);

document.addEventListener("click", e => {
    let cart = getCart();

    const removeBtn = e.target.closest(".remove");
    const plusBtn = e.target.closest(".plus");
    const minusBtn = e.target.closest(".minus");

    if (removeBtn) {
        const index = removeBtn.dataset.i;
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
        return;
    }

    if (plusBtn) {
        const index = plusBtn.dataset.i;
        cart[index].count++;
        saveCart(cart);
        renderCart();
        return;
    }

    
});


