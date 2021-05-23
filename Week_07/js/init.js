const map = L.map('map').setView([34.0709, -118.444], 5);

let url = "https://spreadsheets.google.com/feeds/list/1o7FEswz5qC5X6Vk55jigcXMstPKnwCbmH3NG3kU0E2Y/ogvxvqr/public/values?alt=json"

let Esri_WorldPhysical = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
	maxZoom: 8
});

Esri_WorldPhysical.addTo(map)


fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let english_speaker = L.featureGroup();
let non_english_speaker = L.featureGroup();

let exampleOptions = {
    radius: 9,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.7
}

function addMarker(data){
    if(data.doyouspeakenglishfluently == "Yes"){
        exampleOptions.fillColor = "green"
        english_speaker.addLayer(L.circleMarker([data.lat,data.lng],exampleOptions).addTo(map).bindPopup(`<h2>${"Location: " + data.location}</h2><br>${"Timestamp: " + data.timestamp}<br>${"English Speaker"}`))
        /* L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${"Location: " + data.location}<br>${"Timestamp: " + data.timestamp}</h2>${"Speak English: " + data.doyouspeakenglishfluently}`)*/
        createButtons(data.lat,data.lng,data.location);
        createButtons(data.lat,data.lng,data.location)
        }
    else{
        exampleOptions.fillColor = "blue"
        non_english_speaker.addLayer(L.circleMarker([data.lat,data.lng],exampleOptions).addTo(map).bindPopup(`<h2>${"Location: " + data.location}</h2><br>${"Timestamp: " + data.timestamp}<br>${"Language Spoken: " + data.whatlanguagedoyouprimarilyspeak}<br>${"How Was Your Vaccine Appointment?: " + data.howwasyourvaccineappointment}<br>${"Non-English Speaker"}`))
        createButtons(data.lat,data.lng,data.location)
    }
    return data.timestamp
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng],8);
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);
}

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
        english_speaker.addTo(map)
        non_english_speaker.addTo(map)
        let allLayers = L.featureGroup([speakFluentEnglish,speakOtherLanguage]);
        map.fitBounds(allLayers.getBounds());        
}

let layers = {
	"I Speak English": english_speaker,
	"I Do Not Speak English": non_english_speaker
}

L.control.layers(null,layers).addTo(map)