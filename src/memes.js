const { MongoClient } = require("./config");

let mongoCollection = null;

/**
 * Get a connected Mongo collection. This utility will ensure we only connect
 * to the database once, ensuring follow-up requests are quick.
 * @returns A configured and connection Mongo collection object
 */
async function getMongoCollection() {
  if (mongoCollection) return mongoCollection;

  // TODO - Eventually update this to allow the hostname to be configurable
  const client = new MongoClient("config.connectionString");
  await client.connect();
  console.log("Connected to mongo");

  const db = client.db("memes-r-us");
  mongoCollection = db.collection("memes");

  return mongoCollection;
}

/**
 * Get a random meme url to display. If none found in the database, fall back
 * to a standard "404"-type image.
 * @returns {string} A meme url
 */
async function getMemeUrl() {
  const collection = await getMongoCollection();
  const element = await collection.aggregate([{ $sample: { size: 1 } }]);
  const elements = await element.toArray();
  if (elements.length === 0)
    return "https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif";
  return elements[0].url;
}

/**
 * Add the provided meme into persistence.
 * @param {string} memeUrl The URL to persist
 */
async function addMemeUrl(memeUrl) {
  const collection = await getMongoCollection();
  await collection.insertOne({ url: memeUrl, createdAt: Date.now() });
}

module.exports = {
  getMemeUrl,
  addMemeUrl,
};