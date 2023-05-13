import app from "./app.js";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`first backend app listening on port ${port}`);
});

// Unhandled Promise Rejection
//ka crash y krd,abe try w catch akay db.js labarin enja aika
//balam error akaman pshan naya
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
