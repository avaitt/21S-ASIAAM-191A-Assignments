const map = L.map('map').setView([34.0709, -118.444], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let url = "https://spreadsheets.google.com/feeds/list/1o7FEswz5qC5X6Vk55jigcXMstPKnwCbmH3NG3kU0E2Y/ogvxvqr/public/values?alt=json"
fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        console.log(data)
        formatData(data)
    })

function addMarker(data){
        L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${"Location: " + data.location}<br>${"Timestamp: " + data.timestamp}</h2>${"Speak English: " + data.doyouspeakenglishfluently}`)
        createButtons(data.lat,data.lng,data.location);

        return data.timestamp   
}

function createButtons(lat,lng,location){
    const newButton = document.createElement("button");
    newButton.id = "button"+location; 
    newButton.innerHTML = location;
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]);
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);
}

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                formatData(data)
        }
)

function formatData(theData){
        const formattedData = [] 
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)        
}