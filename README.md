# FreshFarm

This repository contains the source code for FreshFarm, a web application that allows farmers to connect and sell their produce directly to consumers.

The application is split into two main components: a frontend web application built using Vue.js and Quasar, and a backend serverless application built using Azure Functions in C#, JavaScript, and Python.

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository to your local machine using the command:

```shell
git clone https://github.com/endrizzimarco/FreshFarm.git
```

2. Navigate to the `frontend` directory and install the required dependencies by running:

```shell
npm install
```

3. Install the Quasar CLI if not already installed by running:

```shell
 npm install -g @quasar/cli
```

4. Start the frontend web application by running:

```shell
quasar dev
```

6. Open a web browser and navigate to http://localhost:9000 to view the application.

:warning: The application requires a `.env` file (containing the secret API keys) to run locally. Ask a team member for the contents of the file. :warning:

## Local development and testing

For more information about testing and local development, refer to the [frontend README](frontend/README.md) file.

## Serverless Backend

To develop with the serverless backend function, you will need the [Azure extensions](https://code.visualstudio.com/docs/azure/extensions) for VSCode.
This will allow you to run and debug the functions locally. Ask a team member for the _azure subscription key_ in order to have access to the Azure resources.

## Contributing

To contribute to this project, please follow these steps:

1. Fork this repository to your own GitHub account.

2. Create a new branch with a descriptive name for your changes:

```shell
git checkout -b my-new-feature
```

3. Make your changes and commit them with a descriptive message using the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format:

```shell
git commit -m "feat: Added new feature"
```

4. Push your changes to your forked repository:

```shell
git push origin my-new-feature
```

5. Open a pull request from your forked repository to this repository, and describe your changes in detail. A member of the team will review your changes and merge them into the `master` branch if they are approved and pass the CI/CD pipeline tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
