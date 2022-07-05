import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import PouchDB from 'https://deno.land/x/pouchdb_deno@v1.0.0-PouchDB+7.2.2/modules/pouchdb/mod.ts'
const newLocal = `<html>
    <head>
    <script type="text/javascript" src="../fn.js"></script>
    </head>
    
    <body>
    <script>
    function getPos() {
        var p = document.getElementById('test');
        var geo;
        navigator.geolocation.getCurrentPosition(function(a) {
            console.log(a);
            geo = a;
            var newElement = document.createElement('div');
            newElement.setAttribute('id', test);
            newElement.innerHTML = a.coords.latitude +  "," + a.coords.longitude;
            p.append(newElement);
        })
    }
    </script>
    <div id="test">
      <h1>Example</h1>
      <button style={width:100px} onclick="getPos()">
    </div>
    </body>
    
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


