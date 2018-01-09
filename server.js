const fs            = require('fs');
const crypto        = require('crypto');
const path          = require('path');
const { promisify } = require('util');
const express       = require('express');
const staticModule  = require('static-module');
const enforce       = require('express-sslify');
const csp           = require(`helmet-csp`)


function createHash(content) {
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 10);
}

const splitPoint = '<!-- Content -->';
const offline = fs.readFileSync(path.join(__dirname, '_site', 'offline.html'), 'utf-8');
const shell = fs.readFileSync(path.join(__dirname, '_site', 'shell.html'), 'utf-8');
const shellStart = shell.slice(0, shell.indexOf(splitPoint));
const shellEnd = shell.slice(shell.indexOf(splitPoint) + splitPoint.length);

const shellStartPath = `/assets/dist/static/shell-start-${createHash(shellStart)}.html`;
const shellEndPath = `/assets/dist/static/shell-end-${createHash(shellEnd)}.html`;
const offlinePath = `/offline-${createHash(offline)}.html`;

const app = express();
const port = (process.env.PORT || 8082);
const liveReloadPort = 9090;

const cspDirectives = {
  'frame-ancestors': ["'self'"],
  'default-src': ["'self'", 'https:'],
  'img-src': ["'self'", "www.google-analytics.com"],
  'script-src': ["'self'", "www.google-analytics.com", "'unsafe-inline'"],
  'style-src': ["'self'", "fonts.googleapis.com", "'unsafe-inline'"],
  'object-src': ["'none'"],
  'report-uri': '/report-violation'
};

if (process.env.NODE_ENV !== 'production') {
  app.use(require('connect-livereload')({
    port: liveReloadPort,
  }));
}

const router = express.Router();

router.use((req, res, next) => {
  res.set('Strict-Transport-Security', 'max-age=63072000');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Cache-Control', 'no-cache');
  next();
});

router.use('/assets/dist/static', (req, res, next) => {
  res.set('Cache-Control', 'max-age=31536000');
  next();
});

router.use('/assets/dist/images', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=14400');
  next();
});

router.get('/sw.js', async (req, res) => {
  const input = fs.createReadStream('sw.js');

  let assetsToCache = [
    offlinePath,
    shellStartPath,
    shellEndPath,
    "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700",
    "https://fonts.googleapis.com/css?family=Roboto+Mono",
  ];

  const hash = crypto.createHash('md5');
  
  const assetTypes = await promisify(fs.readdir)(path.resolve(__dirname, '_data', 'assets'));
  for (let assetType of assetTypes) {
    const map = JSON.parse(await 
      promisify(fs.readFile)
        (path.join(__dirname, '_data', 'assets', assetType), 'utf-8'));

    for (let asset of Object.values(map)) {
      assetsToCache.push(`assets/dist/static/${path.parse(assetType).name}/${asset}`)
    }
  }

  for (let asset of assetsToCache) {
    hash.update(asset);
  }    
  
  const digest = hash.digest('hex');

  res.set('Content-Type', 'application/javascript');  
  input.pipe(
    staticModule({
      'static-assets':  () => JSON.stringify(assetsToCache),
      'static-version': () => JSON.stringify(digest),
      'static-shell': () => JSON.stringify({
        shellStartPath,
        shellEndPath,
      }),
      'static-offline': () => JSON.stringify(offlinePath)
    })
  ).pipe(res);
});

router.get('/posts/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:title(*)/post/', (req, res) => {
  const dir = `_site/posts/${req.params.year}/${req.params.month}/${req.params.day}/${req.params.title}/`;
  const filepath = `${dir}post/index.html`;
  res.sendFile(filepath, {
    root: __dirname
  });
});

router.get(shellStartPath, (req, res) => {
  res.send(shellStart);
});

router.get(shellEndPath, (req, res) => {
  res.send(shellEnd);
});

router.get(offlinePath, (req, res) => {
  res.send(offline);
});

router.use(express.static('_site'));

if (process.env.NODE_ENV == 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  app.use(csp({
    directives: cspDirectives
  }));
}

app.use(router);

app.set('host', "0.0.0.0");

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});

