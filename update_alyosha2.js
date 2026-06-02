const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'messages', 'en.json');
const zhPath = path.join(__dirname, 'src', 'messages', 'zh.json');
const bgPath = path.join(__dirname, 'src', 'messages', 'bg.json');

const updateJson = (filePath, updater) => {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  updater(data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

const commonUpdates = (data, lang) => {
  data.meta.title = lang === 'zh' ? '阿廖沙红军纪念碑 & Bunardzhika山 – 普罗夫迪夫，保加利亚' : 'Monument of the Red Army "Alyosha" & Bunardzhika Hill – Plovdiv, Bulgaria';
  data.meta.description = lang === 'zh' ? '阿廖沙红军纪念碑及Bunardzhika山完整旅游指南。了解这个普罗夫迪夫的标志性景点，包括位置、历史和游客信息。' : 'Complete travel guide to the Monument of the Red Army "Alyosha" and Bunardzhika Hill in Plovdiv. Learn about this iconic landmark, including location, history, and visitor information.';
  
  data.hero.title = lang === 'zh' ? '阿廖沙红军纪念碑' : 'Monument of the Red Army "Alyosha"';
  data.hero.mapsLink = 'https://maps.app.goo.gl/vqoPaMATs3mQh3EL6';

  if (lang === 'zh') {
    data.footer.officialLinksText = {
      bgTourism: '保加利亚共和国旅游部',
      bgCulture: '保加利亚文化部',
      bgVisa: '保加利亚共和国外交部领事服务局 (签证专属)',
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
      plovdivCity: 'Община Пловдив',
      plovdivGov: 'Областна администрация Пловдив',
      plovdivTourism: 'ОП Туризъм - Пловдив',
      bgHeritage: 'НИНКН'
    };
  }
  
  data.footer.officialLinks = {
    bgTourism: "https://www.tourism.government.bg/",
    bgCulture: "https://mc.government.bg/",
    bgVisa: "https://www.mfa.bg/en/services-travel/consular-services/travel-bulgaria/visa-bulgaria/",
    plovdivCity: "https://www.plovdiv.bg/",
    plovdivGov: "https://pd.government.bg/",
    plovdivTourism: "http://www.visitplovdiv.com/",
    bgHeritage: "http://ninkn.bg/"
  };
};

const commonContentUpdates = (data, lang) => {
  commonUpdates(data, lang);
  
  if (lang === 'zh') {
    data.hero.subtitle = '普罗夫迪夫州 · Bunardzhika 山';
    data.hero.rating = '4.6';
    data.hero.reviewCount = '5,175 条评价';
    data.hero.type = '纪念碑 / 公园';
    
    data.basicInfo.officialNameValue = '阿廖沙红军纪念碑';
    data.basicInfo.typeValue = '纪念碑 / 公园';
    data.basicInfo.cityValue = '普罗夫迪夫 (Plovdiv)';
    data.basicInfo.googleRatingValue = '4.6 (5,175) 纪念碑 / 4.7 (4,130) 公园';
    data.basicInfo.addressValue = 'Бунарджика, 4000 Plovdiv, 保加利亚';
    data.basicInfo.telephoneValue = '+35932656700 (公园)';
    data.basicInfo.plusCodeValue = '4PVQ+G4 普罗夫迪夫, 保加利亚';
    
    data.footer.brandName = '阿廖沙红军纪念碑';
    data.footer.brandSubtitle = '普罗夫迪夫州 · Bunardzhika 山';
    
    data.mapSection.subtitle = 'Бунарджика, 4000 Plovdiv, 保加利亚';
    data.gallery.captions = Array(14).fill('阿廖沙纪念碑与 Bunardzhika 山照片');
  } else {
    data.hero.subtitle = 'Plovdiv Province · Bunardzhika Hill';
    data.hero.rating = '4.6';
    data.hero.reviewCount = '5,175 reviews';
    data.hero.type = 'Monument / Park';
    
    data.basicInfo.officialNameValue = 'Monument of the Red Army "Alyosha"';
    data.basicInfo.typeValue = 'Monument / Park';
    data.basicInfo.cityValue = 'Plovdiv';
    data.basicInfo.googleRatingValue = '4.6 (5,175) for Monument / 4.7 (4,130) for Park';
    data.basicInfo.addressValue = 'Бунарджика, 4000 Plovdiv, Bulgaria';
    data.basicInfo.telephoneValue = '+35932656700 (Park)';
    data.basicInfo.plusCodeValue = '4PVQ+G4 Plovdiv, Bulgaria';
    
    data.footer.brandName = '"Alyosha" Monument';
    data.footer.brandSubtitle = 'Plovdiv Province · Bunardzhika Hill';
    
    data.mapSection.subtitle = 'Бунарджика, 4000 Plovdiv, Bulgaria';
    data.gallery.captions = Array(14).fill('Alyosha Monument & Bunardzhika Hill photo');
  }
};

updateJson(enPath, (data) => commonContentUpdates(data, 'en'));
updateJson(zhPath, (data) => commonContentUpdates(data, 'zh'));
updateJson(bgPath, (data) => commonContentUpdates(data, 'bg'));

console.log("Alyosha JSON files updated with exact links.");
