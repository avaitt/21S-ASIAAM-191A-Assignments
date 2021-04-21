// declare variables
let zoomLevel = 4.4;
const mapCenter = [37.0902, -95.7129];

// use the variables
const map = L.map('map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

// create a function to add markers
function addMarker(lat,lng,title,message, center=false, zoom_in = 8){
    console.log(message)
    if (!center){
        L.marker([lat,lng], {icon:greenIcon}).addTo(map).bindPopup(`<h2>${title}</h2>`)
    }
    createButtons(lat,lng,title,zoom_in); // new line!!!
    return message
}


// create a function to add buttons with a fly to command
function createButtons(lat,lng,title,zoom_in){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.src = "http://www.gravatar.com/avatar/bf4cc94221382810233575862875e687?s=150"
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 

    // attach an event listner to the button with Leaflet's map.flyTo
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng], zoom_in);
    })

    document.body.prepend(newButton); //this adds the button to our page.

    newButton.addEventListener('click', function(){
        addImage(lat,lng,title);
    })
}

function addImage(lat, lng, title){
    switch(title){
        case 'Los Angeles, CA': img = './pictures/UCLA.jpg';
            break;
        case 'West Lafayette, IN': img = './pictures/Purdue.jpg';
            break;
        case 'Houston, TX': img = './pictures/Houston.jpg';
            break;
    }
    if (title != 'Recenter Map') {
        L.popup().setLatLng([lat, lng]).setContent('<img src=' + img + ' width=105 height=105/><p>' + title +'</p>').openOn(map);
    }
}

// use our marker functions
addMarker(34.0522, -118.2437, 'Los Angeles, CA','Home of the Bruins!')
addMarker(40.4259, -86.9081, 'West Lafayette, IN','Good Memories')
addMarker(29.7604, -95.3698, 'Houston, TX','Good Memories')
addMarker(37.0902, -95.7129, 'Recenter Map','Click This Button to Recenter Map', true, 4.4)


