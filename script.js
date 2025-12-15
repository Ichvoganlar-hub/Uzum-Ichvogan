const catalogMenu = document.getElementById("catalog-menu")

function catalogBtn() {
    catalogMenu.classList.toggle("open")
}




async function fetchData() {
    try {
        let response = await fetch('http://localhost:3001/products');
        let data = await response.json();
        console.log(data);

        let wrapper = document.querySelector('.wrapper');

        data.forEach((product) => {
            let div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `


                <div class="bg-white rounded-2xl shadow-lg w-[260px] overflow-hidden">


<div class="relative p-4">
<img src="${product.image}" />
<button class="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
❤️
</button>
</div>




<!-- Content -->
<div class="p-4">
<h3 class="text-sm font-semibold leading-snug">
Podguznik Huggies Elite Soft, 1 size, 50 dona
</h3>


<!-- Price -->
<div class="mt-2">
<span class="text-lg font-bold text-purple-600">${product.price}</span>
<span class="text-sm text-gray-400 line-through ml-2">${product.monthlyPrice}</span>
</div>


<!-- Monthly -->
<div class="mt-1 text-sm text-gray-600">
<span class="font-semibold text-yellow-600">${product.imageLabel}</span>
</div>


<!-- Button -->
<button class="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-sm font-medium transition">
Savatga qo'shish
</button>
</div>
</div>

            `;
            wrapper.appendChild(div);
        });

    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
}


let btn = document.querySelector('.btn')

// SANDJ

fetchData();
