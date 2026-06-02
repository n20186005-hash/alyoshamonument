const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'messages', 'en.json');
const zhPath = path.join(__dirname, 'src', 'messages', 'zh.json');

const updateJson = (filePath, updater) => {
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
  }
};

updateJson(enPath, (data) => {
  commonUpdates(data, 'en');
  data.hero.subtitle = 'Plovdiv Province · Bunardzhika Hill';
  data.hero.rating = '4.6';
  data.hero.reviewCount = '5,175 reviews';
  data.hero.type = 'Monument / Park';
  
  data.intro.title = 'Discover "Alyosha" & Bunardzhika Hill';
  data.intro.description = 'The Monument of the Soviet Army, commonly known as "Alyosha", is a magnificent 11-metre tall reinforced concrete statue of a Soviet soldier. It stands majestically on Bunardzhika Hill in Plovdiv, offering breathtaking panoramic views of the city. The park itself is a favorite place for exploration, walking, and relaxation for visitors.';
  
  data.knowledge.title = 'About the Monument & Park';
  data.knowledge.sections[0].content = 'Built in 1954-1957, the "Alyosha" monument commemorates Soviet casualties during the Soviet occupation of Bulgaria in World War II. The hill it stands on, Bunardzhika (also known as the Hill of Liberators), is one of Plovdiv\'s famous hills.';
  data.knowledge.sections[1].content = 'Located in central Plovdiv, the park and monument are situated on a striking hill. It is accessible by foot through scenic park trails and offers an unforgettable historical and natural journey.';
  data.knowledge.sections[2].content = 'The Bunardzhika park features well-preserved walking paths, lush greenery, and resting areas. It is a popular destination for both history enthusiasts and nature lovers.';
  data.knowledge.sections[3].content = 'The monument and the surrounding park are maintained by local authorities as an important cultural and recreational site for the city of Plovdiv.';

  data.faq.items[0].question = 'When is Bunardzhika Hill and the monument open?';
  data.faq.items[0].answer = 'The park and the monument area are open year-round and accessible to visitors throughout the day. There are no specific operating hours restrictions.';

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

  data.gallery.captions = Array(21).fill('Alyosha Monument & Bunardzhika Hill photo');
});

updateJson(zhPath, (data) => {
  commonUpdates(data, 'zh');
  data.hero.subtitle = '普罗夫迪夫州 · Bunardzhika 山';
  data.hero.rating = '4.6';
  data.hero.reviewCount = '5,175 条评价';
  data.hero.type = '纪念碑 / 公园';
  
  data.intro.title = '探索“阿廖沙”与 Bunardzhika 山';
  data.intro.description = '苏联军队纪念碑，俗称“阿廖沙”（Alyosha），是一座宏伟的11米高的钢筋混凝土苏联士兵雕像。它巍然矗立在普罗夫迪夫的 Bunardzhika 山上，可俯瞰令人惊叹的城市全景。公园本身也是游客探索、散步和放松的最爱之地。';
  
  data.knowledge.title = '关于纪念碑与公园';
  data.knowledge.sections[0].content = '“阿廖沙”纪念碑建于1954-1957年，为了纪念二战期间苏联在保加利亚的伤亡。它所在的 Bunardzhika 山（也被称为解放者之山）是普罗夫迪夫著名的山丘之一。';
  data.knowledge.sections[1].content = '公园和纪念碑位于普罗夫迪夫市中心，坐落在一座引人注目的山丘上。可以通过风景优美的公园小径步行到达，提供令人难忘的历史和自然之旅。';
  data.knowledge.sections[2].content = 'Bunardzhika 公园拥有保存完好的步行道、郁郁葱葱的绿植和休息区。它是历史爱好者和自然爱好者的热门目的地。';
  data.knowledge.sections[3].content = '纪念碑及周边公园由地方当局作为普罗夫迪夫市重要的文化和休闲场所进行维护。';

  data.faq.items[0].question = 'Bunardzhika 山和纪念碑什么时候开放？';
  data.faq.items[0].answer = '公园和纪念碑区域全年开放，全天可供游客参观。没有具体的营业时间限制。';

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

  data.gallery.captions = Array(21).fill('阿廖沙纪念碑与 Bunardzhika 山照片');
});

console.log("Alyosha JSON files updated.");
