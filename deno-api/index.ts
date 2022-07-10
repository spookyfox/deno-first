import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { CouchClient } from "https://denopkg.com/keroxp/deno-couchdb/couch.ts";

export type User = {
  id: number;
  name: string;
  years: number[];
};
async function main() {
  const   user = 'apikey-4acafc3dea60422083a59256c4f63d92',
        pwd = '172b09600d1760bb652fe655bb200f0ff662d74c'
  // create couch client with endpoint
  const couch = new CouchClient(`https://${user}:${pwd}@ae6df37a-5c8f-4203-9e6b-1abcc68c027e-bluemix.cloudantnosqldb.appdomain.cloud`);
  // choose db to use
  const db = couch.database<User>("test");
  // check if specified database exists
  if (!(await couch.databaseExists("test"))) {
    // create new database
    await couch.createDatabase("test");
  }
  // insert new document
  const test = {
    id: 101,
    name: "deno",
    years: [2018, 2019],
  };
  const { id, rev } = await db.insert(test);
  // get existing document
  let Test = await db.get(id); // {id: 100, name: "deno", years: [2018,2019]}
  // update existing document
  Test.years.push(2020);
  await db.put(id, Test, { rev });
  // delete existing document
  console.log(Test)
  //await db.delete(id, rev);
}

main();

const newLocal = `<html>
    <head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>4
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
      
      body {
        padding: 0;
        margin: 0;
    }
    html, body, #map {
        height: 100%;
        width: 100vw;
    }
      </style>
    </head>
    
    <body onload=getPos()>
    <script>
    function getPos() {
        var p = document.getElementById('test');
        var geo;
       
      
      
        navigator.geolocation.getCurrentPosition(function(a) {
            console.log(a);
            geo = a;
            function onLocationFound(e) {
              var radius = e.accuracy;
          
              L.marker(e.latlng).addTo(map)
                  .bindPopup("You are within " + radius + " meters from this point").openPopup();
          
              L.circle(e.latlng, radius).addTo(map);
          }
            var newElement = document.createElement('div');
            newElement.setAttribute('id', test);
            newElement.innerHTML = geo.coords.latitude +  "," + geo.coords.longitude;
            p.append(newElement);
            var lat = geo.coords.latitude;
            var long = geo.coords.longitude;
            var map = L.map('map').fitWorld();
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        map.locate({setView: true, maxZoom: 16});
        map.on('locationfound', onLocationFound);
        })
    }

    

    </script>
    
    <div id="test">
      <h1>Example</h1>
      <button style={width:100px} onclick="getPos()"></button>
      <div id ="map"></div>
    </div>
    </body>
    <script>


    </script>
  </html>`;
/*
// Use the 'idb' afapter for IndexedDB and persistence to disk.
const db = new PouchDB('mydb', { adapter: 'idb' })
const   user = 'apikey-4acafc3dea60422083a59256c4f63d92',
        pwd = '172b09600d1760bb652fe655bb200f0ff662d74c'
const remote = new PouchDB(`https://${user}:${pwd}@ae6df37a-5c8f-4203-9e6b-1abcc68c027e-bluemix.cloudantnosqldb.appdomain.cloud/test`)
const doc = { hello: 'worlXXXdssss' }
//const result = await db.post(doc)
//console.log(result)

//const getDoc = await db.get(result.id)

remote.put({_id: new Date(), text:"wkvnwibwbv"}).then(console.log)
//console.log(getDoc)
const docs = await db.allDocs()

console.log(docs)
PouchDB.sync( db, remote );

db.get("483ba335-027b-483f-9ad9-12aebc2149f4").then(console.log);

*/

serve((_req) => {
  return new Response(
    newLocal,
  {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  },
);
}, {
    headers: { "content-type": "text/html" },
  });


