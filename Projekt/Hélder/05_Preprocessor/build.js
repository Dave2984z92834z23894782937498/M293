const postcss = require('postcss');
const cssnano = require('cssnano');
const fs = require('fs');
const CSS_directory = "Site/style.scss"

// Lese die CSS-Datei
fs.readFile(CSS_directory, 'utf8', (err, css) => {
    if (err) throw err;

    postcss([cssnano])
        .process(css, { from: CSS_directory, to: 'dist/css/style.min.css' })
        .then(result => {
            fs.writeFileSync('dist/css/style.min.css', result.css);
            if (result.map) fs.writeFileSync('dist/css/style.min.css.map', result.map);
            console.log('CSS erfolgreich minimiert');
        })
        .catch(error => console.error('Fehler bei der CSS-Minifizierung:', error));
});

const Terser = require('terser');

// Pfad zur Eingabedatei und Ausgabedatei
const inputFilePath = 'Site/script.js';  // Pfad zu deiner originalen JS-Datei
const outputFilePath = 'dist/js/script.min.js';  // Pfad zur minimierten Datei

// Lese den Inhalt der JavaScript-Datei
fs.readFile(inputFilePath, 'utf8', (err, code) => {
    if (err) {
        console.error('Fehler beim Lesen der Datei:', err);
        return;
    }

    // Minifiziere den JavaScript-Code
    const minified = Terser.minify(code);
    if (minified.error) {
        console.error('Fehler beim Minifizieren des Codes:', minified.error);
    } else {
        // Schreibe den minifizierten Code in die Ausgabedatei
        fs.writeFileSync(outputFilePath, minified[Symbol.toStringTag]);
        console.log('JavaScript erfolgreich minimiert!');
    }
});


const path = require('path');
const sharp = require('sharp');

// Verzeichnis mit den Bildern
const inputDir = 'Site/images';
const outputDir = 'dist/images/';

// Stelle sicher, dass das Zielverzeichnis existiert
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Lese alle Dateien im Eingabeverzeichnis
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Fehler beim Lesen des Verzeichnisses:', err);
        return;
    }

    // Filtere nur Bilddateien (z.B. .jpg, .png)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    imageFiles.forEach(file => {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);

        // Komprimiere jedes Bild und speichere es im Ausgabeordner
        sharp(inputPath)
            .resize(200, 200)  // Optional: Resizing, wenn du möchtest
            .toFile(outputPath, (err, info) => {
                if (err) {
                    console.error(`Fehler beim Verarbeiten von ${file}:`, err);
                } else {
                    console.log(`Bild ${file} erfolgreich optimiert:`, info);
                }
            });
    });
});
