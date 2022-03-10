const express = require("express");
const fs = require("fs")
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
    //TODO tracks.js [tracks, js]
    return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)//TODO users, storage, tracks
    if(name !== 'index'){
        console.log(`Cargando rutan ${name}`)
        router.use(`/${name}`,require(`./${file}`)) //TODO http://localhost:3000/api/tracks
    }
})

module.exports = router