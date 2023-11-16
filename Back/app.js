import app from "./models/server.js";

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening on port ${port}`);

export default app;
