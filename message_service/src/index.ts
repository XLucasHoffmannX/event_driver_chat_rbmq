import express from 'express';

/* application */
const app = express();

/* listen */
const PORT = process.env.PORT || 4040;
app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));