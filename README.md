<h1 align="center">
  Test automation for testing a shopping cart process and a CRUD API verification
</h1>

<p align="left" style="font-size: 1.2rem; color: orange; font-weight: bold;">
  This framework is made up of the following tools
</p>

```
1. Cypress: Framework used to automate the actions in the browser as well as the API.
2. Mocha: Testing framework that provides a BDD/TDD and easy-to-read syntax. 
3. Node.js: The Runtime environment that allows packaging and manage the dependencies.
4. Allure: Report generator tool that allows generating HTML report of test results.
```

<div align="center">
  <h2><a href="https://docs.cypress.io/guides/getting-started/installing-cypress">
  Documentation about Cypress</a></h2> 
</div>
<hr />

<p align="left" style="font-size: 1.2rem; color: orange; font-weight: bold;"> Framework Structure </p>

##
The relevant framework files are included in the following folders.

1. fixtures and support: Contain libs and methods tha support the tests, along with page object model.
2. e2e: Contains the test files that encompases the scenarios to be executed, for frontend and backend.
3. video: Contains video evidence in case something fails.
4. test cases and defects report: sample about one of test case for BK and another for FE, along with sample about one defect found.
5. allure-report and allure-results: Contain the inputs and outputs about the test results.
> Note: video and allure folders are  generated after running the test.
##

<p align="left" style="font-size: 1.2rem; color: orange; font-weight: bold;"> Requirements to run the test </p>

Open a terminal console and make sure you are in the root path of the project, and run the command below to install dependencies.
   - `npm i`
   - `npm install -g allure-commandline --save-dev`
   - Make sure you have at least java 8 installed, it's required to generate the Allure report.
   

<p align="left" style="font-size: 1.2rem; color: orange; font-weight: bold;"> How to run the test </p>

- To run all the tests in headed mode (opening the web browser), so that run one after the other, with no pause, run
   - `npm test`
   
> Note about the option above: 
>   - After finishing running the test in the web browser, also it's necessary to wait for completion in the terminal console, until the HTML report opens automatically with the test results.
>   - Only this option generates HTML report. The rest only do it in the terminal console.

- To run the test by opening the Cypress UI and handle the test run at will, run
   - `npm run cy:open`

- To run the test in headless mode (without opening the web browser), run
   - `npm run cy:headless`

- To run only the UI test, run
   - `npm run ui`   

- To run only the API test, run
   - `npm run api`   

For further information about the author, please consult
[Victor Caminero LinkedIn profile](https://www.linkedin.com/in/victor-caminero/)
