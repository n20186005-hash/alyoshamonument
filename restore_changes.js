const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, searchValue, replaceValue) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(searchValue)) {
    const updatedContent = content.split(searchValue).join(replaceValue);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

// 1. Update domain in files
const domainFiles = [
  'src/app/[locale]/layout.tsx',
  'src/app/[locale]/page.tsx',
  'src/app/[locale]/terms-of-service/page.tsx',
  'src/app/[locale]/privacy-policy/page.tsx',
  'src/app/[locale]/cookie-settings/page.tsx',
  'src/app/sitemap.ts',
  'src/app/robots.ts'
];
domainFiles.forEach(f => replaceInFile(path.join(__dirname, f), 'youthhillplovdiv.com', 'alyoshamonument.com'));

// 2. Re-apply previous component fixes
// Hero.tsx
replaceInFile(path.join(__dirname, 'src/components/Hero.tsx'), 
  `src="/gallery/youth-hill (1).jpg"\n          alt="Youth Hill"`, 
  `src="/gallery/monument-red-army-alyosha-plovdiv (1).jpg"\n          alt="Alyosha Monument"`);

// Header.tsx
replaceInFile(path.join(__dirname, 'src/components/Header.tsx'),
  `const t = useTranslations('header');\n  const [scrolled, setScrolled] = useState(false);`,
  `const t = useTranslations('header');\n  const tHero = useTranslations('hero');\n  const [scrolled, setScrolled] = useState(false);`);
replaceInFile(path.join(__dirname, 'src/components/Header.tsx'),
  `>Youth Hill</a>`,
  `>{tHero('title')}</a>`);
replaceInFile(path.join(__dirname, 'src/components/Header.tsx'),
  `>
          Youth Hill
        </a>`,
  `>
          {tHero('title')}
        </a>`);

// LanguageToggle.tsx
replaceInFile(path.join(__dirname, 'src/components/LanguageToggle.tsx'),
  `              onClick={() => {
                setOpen(false);
                // Hard navigation to ensure locale switches properly and preserves hash
                const hash = window.location.hash;
                const newPath = pathname === '/' ? \`/\${loc}\` : \`/\${loc}\${pathname}\`;
                window.location.href = newPath + hash;
              }}`,
  `              onClick={() => {
                setOpen(false);
                router.replace(pathname, { locale: loc });
              }}`);

// Gallery.tsx
const galleryOldStr = `const photos = [
  { src: '/gallery/youth-hill (1).jpg', alt: 'Youth Hill Photo 1' },
  { src: '/gallery/youth-hill (2).jpg', alt: 'Youth Hill Photo 2' },
  { src: '/gallery/youth-hill (3).jpg', alt: 'Youth Hill Photo 3' },
  { src: '/gallery/youth-hill (4).jpg', alt: 'Youth Hill Photo 4' },
  { src: '/gallery/youth-hill (5).jpg', alt: 'Youth Hill Photo 5' },
  { src: '/gallery/youth-hill (6).jpg', alt: 'Youth Hill Photo 6' },
  { src: '/gallery/youth-hill (7).jpg', alt: 'Youth Hill Photo 7' },
  { src: '/gallery/youth-hill (8).jpg', alt: 'Youth Hill Photo 8' },
  { src: '/gallery/youth-hill (9).jpg', alt: 'Youth Hill Photo 9' },
  { src: '/gallery/youth-hill (10).jpg', alt: 'Youth Hill Photo 10' },
  { src: '/gallery/youth-hill (11).jpg', alt: 'Youth Hill Photo 11' },
  { src: '/gallery/youth-hill (13).jpg', alt: 'Youth Hill Photo 12' },
  { src: '/gallery/youth-hill (14).jpg', alt: 'Youth Hill Photo 13' },
  { src: '/gallery/youth-hill (15).jpg', alt: 'Youth Hill Photo 14' },
  { src: '/gallery/youth-hill (17).jpg', alt: 'Youth Hill Photo 15' },
  { src: '/gallery/youth-hill (18).jpg', alt: 'Youth Hill Photo 16' },
  { src: '/gallery/youth-hill (19).jpg', alt: 'Youth Hill Photo 17' },
  { src: '/gallery/youth-hill (20).jpg', alt: 'Youth Hill Photo 18' },
  { src: '/gallery/youth-hill (21).jpg', alt: 'Youth Hill Photo 19' }
];`;
const galleryNewStr = `const photos = Array.from({ length: 14 }, (_, i) => ({
  src: \`/gallery/monument-red-army-alyosha-plovdiv (\${i + 1}).jpg\`,
  alt: \`Alyosha Monument Photo \${i + 1}\`
}));`;
replaceInFile(path.join(__dirname, 'src/components/Gallery.tsx'), galleryOldStr, galleryNewStr);

// MapEmbed.tsx
replaceInFile(path.join(__dirname, 'src/components/MapEmbed.tsx'),
  `src="https://maps.google.com/maps?q=Youth+Hill,+Plovdiv,+Bulgaria&output=embed"`,
  `src="https://maps.google.com/maps?q=Monument+of+the+Soviet+Army+Alyosha,+Plovdiv,+Bulgaria&output=embed"`);
replaceInFile(path.join(__dirname, 'src/components/MapEmbed.tsx'),
  `title="Google Maps - Youth Hill"`,
  `title="Google Maps - Alyosha Monument"`);

// TransportSection.tsx
replaceInFile(path.join(__dirname, 'src/components/TransportSection.tsx'),
  `href={\`https://www.google.com/maps/dir//\${encodeURIComponent('Youth Hill, Plovdiv, Bulgaria')}\`}`,
  `href={\`https://www.google.com/maps/dir//\${encodeURIComponent('Monument of the Soviet Army Alyosha, Plovdiv, Bulgaria')}\`}`);

// 3. Check for any other instances of 'youthhillplovdiv.com' in src
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
