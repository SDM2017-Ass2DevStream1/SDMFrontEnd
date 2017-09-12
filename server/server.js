require('babel-core/register')({
  presets: ['es2015', 'stage-0'],
  plugins: ['transform-runtime', 'syntax-object-rest-spread'],
});

const _ = require('lodash');
const kit = require('nokit');
const http = require('http');
const chalk = require('chalk');
const express = require('express');
const compression = require('compression');
const bodyPaser = require('body-parser');
const { argv } = require('yargs');

const cfg = require('./config');
const routes = require('./routes');


class Server {
  constructor(options) {
    const opts = _.extend({
      port: cfg.port,
      ip: cfg.ip,
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
    app.use(bodyPaser());
    app.use('/static', express.static(`${__dirname}/../dist`));
    app.use(express.static(`${__dirname}/../dist/pages`));
    app.use(routes);

    this.app = app;
  }

  initServer() {
    const { port, ip } = this;
    const server = http.createServer(this.app);

    this.server = server.listen(port, ip, () => {
      kit.log(`App is running in ${chalk.blue(process.env.NODE_ENV)} environment. Please visit: http://${ip}:${port}`);
    });

    // https://github.com/remy/nodemon#controlling-shutdown-of-your-script
    process.once('SIGUSR2', () => {
      this.close();
      process.kill(process.pid, 'SIGUSR2');
    });
  }

  close() {
    this.server.close();
    kit.log(chalk.blue('>> Server closed.'));
  }
}

module.export = new Server(argv);
