document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cart-container");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ❌ Agar savat bo‘sh bo‘lsa
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-20 text-gray-500 text-lg">
        Sizning savatingiz bo‘sh
      </div>
    `;
    return;
  }

  // Header
  container.innerHTML = `
    <div class="flex items-baseline gap-2 pb-6">
      <h1 class="text-gray-800 font-medium text-xl">Savatingiz,</h1>
      <h1 class="text-gray-700 font-medium text-lg">${cart.length} mahsulot</h1>
    </div>
  `;

  cart.forEach((product, index) => {
    container.innerHTML += `
      <div class="border border-gray-300 w-[700px] rounded-xl mb-6">

        <div class="border-b p-5 border-gray-200 flex items-center gap-2">
          <input type="checkbox">
          <h1>Hamasini yechish</h1>
        </div>

        <div class="p-5">
          <p class="text-gray-400">${product.delivery}</p>
          <h2 class="text-lg font-medium">${product.deliveryDate}</h2>

          <div class="flex gap-4 mt-4 items-center">
            <img src="${product.img}" class="w-[100px] h-[100px]" />

            <div class="flex-1">
              <p>${product.name}</p>
              <p class="text-sm text-gray-500">
                sotuvchi: <span class="text-black">${product.seller}</span>
              </p>
            </div>

            <div class="flex border rounded w-[120px] h-[35px]">
              <button onclick="changeCount(${index}, -1)" class="w-1/3">−</button>
              <span class="w-1/3 text-center">${product.count}</span>
              <button onclick="changeCount(${index}, 1)" class="w-1/3">+</button>
            </div>

            <div class="text-right">
              <p class="font-bold text-purple-800">${product.price} so'm</p>
              <p class="text-sm text-gray-500">
                Uzum kartasiz ${product.priceWithoutCard} so'm
              </p>

              <button onclick="removeItem(${index})"
                class="text-gray-400 mt-2 flex gap-1 items-center">
                <img src="./korzin.png"> Yo‘q qilish
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
});


// ➕➖ SON O‘ZGARTIRISH
function changeCount(index, value) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart[index].count += value;

  if (cart[index].count < 1) cart[index].count = 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// ❌ O‘CHIRISH
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
