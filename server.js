// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
var moment = require("moment");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const checkDate = (val) => {
  if (new Date(val).toString() === "Invalid Date") {
    if (Number.isInteger(+val)) {
      return +val;
    } else {
      return "Invalid Date";
    }
  } else {
    return new Date(val);
  }
};

app.get("/api/timestamp/:date?", (req, res) => {
  const { date } = req.params;
  if (!date) {
    res.json({
      unix: +new Date(),
      utc: new Date().toUTCString(),
    });
  } else {
    let tmp = checkDate(date);
    if (checkDate(date) === "Invalid Date") {
      res.json({
        error: "Invalid Date",
      });
    } else if (Number.isInteger(checkDate(date))) {
      res.json({
        unix: tmp,
        utc: new Date(tmp).toUTCString(),
      });
    } else {
      res.json({
        unix: +new Date(tmp),
        utc: new Date(tmp).toUTCString(),
      });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
