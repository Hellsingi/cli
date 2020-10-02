const exitProcess = require("./exitProcess.js");
const myArgs = process.argv.slice(2);
const argsTypes = ["-i --input", "-a --action", "-s --shift", "-o --output"];
const map = new Map();
const argsObj = {};

function parseArguments() {


  for (let i = 0; i < myArgs.length; i++) {
    if (i % 2 === 0) {
      const findIndexArg = argsTypes.findIndex(type => {
        const splittedType = type.split(" ");

        if (myArgs[i] === splittedType[0] || myArgs[i] === splittedType[1]) {
          return true;
        } else {
          return false;
        }
      });

      const foundType = argsTypes[findIndexArg];

      if (findIndexArg !== -1) {
        if (!map.has(foundType)) {
          map.set(foundType, myArgs[i + 1]);
        } else exitProcess(`You re-entered the option => "${foundType}"`, 1)
      }
    }
  }

  map.forEach(function(value, key) {
    const splittedKey = key.split(" ")[1];
    const slicedKey = splittedKey.slice(2);

    argsObj[slicedKey] = value;
  });

  return argsObj;
}

module.exports = parseArguments;
