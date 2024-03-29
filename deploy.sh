DIST=meals-dist
BUILD=meals-build

echo "Cleaning up..."
rm -rf $DIST/
rm -rf $BUILD/

git clone git@github.com:pmerlo/meals-dist.git
rm -rf $DIST/frontend

git clone git@github.com:pmerlo/meals.git $BUILD/
cd $BUILD/frontend/
npm install
npm run clean
npm run dist
VERSION=$(<src/version/version.txt)
cp -r dist/frontend/ ../../$DIST/frontend

cd ../../$DIST/
git add .
git commit -m "push version $VERSION"
git push origin main

cd ..
ansible-playbook deploy.yml