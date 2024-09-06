// webhook-listener.js
const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

// GitHub Webhook Listener
app.post('/webhook', (req, res) => {
    const payload = req.body;

    if (payload.ref === 'refs/heads/main') { // Check if the push is to the main branch
        console.log('New push event detected. Pulling latest changes...');

        // Pull the latest changes and restart the app
        exec('git pull && pm2 restart my-app', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error pulling the latest changes: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }

    res.status(200).send('Webhook received!');
});

// Start the server
app.listen(3000, () => {
    console.log('Listening for GitHub Webhook events on port 3000');
});

