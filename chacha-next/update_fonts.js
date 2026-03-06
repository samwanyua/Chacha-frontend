const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/'Fredoka One',\s*cursive/g, "var(--font-fredoka), 'Fredoka One', cursive")
      .replace(/'Nunito',\s*sans-serif/g, "var(--font-nunito), 'Nunito', sans-serif");
    
    // Prevent double replacing if I already updated some
    newContent = newContent.replace(/var\(--font-fredoka\),\s*var\(--font-fredoka\)/g, "var(--font-fredoka)");
    
    if (content !== newContent) {
      console.log('Updated:', filePath);
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
  }
});
