
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("main section > div"); // Sizning container

  try {
    const res = await fetch("./db.json");
    const data = await res.json();

    if (!data.products || data.products.length === 0) {
      // Mahsulot bo'lmasa
      container.innerHTML = `
        <div class="text-center py-20 text-gray-500 text-lg">
          Sizning savatingiz bo'sh
        </div>
      `;
      return;
    }

    // Agar ma’lumot bo‘lsa, main HTML ni render qilamiz
    container.innerHTML = ""; // Bo‘shatish
    data.products.forEach(product => {
      const card = document.createElement("div");
      card.className = "border border-gray-300 w-[700px] h-[300px] rounded-xl mb-6";
      card.innerHTML = `
        <div class="border-b-[1px] p-[20px] w-full border-gray-200">
          <div class="flex justify-start items-center gap-2">
            <input type="checkbox">
            <h1 class="font-sans">Hamasini yechish</h1>
          </div>
        </div>
        <div class="px-[20px] py-[30px]">
          <div class="pb-5">
            <p class="text-gray-400 font-medium">${product.delivery}</p>
            <h1 class="text-gray-800 font-medium text-[20px]">${product.deliveryDate}</h1>
          </div>
          <div class="flex justify-around items-center">
            <div class="flex justify-start items-center gap-[10px]">
              <input type="checkbox">
              <img class="w-[100px] h-[100px]" src="${product.img}" alt="${product.name}">
              <div class="flex flex-col justify-center items-start">
                <p>${product.name}</p>
                <div class="flex justify-around items-center gap-[66px]">
                  <div class="flex justify-center items-center gap-1">
                    <p class="text-gray-400 font-medium">sotuvchi:</p>
                    <p class="text-gray-800 font-sans">${product.seller}</p>
                  </div>

                  <div class="flex items-center justify-center border border-gray-300 rounded-md overflow-hidden w-[120px] h-[35px]">
                    <button class="flex items-center justify-center hover:bg-gray-100 transition">
                      <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                      </svg>
                    </button>
                    <span class="px-4 text-gray-800 font-medium">${product.count}</span>
                    <button class="flex items-center justify-center hover:bg-gray-100 transition">
                      <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                      </svg>
                    </button>
                  </div>

                  <div class="flex flex-col justify-end items-end">
                    <button class="text-gray-400 font-medium flex justify-center items-center gap-1">
                      <img src="./korzin.png" alt="">Yo'q qilish
                    </button>
                    <div class="flex justify-center items-center gap-1">
                      <h1 class="font-bold text-[17px] text-purple-800">${product.price}</h1>
                      <p class="font-bold text-[17px] text-purple-800">So'm</p>
                    </div>
                    <div class="flex justify-center items-center gap-1 text-gray-600">
                      <p>Uzum kartasiz</p>
                      <p>${product.priceWithoutCard}</p>
                      <p>som</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = `
      <div class="text-center py-20 text-red-500">
        Ma'lumotlarni yuklab bo'lmadi
      </div>
    `;
  }
});

