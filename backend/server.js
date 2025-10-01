import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connect from "./database/connection.js";
import AuthRouter from "./router/AuthRouter.js";
import EventsRouter from "./router/EventsRouter.js";
import VisitorRoutes from "./router/VisitorRouter.js";
import AwardNominationRoutes from "./router/AwardNominationRouter.js";
import stallbookingRoutes from "./router/StallBookingRouter.js";
import SponsorRoutes from "./router/SponsorRoutes.js";
import GuestsRoutes from "./router/GuestsRoutes.js";
import SpeakersRoutes from "./router/SpeakerRoutes.js";
import AwardeesvipsRoutes from "./router/AwardeesvipRoutes.js";
// Set up global .env access
dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || "8080";

// Middlewares

app.use(express.json()); // needed
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

// Route Auth APIs
app.use("/api/auth", AuthRouter);

// Events APIs
app.use("/api/events", EventsRouter);

// Registration Management APIs
app.use("/api/visitors", VisitorRoutes);
app.use("/api/awards", AwardNominationRoutes);
app.use("/api/stalls", stallbookingRoutes);
app.use('/api/sponsors', SponsorRoutes);

// VIP Management APIs
app.use("/api/guests", GuestsRoutes);
app.use("/api/speakers", SpeakersRoutes);
app.use("/api/awardeesvip", AwardeesvipsRoutes);


app.get("/", (req, res) => {
  res.status(201).json("Server is working");
});

// Start server only when we have valid connection
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server...!");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!", error);
  });
