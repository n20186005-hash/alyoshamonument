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

const commonUpdates = (data, filePath) => {
  data.meta.title = data.meta.title.replace(/Geo Milev Park/g, 'Fortress „Ovech“').replace(/格奥·米莱夫公园/g, 'Fortress „Ovech“').replace(/Парк „Гео Милев“/g, 'Крепост „Овеч“');
  data.meta.description = data.meta.description.replace(/Geo Milev Park/g, 'Fortress „Ovech“').replace(/格奥·米莱夫公园/g, 'Fortress „Ovech“').replace(/Парк „Гео Милев“/g, 'Крепост „Овеч“');
  
  data.hero.title = data.hero.title.replace(/Geo Milev Park/g, 'Fortress „Ovech“').replace(/格奥·米莱夫公园/g, 'Fortress „Ovech“').replace(/Парк „Гео Милев“/g, 'Крепост „Овеч“');
  
  // Footer links
  data.footer.officialLinks = {
    sofiaCity: "Visit Varna",
    sofiaTourism: "Provadia Municipality",
    bulgariaTourism: "Ministry of Tourism",
    bulgariaCulture: "Ministry of Culture",
    bulgariaHeritage: "Institute of Cultural Heritage",
    bulgariaMFA: "MFA - Consular Services"
  };
  
  if (filePath === zhPath) {
    data.footer.officialLinks = {
      sofiaCity: "瓦尔纳官方旅游局",
      sofiaTourism: "普罗瓦迪亚市政府",
      bulgariaTourism: "保加利亚共和国旅游部",
      bulgariaCulture: "保加利亚文化部",
      bulgariaHeritage: "保加利亚文化遗产研究所",
      bulgariaMFA: "保加利亚共和国外交部领事服务局"
    };
  } else if (filePath === bgPath) {
    data.footer.officialLinks = {
      sofiaCity: "Visit Varna",
      sofiaTourism: "Община Провадия",
      bulgariaTourism: "Министерство на туризма",
      bulgariaCulture: "Министерство на културата",
      bulgariaHeritage: "НИНКН",
      bulgariaMFA: "МВнР"
    };
  }
};

updateJson(enPath, (data) => {
  commonUpdates(data, enPath);
  data.hero.subtitle = "Varna Province · Fortress „Ovech“";
  data.hero.rating = "4.6";
  data.hero.reviewCount = "5,181 reviews";
  data.hero.type = "Historical Landmark";
  
  data.basicInfo.officialNameValue = "Fortress „Ovech“";
  data.basicInfo.typeValue = "Historical Landmark";
  data.basicInfo.cityValue = "Provadia";
  data.basicInfo.googleRatingValue = "4.6 (5,181)";
  data.basicInfo.addressValue = "5CGX+54R, 9200 Provadia, Bulgaria";
  data.basicInfo.telephoneValue = "+35951842033";
  data.basicInfo.plusCodeValue = "5CGX+54R Provadia, Bulgaria";
  
  data.footer.brandName = "Fortress „Ovech“";
  data.footer.brandSubtitle = "Varna Province · Fortress „Ovech“";
  
  data.mapSection.subtitle = "5CGX+54R, 9200 Provadia, Bulgaria";
});

updateJson(zhPath, (data) => {
  commonUpdates(data, bgPath);
  data.hero.subtitle = "瓦尔纳州 · Fortress „Ovech“";
  data.hero.rating = "4.6";
  data.hero.reviewCount = "5,181 条评价";
  data.hero.type = "古迹地标";
  
  data.basicInfo.officialNameValue = "Fortress „Ovech“";
  data.basicInfo.typeValue = "古迹地标";
  data.basicInfo.cityValue = "普罗瓦迪亚 (Provadia)";
  data.basicInfo.googleRatingValue = "4.6 (5,181)";
  data.basicInfo.addressValue = "5CGX+54R, 9200 Provadia, 保加利亚";
  data.basicInfo.telephoneValue = "+35951842033";
  data.basicInfo.plusCodeValue = "5CGX+54R 普罗瓦迪亚, 保加利亚";
  
  data.footer.brandName = "Fortress „Ovech“";
  data.footer.brandSubtitle = "瓦尔纳州 · Fortress „Ovech“";
  
  data.mapSection.subtitle = "5CGX+54R, 9200 Provadia, 保加利亚";
});

updateJson(bgPath, (data) => {
  commonUpdates(data);
  data.hero.subtitle = "Област Варна · Крепост „Овеч“";
  data.hero.rating = "4.6";
  data.hero.reviewCount = "5,181 отзива";
  data.hero.type = "Историческа забележителност";
  
  data.basicInfo.officialNameValue = "Крепост „Овеч“";
  data.basicInfo.typeValue = "Историческа забележителност";
  data.basicInfo.cityValue = "Провадия";
  data.basicInfo.googleRatingValue = "4.6 (5,181)";
  data.basicInfo.addressValue = "5CGX+54R, 9200 Провадия, България";
  data.basicInfo.telephoneValue = "+35951842033";
  data.basicInfo.plusCodeValue = "5CGX+54R Провадия, България";
  
  data.footer.brandName = "Крепост „Овеч“";
  data.footer.brandSubtitle = "Област Варна · Крепост „Овеч“";
  
  data.mapSection.subtitle = "5CGX+54R, 9200 Провадия, България";
});

console.log("JSON files updated.");
