import { getSongs, addSong, getMusicBoxes, addMusicBox } from './firebase.js'

const express = require('express');
const cors = require('cors');

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json()); // Para que sepa interpretar el body cuando se le envie datos en formato JSON.


app.get('/get/boxes', async (req, res) => {
    try {
        const musicBoxes = await getMusicBoxes();
        console.log(musicBoxes);
        res.status(200).json(musicBoxes);
        
    } catch (error) {
        console.log('Error while getting music boxes: ', error);
        res.status(500).json({message: 'Internal server error'});
    }

})


app.get('/get/songs', async (req, res) => {
    try {
        const songs = await getSongs();
        console.log(songs);
        res.status(200).json(songs);
        
    } catch (error) {
        console.log('Error while getting songs: ', error);
        res.status(500).json({message: 'Internal server error'});
    }
})


app.post('/add/box', async (req, res) => {
    try {
        const {imageURL, musicBoxName, boxPrice} = req.body();
        await addMusicBox(imageURL, musicBoxName, boxPrice);
        res.status(201).json({image_URL: imageURL, box_name: musicBoxName, price: boxPrice});

    } catch (error) {
        console.log('Error while posting a Music Box: ', error);
        res.status(500).json({message: 'Internal server error'});
    }
})



app.post('/add/song', async (req, res) => {
    try {
        const {songName, exampleURL} = req.body();
        await addSong(songName, exampleURL);
        res.status(201).json({song_name: songName, example_URL: exampleURL});

    } catch (error) {
        console.log('Error while posting a song: ', error);
        res.status(500).json({message: 'Internal server error'});
    }
})


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}.`)
})
