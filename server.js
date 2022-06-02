require("dotenv").config();
const mongoose = require("mongoose");
const Club = require("./models/Soccer");
const express = require("express");
const app = express();
const methodOverride = require("method-override");
// const clubs = require("./models/leagues");

const PORT = 3000;

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
});
// Database Connection Error/Success
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

app.use(methodOverride("_method"));
//static files
app.use(express.static(__dirname + "/public"));

// MIDDLEWARE & BODY PARSER
app.use(express.urlencoded({ extended: true }));

// Index
app.get("/clubs", (req, res) => {
  Club.find({}, (err, allClubs) => {
    res.render("index.ejs", {
      clubs: allClubs,
    });
  });
});

//NEW
app.get("/new", (req, res) => {
  res.render("new.ejs");
});

// SEED DATA!
// const clubLeagues = require("./models/leagues");
// app.get("/clubs/leagues", (req, res) => {
//   Club.create(clubLeagues, (error, data) => {
//     res.redirect("/clubs");
//   });
// });

// // SHOW
app.get("/clubs/:id", (req, res) => {
  Club.findById(req.params.id, (err, foundClub) => {
    res.render("show.ejs", {
      club: foundClub,
    });
  });
});
// UPDATE
app.put("/clubs/:id", (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true;
  } else {
    req.body.completed = false;
  }
  Club.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (error, updatedClub) => {
      res.redirect(`/clubs/${req.params.id}`);
    }
  );
});
//CREATE
app.post("/clubs", (req, res) => {
  Club.create(req.body, (err, createdStore) => {
    if (err) console.log(err);
    res.redirect("/clubs");
  });
});

//EDIT
app.get("/clubs/:id/edit", (req, res) => {
  Club.findById(req.params.id, (error, foundClub) => {
    res.render("edit.ejs", {
      club: foundClub,
    });
  });
});
// DELETE
app.delete("/clubs/:id", (req, res) => {
  Club.findByIdAndRemove(req.params.id, (err, deletedClub) => {
    res.redirect("/clubs");
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
