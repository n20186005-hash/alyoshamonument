const fs = require('fs');
const path = require('path');

const zhJsonPath = path.join(__dirname, 'src', 'messages', 'zh.json');
let zhContent = fs.readFileSync(zhJsonPath, 'utf8');

// Fix spacing around 布纳吉卡
zhContent = zhContent.replace(/与 布纳吉卡/g, '与布纳吉卡');
zhContent = zhContent.replace(/的 布纳吉卡/g, '的布纳吉卡');
zhContent = zhContent.replace(/布纳吉卡 公园/g, '布纳吉卡公园');
zhContent = zhContent.replace(/布纳吉卡山/g, '布纳吉卡山');

// Let's also check for any 'Alyosha' that isn't inside brackets.
// Actually, it's mostly inside "阿廖沙"

fs.writeFileSync(zhJsonPath, zhContent, 'utf8');
console.log('Cleaned up zh.json spacing');
