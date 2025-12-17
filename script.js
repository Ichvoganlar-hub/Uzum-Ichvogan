const catalogMenu = document.getElementById("catalog-menu")

function catalogBtn() {
    catalogMenu.classList.toggle("open")
}


let allProducts = [];


async function fetchData() {
    try {
        let response = await fetch('http://localhost:3001/products');
        let data = await response.json();
        console.log(data);
        allProducts = data;

        let wrapper = document.querySelector('.wrapper');
        wrapper.innerHTML = "";

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




<div class="p-4">
<h3 class="text-sm font-semibold leading-snug">
Podguznik Huggies Elite Soft, 1 size, 50 dona
</h3>


<div class="mt-2">
<span class="text-lg font-bold text-purple-600">${product.price}</span>
<span class="text-sm text-gray-400 line-through ml-2">${product.monthlyPrice}</span>
</div>


<div class="mt-1 text-sm text-gray-600">
<span class="font-semibold text-yellow-600">${product.imageLabel}</span>
</div>


<button class="korzinkaBtn  mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-sm font-medium transition">
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



// sevgi bu armon
fetchData();



let wrapper123 = document.querySelector('.wrapper123')
console.log(wrapper123);

let btn1 = document.querySelector('.btn1')
let btn2 = document.querySelector('.btn2')


btn1.addEventListener('click', (e) => {
    let kiyimlar = allProducts.filter((product) => product.category === "Kiyim" || product.category === "Poyabzallar")

    renderCategory(kiyimlar)
})

btn2.addEventListener('click', (e) => {
    let kiyimlar = allProducts.filter((product) => product.category === "Poyabzallar")

    renderCategory(kiyimlar)
})





function renderCategory(data) {
    let wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = "";

    data.forEach((product) => {
        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <div class="bg-white rounded-2xl shadow-lg w-[260px] overflow-hidden">
                <div class="p-4">
                    <img src="${product.image}" />
                    <p class="font-bold mt-2">${product.name}</p>
                    <p class="text-purple-600">${product.price}</p>
                </div>
            </div>
        `;
        wrapper.appendChild(div);
    });
}

