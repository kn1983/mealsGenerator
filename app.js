const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs").promises;

async function readFile(pathToFile){
    try {
        const data = await fs.readFile(pathToFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
        return null;
    }
}

app.listen(port, () => {
    console.log(`Example app listeningn on port ${port}`);
});

app.get("/", (req, res)=>{
    res.send("Hello world");
});

app.get("/meals", async (req, res)=> {
    const jsonData = await readFile("./meals.json");

    if (jsonData){
        res.json(jsonData);
    } else {
        res.status(500).send("Error reading file");
    }
});

app.get("/apa", async (req, res) => {
    const jsonData = await readFile("./hejApa.json");

    if (jsonData){
        res.json(jsonData);
    } else {
        res.status(500).send("Error reading file");
    }
});

app.get("*", (req, res) => {
    res.status(404).send("Route doesn't exists");
});



