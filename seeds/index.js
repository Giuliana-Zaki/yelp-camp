const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '65661eff9bc2926750f5704e',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta officiis non, dicta voluptas natus iure cumque aspernatur beatae eligendi illum. Ratione quidem accusamus veniam minima modi exercitationem earum qui placeat?    `,
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dmjwbfeyr/image/upload/v1711475971/YelpCamp/cqoiluzdskkpdhuih203.jpg',
          filename: 'YelpCamp/ixz8ek4nxcoitw0cq9ka'
        },
        {
          url: 'https://res.cloudinary.com/dmjwbfeyr/image/upload/v1701340853/YelpCamp/ypcpttrr3libgfbr3fiq.jpg',
          filename: 'YelpCamp/j0mdjadkzd3ngmpjsqbm'
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
