const { pipeline } = require("stream");
const validate = require("./src/validateArgs");
const myStreams = require('./src/streams')
const chalk = require('chalk');
const parseArguments = require("./src/parseArgs.js")

const argsObj = parseArguments()

validate(+argsObj.shift, argsObj.action);

const readStream = myStreams.readStreamFunc(argsObj.input)
const writeStream = myStreams.writeStreamFunc(argsObj.output)
const transformStream = myStreams.transformStreamFunc(+argsObj.shift, argsObj.action)

pipeline(
  readStream,
  transformStream,
  writeStream,
  (err) => {
    if (err) {
      console.error(chalk.red('Failed.'), err);
    } else {
      console.log(chalk.green('The program completed successfully!'))
    }
  }
)
