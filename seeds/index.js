const mongoose = require('mongoose');
const cities = require('./cities');
const {
    places,
    descriptors
} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '62fa733df1f7ad3b4dc49524',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, sunt, doloribus repellat deserunt consequuntur eius voluptate laboriosam consequatur id nihil facere eum doloremque? Recusandae consectetur vel eius eos rerum saepe.',
            price,
            images: [{
                url: 'https://res.cloudinary.com/ranjeetxsingh/image/upload/v1660734300/YelpCamp/dam2je3nszbr6mnqrxvf.jpg',
                filename: 'YelpCamp/dam2je3nszbr6mnqrxvf'
            }],
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            }

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})