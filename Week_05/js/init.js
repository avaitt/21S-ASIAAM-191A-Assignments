const map = L.map('map').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


let url = "https://spreadsheets.google.com/feeds/list/1o7FEswz5qC5X6Vk55jigcXMstPKnwCbmH3NG3kU0E2Y/ogvxvqr/public/values?alt=json"
// fetch(url)
// 	.then(response => {
// 		return response.json();
// 		})
//     .then(data =>{
//         //console.log(data)
//         processData(data);
//     })

function callme(){
  //This promise will resolve when the network call succeeds
  //Feel free to make a REST fetch using promises and assign it to networkPromise
  var networkPromise = fetch(url)
  .then(response => {
    return response.json();
    })
    .then(data =>{
        //console.log(data)
        processData(data);
    });
  
  
  //This promise will resolve when 2 seconds have passed
  var timeOutPromise = new Promise(function(resolve, reject) {
    // 2 Second delay
    setTimeout(resolve, 100, 'Timeout Done');
  });
  
  Promise.all(
  [networkPromise, timeOutPromise]).then(function(values) {
    console.log("Atleast 2 secs + TTL (Network/server)");
    //Repeat
    callme();
  });
  }

callme();

function addMarker(data){
        L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${"Location: " + data.location}<br>${"Timestamp: " + data.timestamp}</h2>${"Speak English: " + data.doyouspeakenglishfluently}`)
        return data.timestamp    
}

// addMarker(37,-122,'home land!')

// let myArray = [{'name':'hello','lat':37,'lng':-122},{'name':'this','lat':35,'lng':-119},{'name':'is','lat':36,'lng':-120}]
// myArray.forEach(addMarker);

// function addMarker(data){
//         console.log(data);
//         L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data.name}</h2>`);
//         return data.message;
// }  


function processData(theData){
    const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
    const rows = theData.feed.entry // this is the weird Google Sheet API format we will be removing
    // we start a for..of.. loop here 
    for(const row of rows) { 
      const formattedRow = {}
      for(const key in row) {
        // time to get rid of the weird gsx$ format...
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      // add the clean data
      formattedData.push(formattedRow)
    }
    // lets see what the data looks like when its clean!
    console.log(formattedData)
    // we can actually add functions here too
    formattedData.forEach(addMarker)
}


// fetch(url)
// 	.then(response => {
// 		return response.json();
// 		})
//     .then(data =>{
//         // console.log(data)
//         processData(data)
//     })

