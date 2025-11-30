import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const htmlFiles = glob.sync('dist/**/*.html');
const cssFiles = glob.sync('dist/**/*.css');

htmlFiles.forEach((file) => {
  let content = readFileSync(file, 'utf-8');
  content = content.replace(/href="\/css\//g, 'href="./css/');
  content = content.replace(/src="\/assets\//g, 'src="./assets/');
  content = content.replace(/src="\/images\//g, 'src="./images/');
  content = content.replace(/href="\/fonts\//g, 'href="./fonts/');
  writeFileSync(file, content);
});

cssFiles.forEach((file) => {
  let content = readFileSync(file, 'utf-8');
  content = content.replace(/url\(\/images\//g, 'url(../images/');
  content = content.replace(/url\("\/images\//g, 'url("../images/');
  content = content.replace(/url\('\/images\//g, "url('../images/");
  content = content.replace(/url\(\/fonts\//g, 'url(../fonts/');
  content = content.replace(/url\("\/fonts\//g, 'url("../fonts/');
  content = content.replace(/url\('\/fonts\//g, "url('../fonts/");
  writeFileSync(file, content);
});

console.log('✓ Paths fixed for HTML and CSS files');
