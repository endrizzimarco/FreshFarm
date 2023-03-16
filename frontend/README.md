# FreshFarm

An app to enable farmers to offer produce directly to consumers.

## Prerequisites

Node package manager (npm) - [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Install the dependencies

Make sure to be in the project directory before running the following commands:

```bash
cd freshfarm
```

Then install the dependencies:

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

If you do not have the quasar-cli installed, run:

```bash
npm install -g @quasar/cli
```

Then run:

```bash
quasar dev
```

Note that you will need to create an `.env` file to run the app locally. Ask a team member for the contents of the file.

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
