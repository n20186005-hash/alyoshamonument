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

const commonUpdates = (data, lang) => {
  data.meta.title = lang === 'bg' ? 'Младежки хълм – Пловдив, България' : (lang === 'zh' ? 'Youth Hill – 普罗夫迪夫，保加利亚' : 'Youth Hill – Plovdiv, Bulgaria');
  data.meta.description = lang === 'bg' ? 'Пълен туристически пътеводител за Младежки хълм в Пловдив. Научете за този парк, включително местоположение, удобства и информация за посетители.' : (lang === 'zh' ? 'Youth Hill完整旅游指南。了解这个公园，包括位置、便利设施和游客信息。' : 'Complete travel guide to Youth Hill in Plovdiv. Learn about this park, including location, amenities, and visitor information.');
  
  data.hero.title = lang === 'bg' ? 'Младежки хълм' : 'Youth Hill';
  data.hero.mapsLink = 'https://maps.app.goo.gl/UKL7jt52HVUDLHWp9';

  data.footer.officialLinks = {
    bgTourism: 'https://www.tourism.government.bg/',
    bgCulture: 'https://mc.government.bg/',
    bgVisa: 'https://www.mfa.bg/en/services-travel/consular-services/travel-bulgaria/visa-bulgaria/',
    bgEEA: 'https://eea.government.bg/',
    plovdivCity: 'https://www.plovdiv.bg/',
    plovdivGov: 'https://pd.government.bg/',
    plovdivTourism: 'http://www.visitplovdiv.com/',
    bgHeritage: 'http://ninkn.bg/'
  };

  if (lang === 'zh') {
    data.footer.officialLinksText = {
      bgTourism: '保加利亚共和国旅游部',
      bgCulture: '保加利亚文化部',
      bgVisa: '保加利亚共和国外交部领事服务局 (签证专属)',
      bgEEA: '保加利亚执行环境局 (EEA)',
      plovdivCity: '普罗夫迪夫市政府',
      plovdivGov: '普罗夫迪夫州政府',
      plovdivTourism: '普罗夫迪夫市旅游局',
      bgHeritage: '保加利亚文化遗产研究所 (NINKN)'
    };
  } else if (lang === 'en') {
    data.footer.officialLinksText = {
      bgTourism: 'Ministry of Tourism of the Republic of Bulgaria',
      bgCulture: 'Ministry of Culture of Bulgaria',
      bgVisa: 'MFA Consular Services (Visas)',
      bgEEA: 'Executive Environment Agency (EEA)',
      plovdivCity: 'Plovdiv Municipality',
      plovdivGov: 'Plovdiv District Administration',
      plovdivTourism: 'Visit Plovdiv',
      bgHeritage: 'National Institute of Immovable Cultural Heritage (NINKN)'
    };
  } else if (lang === 'bg') {
    data.footer.officialLinksText = {
      bgTourism: 'Министерство на туризма',
      bgCulture: 'Министерство на културата',
      bgVisa: 'МВнР - Консулски услуги',
      bgEEA: 'Изпълнителна агенция по околна среда (ИАОС)',
      plovdivCity: 'Община Пловдив',
      plovdivGov: 'Областна администрация Пловдив',
      plovdivTourism: 'ОП Туризъм - Пловдив',
      bgHeritage: 'НИНКН'
    };
  }
};

updateJson(enPath, (data) => {
  commonUpdates(data, 'en');
  data.hero.subtitle = 'Plovdiv Province · Youth Hill';
  data.hero.rating = '4.7';
  data.hero.reviewCount = '5,419 reviews';
  data.hero.type = 'Park';
  
  data.basicInfo.officialNameValue = 'Youth Hill';
  data.basicInfo.typeValue = 'Park';
  data.basicInfo.cityValue = 'Plovdiv';
  data.basicInfo.googleRatingValue = '4.7 (5,419)';
  data.basicInfo.addressValue = 'Halm Na MladosttaCentral district, 4002 Plovdiv, Bulgaria';
  data.basicInfo.telephoneValue = '+359893464019';
  data.basicInfo.plusCodeValue = '4PPJ+PF Plovdiv, Bulgaria';
  
  data.footer.brandName = 'Youth Hill';
  data.footer.brandSubtitle = 'Plovdiv Province · Youth Hill';
  
  data.mapSection.subtitle = 'Halm Na MladosttaCentral district, 4002 Plovdiv, Bulgaria';

  // gallery names update to English
  data.gallery.captions = Array(21).fill("Youth Hill photo");
});

updateJson(zhPath, (data) => {
  commonUpdates(data, 'zh');
  data.hero.subtitle = '普罗夫迪夫州 · Youth Hill';
  data.hero.rating = '4.7';
  data.hero.reviewCount = '5,419 条评价';
  data.hero.type = '公园';
  
  data.basicInfo.officialNameValue = 'Youth Hill';
  data.basicInfo.typeValue = '公园';
  data.basicInfo.cityValue = '普罗夫迪夫 (Plovdiv)';
  data.basicInfo.googleRatingValue = '4.7 (5,419)';
  data.basicInfo.addressValue = 'Halm Na MladosttaCentral district, 4002 Plovdiv, 保加利亚';
  data.basicInfo.telephoneValue = '+359893464019';
  data.basicInfo.plusCodeValue = '4PPJ+PF 普罗夫迪夫 保加利亚';
  
  data.footer.brandName = 'Youth Hill';
  data.footer.brandSubtitle = '普罗夫迪夫州 · Youth Hill';
  
  data.mapSection.subtitle = 'Halm Na MladosttaCentral district, 4002 Plovdiv, 保加利亚';

  // gallery names update to Chinese
  data.gallery.captions = Array(21).fill("Youth Hill 照片");
});

updateJson(bgPath, (data) => {
  commonUpdates(data, 'bg');
  data.hero.subtitle = 'Област Пловдив · Младежки хълм';
  data.hero.rating = '4.7';
  data.hero.reviewCount = '5,419 отзива';
  data.hero.type = 'Парк';
  
  data.basicInfo.officialNameValue = 'Младежки хълм';
  data.basicInfo.typeValue = 'Парк';
  data.basicInfo.cityValue = 'Пловдив';
  data.basicInfo.googleRatingValue = '4.7 (5,419)';
  data.basicInfo.addressValue = 'Halm Na MladosttaCentral district, 4002 Пловдив, България';
  data.basicInfo.telephoneValue = '+359893464019';
  data.basicInfo.plusCodeValue = '4PPJ+PF Пловдив, България';
  
  data.footer.brandName = 'Младежки хълм';
  data.footer.brandSubtitle = 'Област Пловдив · Младежки хълм';
  
  data.mapSection.subtitle = 'Halm Na MladosttaCentral district, 4002 Пловдив, България';

  // gallery names update to Bulgarian
  data.gallery.captions = Array(21).fill("Снимка от Младежки хълм");
});

console.log("JSON files updated for Youth Hill.");
