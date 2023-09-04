require('dotenv').config(); 
const express = require('express');
const cors = require('cors');

const openLink = require('../src/tests/automation/runJobAssistant'); 
const sgMail = require('@sendgrid/mail');


const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json()); 


console.log('new****',process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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
app.post('/send-email', (req, res) => {
    const { email, name, additionalInfo, contactReason } = req.body
    const msg = {
      to: 'emmanuelsibandaus@gmail.com',
      from: 'emmanuelsibandaus@gmail.com', 
      subject: `${name} ${email} regarding ${contactReason}`,
      text: `${additionalInfo} from ${email}`,  
      html: `<strong>${additionalInfo}</strong> from <strong>${email}</strong>`  
    };
    console.log('Prepared email message:', msg)
    sgMail
      .send(msg)
      .then(() => {
        res.json({ success: true, message: 'Email sent' });
      })
      .catch((error) => {
        console.error('SendMail error:', error)
        res.status(500).json({ success: false, message: 'Error sending email.' });  
      });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
