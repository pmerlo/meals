rm -rf ../meals-dist/frontend
npm run clean
npm run build-prod
cp -r dist/frontend/ ../meals-dist/frontend
cd ../meals-dist/
git add .
git commit -m "build new version"
git push origin main
