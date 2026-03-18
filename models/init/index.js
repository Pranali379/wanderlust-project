const mongoose = require("mongoose");
const Listing = require("../listing");     
const initData = require("./data");        


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to  DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "699ea382de7a3682242d02d5"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
    
}

initDB();
