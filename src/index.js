import express from "express";
import cors from "cors";
import controllerRide from "./controllers/controller.ride.js";

const app = express();

// Middlewares...
app.use(express.json());
app.use(cors());

// Routes...
app.get("/rides", controllerRide.List);
app.post("/rides", controllerRide.Insert);
app.delete("/rides/:ride_id", controllerRide.Delete);
app.put("/rides/:ride_id/finish", controllerRide.Finish);

app.listen(3001, () => {
  console.log("App running - Port 3001");
});