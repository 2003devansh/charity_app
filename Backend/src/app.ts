import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import donorRoutes from "./routes/donor.routes";
import recipientRoutes from "./routes/recipient.routes";
import requestRoutes from "./routes/request.routes";
import volunteerRoutes from "./routes/volunteer.routes";
import notificationRoutes from "./routes/notification.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("App is running on my head ");
});

app.use("/auth", authRoutes);
app.use("/donor", donorRoutes);
app.use("/recipient", recipientRoutes);
app.use("/requests", requestRoutes);
app.use("/volunteer", volunteerRoutes);
app.use("/notifications", notificationRoutes);

export default app;
