const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, searchValue, replaceValue) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(searchValue)) {
    const updatedContent = content.split(searchValue).join(replaceValue);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    replaceInFile(filePath, 'youthhillplovdiv.com', 'alyoshamonument.com');
  }
});

// Update zh.json
const zhJsonPath = path.join(__dirname, 'src', 'messages', 'zh.json');
let zhContent = fs.readFileSync(zhJsonPath, 'utf8');
zhContent = zhContent.replace(/Bunardzhika\s*山/g, '布纳吉卡山');
zhContent = zhContent.replace(/Bunardzhika/g, '布纳吉卡');
fs.writeFileSync(zhJsonPath, zhContent, 'utf8');
console.log('Updated zh.json');

// Check bg.json for any mixed content if needed
const bgJsonPath = path.join(__dirname, 'src', 'messages', 'bg.json');
let bgContent = fs.readFileSync(bgJsonPath, 'utf8');
// Just checking if any obvious issues in bg.json
