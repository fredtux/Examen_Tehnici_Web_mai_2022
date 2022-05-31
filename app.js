const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/.'));

app.post('/vocale', (req, res) => {
    let n1, n2, msg = { msg: "Date invalide" };

    if (!req.body.nr.match(/\d,\d/g)) {
        res.send(JSON.stringify(msg));
        return;
    }

    [n1, n2] = req.body.nr.split(',');

    if (req.body.text.toUpperCase() != req.body.text || n1 >= n2 || n2 > req.body.text.length - 1 || n1 < 0) {
        res.send(JSON.stringify(msg));
        return;
    }

    let arrMsg = [];

    for (let i = n1; i <= n2; ++i) {
        if (["A", "E", "I", "O", "U"].indexOf(req.body.text[i]) !== -1) {
            arrMsg.push(req.body.text[i]);
        }
    }

    msg.msg = arrMsg.join(",");

    res.send(JSON.stringify(msg));
});

app.listen(3000, () => { console.log('Merge pe portul: 3000!'); });