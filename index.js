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
    if (kabiniCE >= 1 ) {
      let info = await transporter.sendMail({
        from: '"Orange County" <software@orangecounty.in>', // sender address
        to: "deleep.g@evolveback.com", // receiver address
        cc: "kanthi.a@evolveback.com",
        subject: "DAILY HLP REPORT", // Subject line
        html: ` <!-- Signature Start -->
        <p class=MsoNormal>
            <span style='font-size:10.5pt;font-family:"Georgia",serif;color:#9A7033'>Dear Mr.Deleep <br> We observe that you have not filled in the electricity consumption details in the HLP Report, as yet. 
            Kindly complete the same before 11:00 hr, Today.</span>
        </p>
        <br>
        <p style="margin-bottom: 5px">
            <span style="color: #9a7035; font-family: Georgia; font-size: 11pt">
            <span style="font-weight: normal">Warm regards<br><br></span> 
        
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Orange County Resorts &amp; Hotels Ltd., 2nd Floor St. Patrick's Business Complex, <br>21 Museum Rd, Bangalore - 560025, Karnataka, INDIA<br>M: {{user.PhoneMobile}} <br /></span>
            <a href="mailto:{{user.EmailAddress}}" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">{{user.EmailAddress}}</span></a>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt"> | </span>
            <a target="_blank" href="https://www.evolveback.com/?utm_source=email-footer&amp;utm_medium=email" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">www.evolveback.com</span></a>
            <br>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Our Resorts: </span>
              <a href="https://www.evolveback.com/coorg/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Coorg</strong></span></a>
            | <a href="https://www.evolveback.com/kabini/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Kabini</strong></span></a>
            | <a href="https://www.evolveback.com/hampi/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Hampi</strong></span></a> </span></a>
        </p>
        <p style="line-height: .1em; margin-top: 0px; margin-bottom: 1px;">
            <img style="width:90%; max-width: 460px;" src="http://www.evolveback.com/wp-content/uploads/2019/10/eb-logo-emailsignature-2.png" alt="Evolve Back">
        </p>
        <p style="line-height: .8em; margin-top: 5px;">
            <img src="http://www.evolveback.com/wp-content/uploads/2017/07/rt.png" alt="Responsible Tourism:" width="23" height="26"><span style="color: #76923c; font-family: Georgia, sans-serif; font-size: 9pt">Be aware of your environmental responsibility: Before printing this e-mail, ask yourself whether you need a hard copy!</span>
        </p>
        <!-- Signature End -->`
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (hampiCE >= 1) {
      let info = await transporter.sendMail({
        from: '"Orange County" <software@orangecounty.in>', // sender address
        to: "vijaya.b@evolveback.com", // receiver address
        cc: "joydeep.b@evolveback.com",
        subject: "DAILY HLP REPORT", // Subject line 
        html: ` <!-- Signature Start -->
        <p class=MsoNormal>
            <span style='font-size:10.5pt;font-family:"Georgia",serif;color:#9A7033'>Dear Mr.Vijaya <br> We observe that you have not filled in the electricity consumption details in the HLP Report, as yet. 
            Kindly complete the same before 11:00 hr, Today.</span>
        </p>
        <br>
        <p style="margin-bottom: 5px">
            <span style="color: #9a7035; font-family: Georgia; font-size: 11pt">
            <span style="font-weight: normal">Warm regards<br><br></span> 
            
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Orange County Resorts &amp; Hotels Ltd., 2nd Floor St. Patrick's Business Complex, <br>21 Museum Rd, Bangalore - 560025, Karnataka, INDIA<br>M: {{user.PhoneMobile}} <br /></span>
            <a href="mailto:{{user.EmailAddress}}" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">{{user.EmailAddress}}</span></a>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt"> | </span>
            <a target="_blank" href="https://www.evolveback.com/?utm_source=email-footer&amp;utm_medium=email" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">www.evolveback.com</span></a>
            <br>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Our Resorts: </span>
              <a href="https://www.evolveback.com/coorg/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Coorg</strong></span></a>
            | <a href="https://www.evolveback.com/kabini/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Kabini</strong></span></a>
            | <a href="https://www.evolveback.com/hampi/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Hampi</strong></span></a> </span></a>
        </p>
        <p style="line-height: .1em; margin-top: 0px; margin-bottom: 1px;">
            <img style="width:90%; max-width: 460px;" src="http://www.evolveback.com/wp-content/uploads/2019/10/eb-logo-emailsignature-2.png" alt="Evolve Back">
        </p>
        <p style="line-height: .8em; margin-top: 5px;">
            <img src="http://www.evolveback.com/wp-content/uploads/2017/07/rt.png" alt="Responsible Tourism:" width="23" height="26"><span style="color: #76923c; font-family: Georgia, sans-serif; font-size: 9pt">Be aware of your environmental responsibility: Before printing this e-mail, ask yourself whether you need a hard copy!</span>
        </p>
        <!-- Signature End -->`
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (coorgCE >= 1) {
      let info = await transporter.sendMail({
        from: '"Orange County" <software@orangecounty.in>', // sender address
        to: "sujesh.s@evolveback.com", // receiver address
        cc: "thomas.p@evolveback.com",
        subject: "DAILY HLP REPORT", // Subject line
        html: ` <!-- Signature Start -->
        <p class=MsoNormal>
            <span style='font-size:10.5pt;font-family:"Georgia",serif;color:#9A7033'>Dear Mr.Sujesh <br> We observe that you have not filled in the electricity consumption details in the HLP Report, as yet. 
            Kindly complete the same before 11:00 hr, Today.</span>
        </p>
        <br>
        <p style="margin-bottom: 5px">
            <span style="color: #9a7035; font-family: Georgia; font-size: 11pt">
            <span style="font-weight: normal">Warm regards<br><br></span> 
            
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Orange County Resorts &amp; Hotels Ltd., 2nd Floor St. Patrick's Business Complex, <br>21 Museum Rd, Bangalore - 560025, Karnataka, INDIA<br>M: {{user.PhoneMobile}} <br /></span>
            <a href="mailto:{{user.EmailAddress}}" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">{{user.EmailAddress}}</span></a>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt"> | </span>
            <a target="_blank" href="https://www.evolveback.com/?utm_source=email-footer&amp;utm_medium=email" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">www.evolveback.com</span></a>
            <br>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Our Resorts: </span>
              <a href="https://www.evolveback.com/coorg/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Coorg</strong></span></a>
            | <a href="https://www.evolveback.com/kabini/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Kabini</strong></span></a>
            | <a href="https://www.evolveback.com/hampi/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Hampi</strong></span></a> </span></a>
        </p>
        <p style="line-height: .1em; margin-top: 0px; margin-bottom: 1px;">
            <img style="width:90%; max-width: 460px;" src="http://www.evolveback.com/wp-content/uploads/2019/10/eb-logo-emailsignature-2.png" alt="Evolve Back">
        </p>
        <p style="line-height: .8em; margin-top: 5px;">
            <img src="http://www.evolveback.com/wp-content/uploads/2017/07/rt.png" alt="Responsible Tourism:" width="23" height="26"><span style="color: #76923c; font-family: Georgia, sans-serif; font-size: 9pt">Be aware of your environmental responsibility: Before printing this e-mail, ask yourself whether you need a hard copy!</span>
        </p>
        <!-- Signature End -->`
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
    if (kabiniGM >= 1) {
      let info = await transporter.sendMail({
        from: '"Orange County" <software@orangecounty.in>', // sender address
        to: "kanthi.a@evolveback.com", // receiver address
        cc: ["mithran.m@evolveback.com", "deleep.g@evolveback.com"],
        subject: "DAILY HLP REPORT", // Subject line
        html: ` <!-- Signature Start -->
        <p class=MsoNormal>
            <span style='font-size:10.5pt;font-family:"Georgia",serif;color:#9A7033'>Dear Mr.Kanthi <br> We observe that the CE ( Chief Engineer) has not filled the data for the HLP Report today yet.
            Kindly complete the same before 14:00 hr, Today.</span>
        </p>
        <br>
        <p style="margin-bottom: 5px">
            <span style="color: #9a7035; font-family: Georgia; font-size: 11pt">
            <span style="font-weight: normal">Warm regards<br><br></span> 
            
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Orange County Resorts &amp; Hotels Ltd., 2nd Floor St. Patrick's Business Complex, <br>21 Museum Rd, Bangalore - 560025, Karnataka, INDIA<br>M: {{user.PhoneMobile}} <br /></span>
            <a href="mailto:{{user.EmailAddress}}" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">{{user.EmailAddress}}</span></a>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt"> | </span>
            <a target="_blank" href="https://www.evolveback.com/?utm_source=email-footer&amp;utm_medium=email" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">www.evolveback.com</span></a>
            <br>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Our Resorts: </span>
              <a href="https://www.evolveback.com/coorg/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Coorg</strong></span></a>
            | <a href="https://www.evolveback.com/kabini/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Kabini</strong></span></a>
            | <a href="https://www.evolveback.com/hampi/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Hampi</strong></span></a> </span></a>
        </p>
        <p style="line-height: .1em; margin-top: 0px; margin-bottom: 1px;">
            <img style="width:90%; max-width: 460px;" src="http://www.evolveback.com/wp-content/uploads/2019/10/eb-logo-emailsignature-2.png" alt="Evolve Back">
        </p>
        <p style="line-height: .8em; margin-top: 5px;">
            <img src="http://www.evolveback.com/wp-content/uploads/2017/07/rt.png" alt="Responsible Tourism:" width="23" height="26"><span style="color: #76923c; font-family: Georgia, sans-serif; font-size: 9pt">Be aware of your environmental responsibility: Before printing this e-mail, ask yourself whether you need a hard copy!</span>
        </p>
        <!-- Signature End -->`
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (hampiGM >= 1) {
      let info = await transporter.sendMail({
        from: '"Orange County" <software@orangecounty.in>', // sender address
        to: "joydeep.b@evolveback.com", // receiver address,
        cc: ["mithran.m@evolveback.com", "vijaya.b@evolveback.com"],
        subject: "DAILY HLP REPORT", // Subject line
        html: ` <!-- Signature Start -->
        <p class=MsoNormal>
            <span style='font-size:10.5pt;font-family:"Georgia",serif;color:#9A7033'>Dear Mr.Joydeep <br> We observe that the CE ( Chief Engineer) has not filled the data for the HLP Report today yet.
            Kindly complete the same before 14:00 hr, Today.</span>
        </p>
        <br>
        <p style="margin-bottom: 5px">
            <span style="color: #9a7035; font-family: Georgia; font-size: 11pt">
            <span style="font-weight: normal">Warm regards<br><br></span> 
            
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Orange County Resorts &amp; Hotels Ltd., 2nd Floor St. Patrick's Business Complex, <br>21 Museum Rd, Bangalore - 560025, Karnataka, INDIA<br>M: {{user.PhoneMobile}} <br /></span>
            <a href="mailto:{{user.EmailAddress}}" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">{{user.EmailAddress}}</span></a>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt"> | </span>
            <a target="_blank" href="https://www.evolveback.com/?utm_source=email-footer&amp;utm_medium=email" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">www.evolveback.com</span></a>
            <br>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Our Resorts: </span>
              <a href="https://www.evolveback.com/coorg/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Coorg</strong></span></a>
            | <a href="https://www.evolveback.com/kabini/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Kabini</strong></span></a>
            | <a href="https://www.evolveback.com/hampi/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Hampi</strong></span></a> </span></a>
        </p>
        <p style="line-height: .1em; margin-top: 0px; margin-bottom: 1px;">
            <img style="width:90%; max-width: 460px;" src="http://www.evolveback.com/wp-content/uploads/2019/10/eb-logo-emailsignature-2.png" alt="Evolve Back">
        </p>
        <p style="line-height: .8em; margin-top: 5px;">
            <img src="http://www.evolveback.com/wp-content/uploads/2017/07/rt.png" alt="Responsible Tourism:" width="23" height="26"><span style="color: #76923c; font-family: Georgia, sans-serif; font-size: 9pt">Be aware of your environmental responsibility: Before printing this e-mail, ask yourself whether you need a hard copy!</span>
        </p>
        <!-- Signature End -->`
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (coorgGM >= 1) {
      let info = await transporter.sendMail({
        from: '"Orange County" <software@orangecounty.in>', // sender address
        to: "thomas.p@evolveback.com", // receiver address,
        cc: ["mithran.m@evolveback.com", "sujesh.s@evolveback.com"],
        subject: "DAILY HLP REPORT", // Subject line
        html: ` <!-- Signature Start -->
        <p class=MsoNormal>
            <span style='font-size:10.5pt;font-family:"Georgia",serif;color:#9A7033'>Dear Mr.Thomas <br> We observe that the CE ( Chief Engineer) has not filled the data for the HLP Report today yet.
            Kindly complete the same before 14:00 hr, Today.</span>
        </p>
        <br>
        <p style="margin-bottom: 5px">
            <span style="color: #9a7035; font-family: Georgia; font-size: 11pt">
            <span style="font-weight: normal">Warm regards<br><br></span> 
           
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Orange County Resorts &amp; Hotels Ltd., 2nd Floor St. Patrick's Business Complex, <br>21 Museum Rd, Bangalore - 560025, Karnataka, INDIA<br>M: {{user.PhoneMobile}} <br /></span>
            <a href="mailto:{{user.EmailAddress}}" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">{{user.EmailAddress}}</span></a>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt"> | </span>
            <a target="_blank" href="https://www.evolveback.com/?utm_source=email-footer&amp;utm_medium=email" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">www.evolveback.com</span></a>
            <br>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Our Resorts: </span>
              <a href="https://www.evolveback.com/coorg/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Coorg</strong></span></a>
            | <a href="https://www.evolveback.com/kabini/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Kabini</strong></span></a>
            | <a href="https://www.evolveback.com/hampi/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Hampi</strong></span></a> </span></a>
        </p>
        <p style="line-height: .1em; margin-top: 0px; margin-bottom: 1px;">
            <img style="width:90%; max-width: 460px;" src="http://www.evolveback.com/wp-content/uploads/2019/10/eb-logo-emailsignature-2.png" alt="Evolve Back">
        </p>
        <p style="line-height: .8em; margin-top: 5px;">
            <img src="http://www.evolveback.com/wp-content/uploads/2017/07/rt.png" alt="Responsible Tourism:" width="23" height="26"><span style="color: #76923c; font-family: Georgia, sans-serif; font-size: 9pt">Be aware of your environmental responsibility: Before printing this e-mail, ask yourself whether you need a hard copy!</span>
        </p>
        <!-- Signature End -->`
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
    if (kabiniCE >= 1) {
      let info = await transporter.sendMail({
        from: '"Orange County" <software@orangecounty.in>', // sender address
        to: "mithran.m@evolveback.com", // receiver address
        cc: ["deleep.g@evolveback.com", "deleep.g@evolveback.com"],
        subject: "DAILY HLP REPORT", // Subject line
        html: ` <!-- Signature Start -->
        <p class=MsoNormal>
            <span style='font-size:10.5pt;font-family:"Georgia",serif;color:#9A7033'>Dear Mithran M <br> EB Kabini has not submitted the data for HLP Report today yet.</span>
        </p>
        <br>
        <p style="margin-bottom: 5px">
            <span style="color: #9a7035; font-family: Georgia; font-size: 11pt">
            <span style="font-weight: normal">Warm regards<br><br></span> 
            
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Orange County Resorts &amp; Hotels Ltd., 2nd Floor St. Patrick's Business Complex, <br>21 Museum Rd, Bangalore - 560025, Karnataka, INDIA<br>M: {{user.PhoneMobile}} <br /></span>
            <a href="mailto:{{user.EmailAddress}}" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">{{user.EmailAddress}}</span></a>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt"> | </span>
            <a target="_blank" href="https://www.evolveback.com/?utm_source=email-footer&amp;utm_medium=email" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">www.evolveback.com</span></a>
            <br>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Our Resorts: </span>
              <a href="https://www.evolveback.com/coorg/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Coorg</strong></span></a>
            | <a href="https://www.evolveback.com/kabini/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Kabini</strong></span></a>
            | <a href="https://www.evolveback.com/hampi/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Hampi</strong></span></a> </span></a>
        </p>
        <p style="line-height: .1em; margin-top: 0px; margin-bottom: 1px;">
            <img style="width:90%; max-width: 460px;" src="http://www.evolveback.com/wp-content/uploads/2019/10/eb-logo-emailsignature-2.png" alt="Evolve Back">
        </p>
        <p style="line-height: .8em; margin-top: 5px;">
            <img src="http://www.evolveback.com/wp-content/uploads/2017/07/rt.png" alt="Responsible Tourism:" width="23" height="26"><span style="color: #76923c; font-family: Georgia, sans-serif; font-size: 9pt">Be aware of your environmental responsibility: Before printing this e-mail, ask yourself whether you need a hard copy!</span>
        </p>
        <!-- Signature End -->`
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (hampiCE >= 1) {
      let info = await transporter.sendMail({
        from: '"Orange County" <software@orangecounty.in>', // sender address
        to: "mithran.m@evolveback.com", // receiver address
        cc: ["vijaya.b@evolveback.com", "joydeep.b@evolveback.com"],
        subject: "DAILY HLP REPORT", // Subject line
        html: ` <!-- Signature Start -->
        <p class=MsoNormal>
            <span style='font-size:10.5pt;font-family:"Georgia",serif;color:#9A7033'>Dear Mithran M <br> EB Hampi has not submitted the data for HLP Report today yet.</span>
        </p>
        <br>
        <p style="margin-bottom: 5px">
            <span style="color: #9a7035; font-family: Georgia; font-size: 11pt">
            <span style="font-weight: normal">Warm regards<br><br></span> 
            
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Orange County Resorts &amp; Hotels Ltd., 2nd Floor St. Patrick's Business Complex, <br>21 Museum Rd, Bangalore - 560025, Karnataka, INDIA<br>M: {{user.PhoneMobile}} <br /></span>
            <a href="mailto:{{user.EmailAddress}}" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">{{user.EmailAddress}}</span></a>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt"> | </span>
            <a target="_blank" href="https://www.evolveback.com/?utm_source=email-footer&amp;utm_medium=email" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">www.evolveback.com</span></a>
            <br>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Our Resorts: </span>
              <a href="https://www.evolveback.com/coorg/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Coorg</strong></span></a>
            | <a href="https://www.evolveback.com/kabini/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Kabini</strong></span></a>
            | <a href="https://www.evolveback.com/hampi/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Hampi</strong></span></a> </span></a>
        </p>
        <p style="line-height: .1em; margin-top: 0px; margin-bottom: 1px;">
            <img style="width:90%; max-width: 460px;" src="http://www.evolveback.com/wp-content/uploads/2019/10/eb-logo-emailsignature-2.png" alt="Evolve Back">
        </p>
        <p style="line-height: .8em; margin-top: 5px;">
            <img src="http://www.evolveback.com/wp-content/uploads/2017/07/rt.png" alt="Responsible Tourism:" width="23" height="26"><span style="color: #76923c; font-family: Georgia, sans-serif; font-size: 9pt">Be aware of your environmental responsibility: Before printing this e-mail, ask yourself whether you need a hard copy!</span>
        </p>
        <!-- Signature End -->`
      });
      console.log("Message sent: %s", info.messageId);
    }
    if (coorgCE >= 1) {
      let info = await transporter.sendMail({
        from: '"Orange County" <software@orangecounty.in>', // sender address
        to: "mithran.m@evolveback.com", // receiver address
        cc: ["sujesh.s@evolveback.com", "thomas.p@evolveback.com"],
        subject: "DAILY HLP REPORT", // Subject line
        html: ` <!-- Signature Start -->
        <p class=MsoNormal>
            <span style='font-size:10.5pt;font-family:"Georgia",serif;color:#9A7033'>Dear Mithran M <br> EB Coorg has not submitted the data for HLP Report today yet.</span>
        </p>
        <br>
        <p style="margin-bottom: 5px">
            <span style="color: #9a7035; font-family: Georgia; font-size: 11pt">
            <span style="font-weight: normal">Warm regards<br><br></span> 
            
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Orange County Resorts &amp; Hotels Ltd., 2nd Floor St. Patrick's Business Complex, <br>21 Museum Rd, Bangalore - 560025, Karnataka, INDIA<br>M: {{user.PhoneMobile}} <br /></span>
            <a href="mailto:{{user.EmailAddress}}" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">{{user.EmailAddress}}</span></a>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt"> | </span>
            <a target="_blank" href="https://www.evolveback.com/?utm_source=email-footer&amp;utm_medium=email" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt">www.evolveback.com</span></a>
            <br>
            <span style="color: #8c8c8b; font-family: Georgia, sans-serif; font-size: 9pt">Our Resorts: </span>
              <a href="https://www.evolveback.com/coorg/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Coorg</strong></span></a>
            | <a href="https://www.evolveback.com/kabini/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Kabini</strong></span></a>
            | <a href="https://www.evolveback.com/hampi/?utm_source=gmail&utm_medium=email%20signature&utm_campaign=ebgmail" target="_blank" style="text-decoration: none !important;"><span style="color: #8c8c8b; text-decoration: none; font-family: Georgia, sans-serif; font-size: 9pt"><strong>Evolve Back, Hampi</strong></span></a> </span></a>
        </p>
        <p style="line-height: .1em; margin-top: 0px; margin-bottom: 1px;">
            <img style="width:90%; max-width: 460px;" src="http://www.evolveback.com/wp-content/uploads/2019/10/eb-logo-emailsignature-2.png" alt="Evolve Back">
        </p>
        <p style="line-height: .8em; margin-top: 5px;">
            <img src="http://www.evolveback.com/wp-content/uploads/2017/07/rt.png" alt="Responsible Tourism:" width="23" height="26"><span style="color: #76923c; font-family: Georgia, sans-serif; font-size: 9pt">Be aware of your environmental responsibility: Before printing this e-mail, ask yourself whether you need a hard copy!</span>
        </p>
        <!-- Signature End -->`
      });
      console.log("Message sent: %s", info.messageId);
    }
  }
  main().catch(console.error);
});
