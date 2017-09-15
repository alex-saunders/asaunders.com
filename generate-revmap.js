const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const staticModule = require('static-module');

let assets = {};

const filenames = fs.readdirSync(path.resolve(__dirname, '_data', 'assets'));
filenames.forEach(filename => {
  content = fs.readFileSync(path.join(__dirname, '_data', 'assets', filename), 'utf-8');
  assets[path.basename(filename, path.extname(filename))] = JSON.parse(content);
});

const hash = crypto.createHash('md5');
Object.keys(assets).forEach((assetType) => {
  Object.keys(assets[assetType]).forEach((asset) => {
    hash.update(assets[assetType][asset]);    
  })
});

const digest = hash.digest('hex');
const revmap = {
  version: digest,
  assets,
}

fs.writeFileSync(path.join(__dirname, '_data', 'revmap.json'), JSON.stringify(revmap), 'utf-8');