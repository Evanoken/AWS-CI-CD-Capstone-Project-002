const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>AWS CI/CD Capstone</title></head>
      <body style="font-family:Arial; text-align:center; margin-top:100px;">
        <h1>Hello from AWS CI/CD Capstone Project!</h1>
        <p>Deployed via CodePipeline → CodeBuild → ECR → ECS (Fargate)</p>
        <p>Build: <strong>${process.env.BUILD_ID || 'local'}</strong></p>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

module.exports = { app, server };
