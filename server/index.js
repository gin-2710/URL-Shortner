import express from 'express';
import dotenv from 'dotenv';

const app = express();

const PORT = dotenv.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
