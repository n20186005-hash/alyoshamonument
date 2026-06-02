const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'messages', 'en.json');
const zhPath = path.join(__dirname, 'src', 'messages', 'zh.json');
const bgPath = path.join(__dirname, 'src', 'messages', 'bg.json');

const updateJson = (filePath, updater) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  updater(data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

const replaceOvech = (str, lang) => {
  if (typeof str !== 'string') return str;
  if (lang === 'zh') {
    return str.replace(/Fortress „Ovech“/g, 'Youth Hill')
              .replace(/Ovech/g, 'Youth Hill')
              .replace(/普罗瓦迪亚（Provadia）/g, '普罗夫迪夫（Plovdiv）')
              .replace(/普罗瓦迪亚/g, '普罗夫迪夫')
              .replace(/瓦尔纳州/g, '普罗夫迪夫州')
              .replace(/瓦尔纳/g, '普罗夫迪夫');
  }
  if (lang === 'en') {
    return str.replace(/Fortress „Ovech“/g, 'Youth Hill')
              .replace(/Ovech/g, 'Youth Hill')
              .replace(/Provadia/g, 'Plovdiv')
              .replace(/Varna Province/g, 'Plovdiv Province')
              .replace(/Varna/g, 'Plovdiv');
  }
  if (lang === 'bg') {
    return str.replace(/Крепост „Овеч“/g, 'Младежки хълм')
              .replace(/Овеч/g, 'Младежки хълм')
              .replace(/Провадия/g, 'Пловдив')
              .replace(/Област Варна/g, 'Област Пловдив')
              .replace(/Варна/g, 'Пловдив');
  }
  return str;
};

const walkObj = (obj, lang) => {
  if (typeof obj === 'string') return replaceOvech(obj, lang);
  if (Array.isArray(obj)) return obj.map(item => walkObj(item, lang));
  if (typeof obj === 'object' && obj !== null) {
    const res = {};
    for (const key in obj) {
      res[key] = walkObj(obj[key], lang);
    }
    return res;
  }
  return obj;
};

updateJson(enPath, (data) => {
  const res = walkObj(data, 'en');
  Object.assign(data, res);
});

updateJson(zhPath, (data) => {
  const res = walkObj(data, 'zh');
  Object.assign(data, res);
});

updateJson(bgPath, (data) => {
  const res = walkObj(data, 'bg');
  Object.assign(data, res);
});

console.log("JSON files updated for Ovech replacements.");
