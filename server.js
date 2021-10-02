const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "config.env" });

mongoose.connect(process.env.DATABASE_URI, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("DATABASE CONNECTION SUCCESSFUL!");
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${process.env.PORT}`);
});
