const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>My CI/CD App</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f4f8; }
        h1 { color: #232f3e; }
        p { color: #545b64; font-size: 1.2em; }
        .pipeline-badge { background: #00a86b; color: white; padding: 8px 16px; border-radius: 4px; display: inline-block; margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1>Hello from CodePipeline!</h1>
      <p>This app was deployed automatically via AWS CodePipeline.</p>
      <div class="pipeline-badge">Pipeline Version 2.0</div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});