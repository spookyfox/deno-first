import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import PouchDB from 'https://deno.land/x/pouchdb_deno@v1.0.0-PouchDB+7.2.2/modules/pouchdb/mod.ts'

// Use the 'idb' afapter for IndexedDB and persistence to disk.
const db = new PouchDB('mydb', { adapter: 'idb' })
const doc = { hello: 'world' }
const result = await db.post(doc)

console.log(result)

const getDoc = await db.get(result.id)

console.log(getDoc)
const docs = await db.allDocs()

console.log(docs)

serve((_req) => {
  return new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
});

const user = {};
