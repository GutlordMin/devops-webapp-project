const express = require('express');
const app = express();
const port = 3000;

// Existing route (Hello World)
app.get('/', (req, res) => {
  res.send(`
    <h1>Hello World!</h1>
    <button onclick="window.location.href='/final-assessment'">Go to Final Assessment</button>
  `);
});

// New route for Final Assessment Page
app.get('/final-assessment', (req, res) => {
  res.send(`
    <h1>Our Work as the Final Assessment for Software Engineering</h1>
    <p>We love UniKL!</p>
  `);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
