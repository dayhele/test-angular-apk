# Para gerar os arauivos de icone e splash do android

npm run resources

e no packpage.json:
"resources": "capacitor-resources -p android,ios && node resources.js"
