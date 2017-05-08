# How to Run

### Requirements
  - [Node.js v7 or higher][node-install]
  - [`meteor` v1.4 or higher][meteor-install]
  - [MongoDB v3.4 or higher][mongodb-install]
  - [`fswatch` file watcher][fswatch-install]

### How to run

#### 1. FS monitor
First, start the file-system monitor using
[`fs-monitor/run.sh target_dir`][fswatch-run.js]. In our demo, we had it watch
`app/public/img/watch-this`.

#### MongoDB & Meteor
Start `mongod` and Meteor using [`app/run.sh`][app-run.sh].

#### API
Start the API using `node server.js` when within the `api` directory.


[app-run.sh]: https://github.com/royhowie/csc431/blob/master/app/run.sh
[fswatch-install]: https://github.com/emcrisostomo/fswatch#installation
[fswatch-run.js]: https://github.com/royhowie/csc431/blob/master/fs-monitor/run.js
[meteor-install]: https://www.meteor.com/install
[mongodb-install]: https://docs.mongodb.com/manual/installation/
[node-install]: https://nodejs.org/en/download/
