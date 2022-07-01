"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const scheduler = require("node-schedule");
//routes
const userRoutes = require("./routes/users-routes");
const consumeRoutes = require("./routes/consumption-routes");
//mail config
const transporter = require("./helpers/transporter");
//consumption model
const consumptionModel = require("./models/consumption");

const port = process.env.PORT || 8080;
require("./db/database")();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/consume", consumeRoutes);

app.listen(port, () =>
  console.log(`server is listening on url http://localhost:${port}`)
);

let date = new Date();
const year = date.getFullYear();
let month = date.getMonth() + 1;
month = month > 9 ? month : "0" + month;
let day = date.getDate();
day = day > 9 ? day : "0" + day;
const dateToday = year + "-" + month + "-" + day;

scheduler.scheduleJob("0 11 * * * ", function () {

  console.log("Notification schedule for CE");
  async function main() {
    const kabiniCE = await consumptionModel
      .findOne({ date: dateToday, location: "Kabini" })
      .countDocuments();
    const hampiCE = await consumptionModel
      .findOne({ date: dateToday, location: "Hampi" })
      .countDocuments();
    const coorgCE = await consumptionModel
      .findOne({ date: dateToday, location: "Coorg" })
      .countDocuments();
    if (kabiniCE === 0) {
      let info = await transporter.sendMail({
        from: '"Arnab 👻" <lalit.k@aol.com>', // sender address
        to: "deleep.g@evolveback.com", // receiver address
        subject: "Notification for filling EMS Kabini", // Subject line
        text: "A gentle reminder to fill today ems data for kabini", //"Hello world?", // plain text body
        html: `<b>A gentle reminder to fill today ems data for kabini</b>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (hampiCE === 0) {
      let info = await transporter.sendMail({
        from: '"Arnab 👻" <lalit.k@aol.com>', // sender address
        to: "vijaya.b@evolveback.com", // receiver address
        subject: "Notification for filling EMS Hampi", // Subject line
        text: "A gentle reminder to fill today ems data for Hampi", 
        html: `<b>A gentle reminder to fill today ems data for Hampi</b>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (coorgCE === 0) {
      let info = await transporter.sendMail({
        from: '"Arnab 👻" <lalit.k@aol.com>', // sender address
        to: "sujesh.s@evolveback.com", // receiver address
        subject: "Notification for filling EMS Coorg", // Subject line
        text: "A gentle reminder to fill today ems data for Coorg",
        html: `<b>A gentle reminder to fill today ems data for Coorg</b>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
  }
  main().catch(console.error);
});

scheduler.scheduleJob("0 12 * * * ", function () {
  
  console.log("Notification schedule for GM");
  async function main() {
    const kabiniGM = await consumptionModel
      .findOne({ date: dateToday, location: "Kabini" })
      .countDocuments();
    const hampiGM = await consumptionModel
      .findOne({ date: dateToday, location: "Hampi" })
      .countDocuments();
    const coorgGM = await consumptionModel
      .findOne({ date: dateToday, location: "Coorg" })
      .countDocuments();
    if (kabiniGM === 0) {
      let info = await transporter.sendMail({
        from: '"Arnab 👻" <lalit.k@aol.com>', // sender address
        to: "kanthi.a@evolveback.com", // receiver address
        subject: "GM Notification for filling EMS Kabini", // Subject line
        text: "A gentle reminder to fill today ems data for kabini",
        html: `<b>A gentle reminder to fill today ems data for kabini</b>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (hampiGM === 0) {
      let info = await transporter.sendMail({
        from: '"Arnab 👻" <lalit.k@aol.com>', // sender address
        to: "joydeep.b@evolveback.com", // receiver address
        subject: "GM Notification for filling EMS Hampi", // Subject line
        text: "A gentle reminder to fill today ems data for Hampi",
        html: `<b>A gentle reminder to fill today ems data for Hampi</b>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (coorgGM === 0) {
      let info = await transporter.sendMail({
        from: '"Arnab 👻" <lalit.k@aol.com>', // sender address
        to: "thomas.p@evolveback.com", // receiver address
        subject: "GM Notification for filling EMS Coorg", // Subject line
        text: "A gentle reminder to fill today ems data for Coorg",
        html: `<b>A gentle reminder to fill today ems data for Coorg</b>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
  }
  main().catch(console.error);
});

scheduler.scheduleJob("0 14 * * * ", function () {

  console.log("Notification schedule to Mithran @2pm");

  async function main() {
    const kabiniCE = await consumptionModel
      .findOne({ date: dateToday, location: "Kabini" })
      .countDocuments();
    const hampiCE = await consumptionModel
      .findOne({ date: dateToday, location: "Hampi" })
      .countDocuments();
    const coorgCE = await consumptionModel
      .findOne({ date: dateToday, location: "Coorg" })
      .countDocuments();
    if (kabiniCE === 0) {
      let info = await transporter.sendMail({
        from: '"Arnab 👻" <lalit.k@aol.com>', // sender address
        to: "mithran.m@evolveback.com", // receiver address
        subject: "Mithran for filling EMS Kabini", // Subject line
        text: "A gentle reminder to fill today ems data for kabini",
        html: `<b>A gentle reminder to fill today ems data for kabini</b>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (hampiCE === 0) {
      let info = await transporter.sendMail({
        from: '"Arnab 👻" <lalit.k@aol.com>', // sender address
        to: "mithran.m@evolveback.com", // receiver address
        subject: "Mithran for filling EMS Hampi", // Subject line
        text: "A gentle reminder to fill today ems data for Hampi",
        html: `<b>A gentle reminder to fill today ems data for Hampi</b>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (coorgCE === 0) {
      let info = await transporter.sendMail({
        from: '"Arnab 👻" <lalit.k@aol.com>', // sender address
        to: "mithran.m@evolveback.com", // receiver address
        subject: "Mithran for filling EMS Coorg", // Subject line
        text: "A gentle reminder to fill today ems data for Coorg", 
        html: `<b>A gentle reminder to fill today ems data for Coorg</b>`,
      });
      console.log("Message sent: %s", info.messageId);
    }
  }
  main().catch(console.error);
});
