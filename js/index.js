let cafes = [],
  places = [],
  cafePlaces = [];

const searchBar = document.querySelector("input");
const tableBody = document.querySelector("tbody");


fetchCafes = () => {
  const result = fetch(
    "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json"
  )
    .then(res => res.json())
    .then(data => {
      cafes = data.cafes;
      fetchPlaces();
    })
    .catch(err => console.log(err));
};

// To fetch the list of cafes
fetchPlaces = () => {
  const result = fetch(
    "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json"
  )
    .then(res => res.json())
    .then(data => {
      places = data.places;
      storeCafePlaces();
      addContent(cafePlaces);
    })
    .catch(err => console.log(err));
};

storeCafePlaces = () => {
  let finalResults = [];
  let results = cafes;
  results.forEach(cafe => {
    var place = places.find(item => item.id === cafe.location_id);
    var cafePlace = JSON.parse(JSON.stringify(place));
    cafePlace.name = cafe.name;
    finalResults.push(cafePlace);
  });
  finalResults.forEach(item => {
    delete item.id;
  });
  cafePlaces = finalResults;
};


findCafes = string => {
  let results = cafePlaces.filter(item =>
    item.name.toLowerCase().includes(string.toLowerCase())
  );
  return results;
};

// DOM manipulation
addContent = results => {
  results.forEach((item, i) => {
    newElement = document.createElement("tr");
    newElement.innerHTML = `<td class="column1">${i + 1}</td>
    <td class="column2">${item.name}</td>
        <td class="column3">${item.street_no} ${item.locality}</td>
        <td class="column4">${item.postal_code}</td>
        <td class="column5">${item.lat}</td>
        <td class="column6">${item.long}</td>`;
    tableBody.appendChild(newElement);
  });
};

updateContent = e => {
  tableBody.innerHTML = "";
  const results = findCafes(e.target.value);
  addContent(results);
};

fetchCafes();
searchBar.addEventListener("input", updateContent);
