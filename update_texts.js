const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'messages', 'en.json');
const zhPath = path.join(__dirname, 'src', 'messages', 'zh.json');

function updateJson(filePath, updater) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  updater(data);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// 1. English Updates
updateJson(enPath, (data) => {
  // Intro
  data.intro.title = "Discover Fortress „Ovech“";
  data.intro.description = "Fortress „Ovech“ is a magnificent historical landmark located in Provadia, Varna Province. The fortress offers breathtaking views and a deep dive into Bulgaria's medieval history. It is a favorite place for exploration, photography, and relaxation for visitors.";
  data.intro.alsoKnownAs.items[0] = "Ancient stone walls and ruins";
  data.intro.alsoKnownAs.items[1] = "Stunning panoramic views";
  data.intro.alsoKnownAs.items[2] = "Historical atmosphere";
  
  // Knowledge
  data.knowledge.title = "About Fortress „Ovech“";
  data.knowledge.sections[0].content = "The fortress has a rich history dating back to the Byzantine and medieval Bulgarian periods. It served as an important defensive stronghold and played a key role in the region's history.";
  data.knowledge.sections[1].content = "Located in Provadia, Varna Province, the fortress is situated on a striking plateau. It is accessible by car and public transport, offering an unforgettable historical journey.";
  data.knowledge.sections[2].content = "The site features well-preserved ruins, a spectacular bridge, and walking paths. It is a popular destination for history enthusiasts and nature lovers.";
  data.knowledge.sections[3].content = "The fortress is maintained as an important cultural heritage site. The area is cared for to ensure preservation of history and safety for visitors.";

  // FAQ
  data.faq.items[0].question = "When is Fortress „Ovech“ open?";
  
  // Route
  data.route.steps[0] = "Enter Fortress „Ovech“";
  data.route.steps[1] = "Walk along the bridge";
  data.route.steps[2] = "Explore the ancient ruins";
  data.route.steps[3] = "Enjoy the panoramic views";
  data.route.steps[4] = "Take memorable photos";
  
  // Gallery
  data.gallery.subtitle = "The Beauty of Fortress „Ovech“";
  data.gallery.captions[0] = "Fortress view";
  data.gallery.captions[5] = "Fortress in spring";
  data.gallery.captions[10] = "Fortress in summer";
  data.gallery.captions[14] = "Fortress in autumn";
  data.gallery.captions[17] = "Fortress and surroundings";
  
  // Reviews
  data.reviews.items[0].text = "Wonderful fortress for walking. Lots of history and peaceful atmosphere.";
  data.reviews.items[5].text = "Great historical site. Ideal for visiting.";

  // Official Management
  data.officialManagement.title = "About Fortress „Ovech“";
  data.officialManagement.text = "Fortress „Ovech“ is maintained by the local authorities and cultural heritage organizations. It is an important part of Bulgaria's historical landmarks.";
  
  // Terms
  data.terms.sections[0].content = data.terms.sections[0].content.replace(/Geo Milev Park/g, 'Fortress „Ovech“');
  
  // Transport - Specific route instructions
  data.transport.fromCenterDesc = "Provadia is about 40-50 minutes drive from Varna center. You can take the A2 highway west towards Shumen and exit at Provadia.";
  data.transport.fromStationDesc = "There are regular trains and buses connecting Varna to Provadia.";
  data.transport.fromAirportDesc = "Varna Airport is about 40 minutes away by car or taxi. Follow A2 highway west.";
  data.transport.publicTransportDesc = "Train and bus services operate daily from Varna to Provadia. From the Provadia station, you can take a local taxi or walk to the fortress.";
});

// 2. Chinese Updates
updateJson(zhPath, (data) => {
  // Intro
  data.intro.title = "探索 Fortress „Ovech“";
  data.intro.description = "Fortress „Ovech“是位于瓦尔纳州普罗瓦迪亚（Provadia）的壮丽古迹地标。要塞享有令人惊叹的壮丽全景，带您深入了解保加利亚的中世纪历史。这里是游客探索、摄影和放松的最爱之地。";
  data.intro.alsoKnownAs.items[0] = "古老的石墙和遗迹";
  data.intro.alsoKnownAs.items[1] = "令人惊叹的全景";
  data.intro.alsoKnownAs.items[2] = "浓厚的历史氛围";

  // Knowledge
  data.knowledge.title = "关于 Fortress „Ovech“";
  data.knowledge.sections[0].content = "该要塞有着悠久的历史，可以追溯到拜占庭和中世纪保加利亚时期。它曾是一个重要的防御据点，在该地区的历史中发挥了关键作用。";
  data.knowledge.sections[1].content = "要塞位于瓦尔纳州普罗瓦迪亚，坐落在一个引人注目的高原上。可通过汽车和公共交通抵达，提供令人难忘的历史之旅。";
  data.knowledge.sections[2].content = "该遗址拥有保存完好的遗迹、一座壮观的桥梁和步行道。它是历史爱好者和自然爱好者的热门目的地。";
  data.knowledge.sections[3].content = "该要塞作为重要的文化遗产遗址得到维护。该地区受到精心照料，以确保历史的保护和游客的安全。";

  // FAQ
  data.faq.items[0].question = "Fortress „Ovech“ 什么时候开放？";
  
  // Route
  data.route.steps[0] = "进入 Fortress „Ovech“";
  data.route.steps[1] = "走过壮观的桥梁";
  data.route.steps[2] = "探索古老的遗迹";
  data.route.steps[3] = "欣赏令人惊叹的全景";
  data.route.steps[4] = "拍摄难忘的照片";

  // Gallery
  data.gallery.subtitle = "Fortress „Ovech“ 之美";
  data.gallery.captions[0] = "要塞景观";
  data.gallery.captions[5] = "春天的要塞";
  data.gallery.captions[10] = "夏天的要塞";
  data.gallery.captions[14] = "秋天的要塞";
  data.gallery.captions[17] = "要塞及周围环境";

  // Reviews
  data.reviews.items[0].text = "非常棒的要塞。有很多历史遗迹，氛围宁静。";
  data.reviews.items[5].text = "非常好的历史遗址。非常适合游览。";

  // Official Management
  data.officialManagement.title = "关于 Fortress „Ovech“";
  data.officialManagement.text = "Fortress „Ovech“ 由地方当局和文化遗产组织维护。它是保加利亚历史地标的重要组成部分。";

  // Terms
  data.terms.sections[0].content = data.terms.sections[0].content.replace(/格奥·米莱夫要塞/g, 'Fortress „Ovech“');
  
  // Transport - Specific route instructions
  data.transport.fromCenterDesc = "普罗瓦迪亚距瓦尔纳市中心约40-50分钟车程。您可以沿A2高速公路向西（舒门方向）行驶，并在普罗瓦迪亚出口下高速。";
  data.transport.fromStationDesc = "有定期火车和巴士连接瓦尔纳与普罗瓦迪亚。";
  data.transport.fromAirportDesc = "从瓦尔纳机场乘车或出租车约需40分钟。沿A2高速公路向西行驶即可。";
  data.transport.publicTransportDesc = "从瓦尔纳到普罗瓦迪亚每天都有火车和巴士服务。从普罗瓦迪亚车站，您可以乘坐当地出租车或步行前往要塞。";
});

console.log("Translations updated successfully.");
