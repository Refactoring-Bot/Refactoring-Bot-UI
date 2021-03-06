# Refactoring-Bot Management UI

[![Build Status](https://travis-ci.org/Refactoring-Bot/Refactoring-Bot-UI.svg?branch=master)](https://travis-ci.org/Refactoring-Bot/Refactoring-Bot-UI)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Refactoring-Bot_Refactoring-Bot-UI&metric=alert_status)](https://sonarcloud.io/dashboard?id=Refactoring-Bot_Refactoring-Bot-UI)

A web frontend to conveniently configure and manage the [Refactoring-Bot](https://github.com/Refactoring-Bot/Refactoring-Bot).

## Structure

-   `src/app.ts`: main file of the app that loads and configures all dependencies and kickstarts the parent Vue component
-   `src/App.vue`: parent Vue component with basic app skeleton with header/nav, body, and footer
-   `src/routes.ts`: configuration of routes (`route`: binding a `component` to a certain `path`)
-   `src/views/`: directory for all Vues; should be structured according to domain concepts
-   `src/common/`: directory for shared functionality that is not specific to a certain Vue or domain concept
-   `src/config/index.ts`: configuration file with app or environment specific properties
-   `test/`: directory for all tests

## Developer Usage Instructions
Per default, the UI expects the [Refactoring-Bot API](https://github.com/Refactoring-Bot/Refactoring-Bot) to run on <http://localhost:8808> (changeable in `src/config/index.ts` --> `apiEndpoint`).

```bash
# install dependencies
npm install

# serve locally with hot reload (localhost:9000, adjustable in webpack.dev.config.js)
npm start

# build for production with minification
npm run build

# run TypeScript linter
npm run lint

# run tests and create coverage reports
npm test

# run SonarQube analysis (configure sonar-project.properties first or pass parameters to choose the SonarQube instance)
npm run sonar
```
**Docker Support:** Please refer to our [Docker Repository](https://github.com/Refactoring-Bot/Docker) for detailed usage instructions with `docker` or `docker-compose`.

## Useful VSCode Extensions

-   Vetur (helps with Vue SFCs)
-   TSLint (enforces coding rules in `tslint.json`)
-   Prettier (formats Vue files)
-   EditorConfig (enforces code formatting in `.editorconfig`)
