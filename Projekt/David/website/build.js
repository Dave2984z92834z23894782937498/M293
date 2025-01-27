const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');

// Verzeichnisse
const srcDir = path.join(__dirname, 'website');  // Quellverzeichnis (nur einmal 'website'!)
const distDir = path.join(__dirname, 'dist');    // Zielverzeichnis

// 1. Lösche den dist-Ordner, falls vorhanden und erstelle ihn neu
if (fs.existsSync(distDir)) {
    fs.rmdirSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Minimiere HTML (index.html)
const htmlFile = path.join(srcDir, 'index.html');
const minifiedHtmlFile = path.join(distDir, 'index.html');

fs.readFile(htmlFile, 'utf8', (err, html) => {
    if (err) {
        console.error('Fehler beim Lesen der HTML-Datei:', err);
        return;
    }

    const minifiedHtml = html.replace(/\s+/g, ' ').trim(); // Sehr einfache Minifizierung

    fs.writeFileSync(minifiedHtmlFile, minifiedHtml);
    console.log('✔ HTML minimiert');
});

// 3. Minimiere CSS (styles.css)
const cssSrc = path.join(srcDir, 'css', 'styles.css');
const cssDestDir = path.join(distDir, 'css');
const cssDest = path.join(cssDestDir, 'styles.min.css');

// Stelle sicher, dass das Zielverzeichnis existiert
if (!fs.existsSync(cssDestDir)) {
    fs.mkdirSync(cssDestDir, { recursive: true });
}

// Lese die CSS-Datei und minifiziere sie
fs.readFile(cssSrc, 'utf8', (err, css) => {
    if (err) {
        console.error('Fehler beim Lesen der CSS-Datei:', err);
        return;
    }

    postcss([cssnano])
        .process(css, { from: cssSrc, to: cssDest })
        .then(result => {
            fs.writeFileSync(cssDest, result.css);
            if (result.map) fs.writeFileSync(path.join(cssDestDir, 'styles.min.css.map'), result.map);
            console.log('✔ CSS minimiert');
        })
        .catch(error => console.error('Fehler bei der CSS-Minifizierung:', error));
});

console.log('🚀 Build abgeschlossen!');
