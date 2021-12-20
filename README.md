## BULK-SMS-API

Bulk sms allocation backend using checker and maker Access layer Control System.

# Environment SetUp

- clone repository
- Configure your database configuration in the `config` folder on the root directory

`Important Notes`

- Please checkout the [config](https://github.com/lorenwest/node-config) library and configure application for your use case according to developement, production and test environment according to the keys specified on each of the environment.
- Checkout the API logger transports to remove either `firebase` or `mongodb` as the logger transport database or configure according to your preference but the app uses both now. you can check out [Winston](https://github.com/winstonjs/winston) for more information on how to do that.
- The app uses mailjet for sending of emails, please create a project in `mailjet` and make sure your public and private keys are set up on your environment variables.To create an account follow this link [Mailjet](https://github.com/winstonjs/winston)

**Installing Dependencies**

```bash
cd ./Bulk-SMS-API
yarn install
```

**Scripts**

```bash
yarn start:dev ## starts the local server in dev mode
yarn compile:tsc ## compile tyscript files to javascript
yarn doc ## generate html documentation for api
yarn test ## runs e2e and unit test together
yarn deploy ## deploys app to heroku.
yarn clean ## removes directory that are only needed for deployment
yarn build ## Generates deployment folders which will be used by heroku cli
yarn start ## starts the app in production mode.
yarn lint ## Run eslint
yarn lint:fix ## Run eslint fix
yarn prettier-format ## Runs prettier
yarn db:start:dev:win ## starts mongodb on windows machine
yarn db:start:dev:linux ## starts mongodb on linux machine
yarn start:dev:win ## Starts up mongodb, run dev server , run eslint, run tsc in watch mode, prettier in watch mode and apidoc in watch mode  on windows
yarn start:dev:linux ## Starts up mongodb, run dev server , run eslint, run tsc in watch mode, prettier in watch mode and apidoc in watch mode  on linux
yarn compile:tsc:watch ## starts typescript in watch mode
yarn prettier-watch ## starts prettier in watch mode
yarn doc:watch ## Runs api doc in watch mode

```
