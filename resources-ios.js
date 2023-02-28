const fs = require("fs")
const path = require("path")

var copyRecursiveSync = function(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {

        console.log("adicionado : " + src);

        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

fs.rm("ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png", () => {});

copyRecursiveSync('resources-ios/', 'ios/App/App/');