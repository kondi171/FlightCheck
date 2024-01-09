const express = require('express');
const app = express();
const port = 3000;
const API_KEY = 'a119e6ac10d93dedba02b5d80689c274';
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/flights/:status', async (req, res) => {
    const status = req.params.status;
    const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_status=${status}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).send('Error fetching data from the external API');
    }
});

// app.get('/routes', async (req, res) => {
//     const url = `http://api.aviationstack.com/v1/routes?access_key=${API_KEY}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         res.send(data);
//     } catch (error) {
//         console.error('Error fetching data: ', error);
//         res.status(500).send('Error fetching data from the external API');
//     }
// });

app.get('/airports', async (req, res) => {
    const url = `http://api.aviationstack.com/v1/airports?access_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).send('Error fetching data from the external API');
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});