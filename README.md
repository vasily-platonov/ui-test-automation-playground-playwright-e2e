# ui-test-automation-playground

The purpose of this website is to provide a platform for sharpening UI test automation skills. Use it to practice with your test automation tool. Use it to learn test automation techniques.

## Live Version

Latest version of this website is always available at [uitestingplayground.com](http://uitestingplayground.com).

## Prerequisites
- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/get-npm)

## Usage

1. Clone the repository
2. In the package folder run
```bash
npm install
```
3. Launch with
```bash
node app.js
```
4. In a browser navigate to
```
http://localhost:3000
```

## E2E Test Automation

This repository includes a comprehensive **Playwright-based E2E test suite** that covers some UI automation challenges provided by the playground. The test suite implements best practices including the Page Object Model pattern and provides easy-to-use commands for test execution.

📖 **[Complete E2E Testing Documentation](e2e/README.md)**

### Quick Start for E2E Tests

```bash
# Navigate to e2e directory
cd e2e

# Install dependencies
make install

# Run all tests
make test

# Run core scenarios only  
make mainScenarioTest

# Run with visible browser (debugging)
make testHeaded
```

The E2E tests automatically start the UITAP application server, so you don't need to run it manually when testing.

## Software Stack
- [Node.js](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express/)
- [Pug](https://github.com/pugjs/pug)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [jQuery](https://github.com/jquery/jquery)

