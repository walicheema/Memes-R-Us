const fs = require("fs");

function getMongoConnectionString() {
    if (process.env.MONGO_CONNECTION_FILE) {
        if (!fs.existsSync(process.env.MONGO_CONNECTION_FILE)) {
            throw new Error("MONGO_CONNECTION_FILE defined, but file not found");
        }
        return fs.readFileSync(process.env.MONGO_CONNECTION_FILE).toString();
    }

    return "mongodb://mongo:27017";
}

module.exports = {
    getMongoConnectionString,
};