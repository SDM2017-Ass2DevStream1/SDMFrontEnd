require('babel-core/register')({
  presets: ['env'],
  plugins: ['transform-runtime'],
});

const _ = require('lodash');
const kit = require('nokit');
const http = require('http');
const chalk = require('chalk');
const express = require('express');
const compression = require('compression');
const { argv } = require('yargs');


class Server {
  constructor(options) {
    const opts = _.extend({
      port: 3000,
      ip: '0.0.0.0',
    }, options);
    this.port = opts.port;
    this.ip = opts.ip;

    this.initApp();
    this.initServer();
  }

  initApp() {
    const app = express();

    app.disable('x-powered-by');
    app.set('views', `${__dirname}/views`);
    app.set('view engine', 'ejs');

    // compresses the content in gzip
    app.use(compression());
    app.use('/static', express.static(`${__dirname}/../dist`));
    app.use(express.static(`${__dirname}/../dist/pages`));

    this.app = app;
  }

  initServer() {
    const { port, ip } = this;
    const server = http.createServer(this.app);
    this.server = server.listen(port, ip, () => {
      kit.log(`App is running in ${chalk.blue(process.env.NODE_ENV)} environment. Please visit: http://${ip}:${port}`);
    });
  }

  close() {
    this.server.close();
    kit.log(chalk.blue('>> Server closed.'));
  }
}

module.export = new Server(argv);
