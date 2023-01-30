const { exec } = require("child_process");
const fs = require("fs");

exec("git rev-parse --short HEAD", (err, stdout, stderr) => {
  const version = stdout.replace(/^\s+|\s+$/g, "");
  const content = `export const version = '${version}';`;

  fs.mkdir("src/version", function (err) {
    if (err) throw err;

    fs.writeFile("src/version/index.ts", content, function (err) {
      if (err) throw err;

      console.log(`Tagged build as '${version}'`);
    });
  });
});
