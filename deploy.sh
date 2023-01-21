DIST=meals-dist

rm -rf $DIST/
git clone git@github.com:pmerlo/meals-dist.git
rm -rf $DIST/frontend

cd frontend/
npm install
npm run clean
npm run build-prod
cp -r dist/frontend/ ../$DIST/frontend

cd ../$DIST/
git add .
git commit -m "build new version"
git push origin main

cd ..
ansible-playbook deploy.yml