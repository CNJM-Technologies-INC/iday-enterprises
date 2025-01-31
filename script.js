let currentPage = 1;
const shoesPerPage = 8;

async function fetchShoes() {
    const response = await fetch('shoes.json'); // Your JSON file path
    const data = await response.json();
    return data.shoes; // Assuming the JSON structure has a "shoes" key
}

function displayShoes(shoes) {
    const shoesContainer = document.getElementById('shoes-container');
    shoesContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * shoesPerPage;
    const endIndex = startIndex + shoesPerPage;
    const shoesToDisplay = shoes.slice(startIndex, endIndex);

    shoesToDisplay.forEach(shoe => {
        const shoeCard = document.createElement('div');
        shoeCard.classList.add('card', 'p-6', 'text-center');
        shoeCard.innerHTML = `
            <img src="${shoe.image}" alt="${shoe.name}" class="w-full h-48 object-cover mb-4">
            <h3 class="text-2xl font-bold mb-2">${shoe.name}</h3>
            <p class="text-gray-300 mb-4">Identifier: <strong>${shoe.id}</strong></p>
            <p class="text-lg text-gray-400 mb-4">${shoe.description}</p>
            <a href="#" class="button-primary">Inquire About This Shoe</a>
        `;
        shoesContainer.appendChild(shoeCard);
    });
}

async function init() {
    const shoes = await fetchShoes();
    displayShoes(shoes);

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayShoes(shoes);
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        const totalPages = Math.ceil(shoes.length / shoesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayShoes(shoes);
        }
    });
}

init();