import { openDB } from 'idb';
import { IDBPDatabase } from 'idb';

let localDB: IDBPDatabase<unknown>;
const dbName = 'runEventCreator_3diqkef79mdz552nw1mj8';
const storeName = 'event';
const version = 1; //versions start at 1

export const initDB = async () => {
    if (localDB) return;
    localDB = await openDB(dbName, version, {
        upgrade(db) {
            db.createObjectStore(storeName);
        },
    });
};

export const putFile = async (name: string, file: File) => {
    const tx = localDB.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.put(file, name);
    await tx.done;
};

export const getItem = async (key: string) => {
    const tx = localDB.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const item = await store.get(key);
    await tx.done;
    return item;
};
