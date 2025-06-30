let travelData = [];

// Fetch data from JSON
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log("Fetched data:", travelData);
    })
    .catch(err => console.error('Failed to load data:', err));

function search() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';

    if (!input) {
        resultContainer.innerHTML = '<p style="color: white;">Please enter a keyword.</p>';
        return;
    }

    // Normalize input keyword (manual mapping)
    let keyword = '';
    if (['beach', 'beaches'].includes(input)) keyword = 'beach';
    else if (['temple', 'temples'].includes(input)) keyword = 'temple';
    else if (['country', 'countries'].includes(input)) keyword = 'country';
    else keyword = input; // fallback

    const filtered = travelData.filter(item =>
        item.category.toLowerCase() === keyword
    );

    if (filtered.length === 0) {
        resultContainer.innerHTML = '<p style="color: white;">No results found.</p>';
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    `;
        resultContainer.appendChild(card);
    });
}


function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}
