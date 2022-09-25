# No Redux Create React App template

**Create React App** template with Redux features done using React library tools. I was not happy about recent version of official `react-redux`, so decided to make my own.

## Usage

```shell script
npx create-react-app %PROJECT_NAME% --template no-redux
``` 
Or
```shell script
yarn create react-app %PROJECT_NAME% --template no-redux
```

Then

```shell script
cd %PROJECT_NAME%
yarn start
```

## Features

- Unidirectional state management with `React.Context` and `useReducer`.
- Store middleware (thunks, Promises etc) support.
- Store enhancers support.
- Redux devtools support.
- Feature architecture.
