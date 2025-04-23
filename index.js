import { getSongs, addSong, getMusicBoxes, addMusicBox, deleteRow } from './firebase.js'
import express from 'express';
import cors from 'cors';
import { collection } from 'firebase/firestore';


const port = 3000;

const app = express();
app.use(cors());
app.use(express.json()); // Para que sepa interpretar el body cuando se le envie datos en formato JSON.


app.get('/get/boxes', async (req, res) => {
    try {
        const musicBoxesSnapshot = await getMusicBoxes(); 
        const musicBoxes = musicBoxesSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data() 
            };
        });
        console.log('Sending Music Boxes: ', musicBoxes);
        res.status(200).json(musicBoxes);
        
    } catch (error) {
        console.log('Error while getting music boxes: ', error);
        res.status(500).json({message: 'Internal server error'});
    }

})



app.get('/get/songs', async (req, res) => {
    try {
        const songsSnapShot = await getSongs();
        const songs = songsSnapShot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
        console.log('Sending songs: ', songs);
        res.status(200).json(songs);
        
    } catch (error) {
        console.log('Error while getting songs: ', error);
        res.status(500).json({message: 'Internal server error'});
    }
})



app.post('/add/box', async (req, res) => {
    try {
        const {imageURL, musicBoxName, isPersonalizable, boxPrice} = req.body;
        await addMusicBox(imageURL, musicBoxName, isPersonalizable, boxPrice);
        res.status(201).json({image_URL: imageURL, box_name: musicBoxName, personalizable: isPersonalizable, price: boxPrice});
        console.log('Box inserted')

    } catch (error) {
        console.log('Error while posting a Music Box: ', error);
        res.status(500).json({message: 'Internal server error'});
    }
})



app.post('/add/song', async (req, res) => {
    try {
        const {songName, exampleURL} = req.body;
        await addSong(songName, exampleURL);
        res.status(201).json({song_name: songName, example_URL: exampleURL});
        console.log('Song inserted');

    } catch (error) {
        console.log('Error while posting a song: ', error);
        res.status(500).json({message: 'Internal server error'});
    }
})



app.delete('/delete/row', async (req, res) => {
    try {
        const { collection, identification } = req.body;
        await deleteRow(collection, identification);
        res.status(200).json({table: collection, id: identification});
        console.log(`Row deleted in ${collection}`);

    } catch (error) {
        console.log(`Error while deleting a row in ${collection}: `, error);
        res.status(500).json({message: 'Internal server error'});
    }
})



app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}.`)
})

// El programa se ejecuta con: node index.js
