const express = require('express');
const app = express();
const PORT = process.allowedNodeEnvironmentFlags.PORT || 3000;
const bodyParser = require('body-parser');
const metrics = require('./src/services/metrics/metrics').default;

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Server is up.');
});

app.post('/metric/:key', (req, res) => {
    const key = req.params.key;
    const value = req.body.value;
    metrics.addMetric(key, value);

    res.status(200).json({});
});

app.get('/metric/:key/sum', (req, res) => {
    const key = req.params.key;

    const sum = metrics.getSumOfMetrics(key);

    res.status(200).json({ value: sum })
});

app.listen(PORT, () => console.log(`Metric reporting server listening on port ${PORT}!`));