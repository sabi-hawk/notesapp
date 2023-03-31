const mongoose = require("mongoose");

async function connectToDb() {
  try {
    mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.log("DB not connected", err);
      });
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDb;

// useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
