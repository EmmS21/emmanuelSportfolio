const express = require('express');
const cors = require('cors');
const openLink = require('../src/tests/automation/runJobAssistant'); // Adjust the path to where your Selenium script is located

const app = express();
const PORT = 5001;

app.use(cors());


app.get('/api/runSelenium', async (req, res) => {
    try {
        await openLink();
        res.send('Selenium script executed successfully.');
    } catch (error) {
        console.error("Selenium Error:", error.message);  
        console.error(error.stack);      
        res.status(500).send('Error executing Selenium script.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
