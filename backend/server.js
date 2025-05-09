const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware pour gérer le CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Configurer Multer pour stocker les fichiers dans le dossier "uploads"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Ajouter un timestamp pour éviter les collisions
    }
});

const upload = multer({ storage: storage });

// Créer un dossier "uploads" si il n'existe pas déjà
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Endpoint pour télécharger une photo
app.post('/api/photos/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucune photo téléchargée');
    }
    const fileUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
    res.status(200).json({ message: 'Photo téléchargée avec succès', fileUrl });
});

// Endpoint pour récupérer toutes les photos
app.get('/api/photos', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du dossier');
        }

        const photos = files.map((file, index) => ({
            IdP: index + 1, // ID unique pour chaque photo
            PhotoURL: `http://localhost:${port}/uploads/${file}`,
            PhotoDescription: `Photo ${file}`, // Tu peux ajuster la description comme tu veux
            PhotoDate: new Date() // Date d'ajout de la photo
        }));

        res.json(photos);
    });
});

// Servir les fichiers dans le dossier "uploads"
app.use('/uploads', express.static('uploads'));

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
