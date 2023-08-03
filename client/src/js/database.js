import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // create a connection to the database
  const jateDb = await openDB('jate', 1);

  // create a transaction and add priveleges
  const transaction = jateDb.transaction('jate', 'readwrite');

  // open the object store and add content
  const objStore = transaction.objectStore('jate');
  const request = objStore.add({ content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  const jateDb = await openDB('jate', 1);
  const transaction = jateDb.transaction('jate', 'readonly');
  const objStore = transaction.objectStore('todos');

  // Use the .getAll() method to get all data in the database.
  const request = objStore.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
