# UI Test Automation Playground - E2E Tests

This directory contains comprehensive end-to-end (E2E) tests for the UI Test Automation Playground application using **Playwright** with **TypeScript**. The test suite implements the **Page Object Model (POM)** pattern and covers some major UI automation challenges provided by the playground.

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Test Organization](#-test-organization)
- [Configuration](#-configuration)

## 🚀 Quick Start

```bash
# Navigate to e2e directory
cd e2e

# Install dependencies (both e2e and main app)
make install

# Run all tests
make test

# Run core scenarios only
make mainScenarioTest

# Run tests with visible browser (great for debugging)
make testHeaded
```

## 📦 Prerequisites

### Required Software

| Platform | Requirements |
|----------|-------------|
| **All Platforms** | Node.js (16.0+), npm (8.0+) |
| **Windows** | PowerShell 5.1+ or Command Prompt, Visual Studio Build Tools (for native modules) |
| **macOS** | Terminal |
| **Linux** | build-essential: `sudo apt-get install build-essential` (Ubuntu/Debian) |

### Browser Requirements
Playwright will automatically download and manage browser binaries (Chromium, Firefox, WebKit) during installation.

## 🔧 Installation

### Manual Installation

```bash
# 1. Install main application dependencies (required for local server)
cd /path/to/ui-test-automation-playground
npm install

# 2. Install e2e test dependencies
cd e2e
npm install

# 3. Install Playwright browsers
npx playwright install
```



## 🏃‍♂️ Running Tests

### Using Make Commands (Recommended)

The project includes a comprehensive `Makefile` that simplifies test execution. Use `make help` to see the full list of available commands.

Basic test execution:
```bash
make test                    # Run all tests
make mainScenarioTest       # Run core UITAP scenarios (@mainScenario tag)
make testHeaded             # Run with visible browsers (debugging)
make testDebug              # Run with debug mode and breakpoints
```

### Using Playwright CLI Directly

Basic execution:
```bash
npx playwright test                          # Run all tests
npx playwright test --headed                 # Run with visible browsers
npx playwright test --debug                  # Debug mode with breakpoints

# Tag-based execution
npx playwright test --grep "@mainScenario"   # Run core scenarios
npx playwright test --grep "@ajax"           # Run AJAX tests
npx playwright test --grep "@visibility"     # Run visibility tests
```



## 📁 Test Organization

### Test Files Structure
```
e2e/
├── tests/                          # Test specifications
│   ├── ajax.spec.ts               # AJAX functionality tests
│   ├── base.spec.ts               # Homepage navigation tests  
│   ├── dynamicTable.spec.ts       # Dynamic table tests
│   ├── overlapped.spec.ts         # Overlapped element tests
│   ├── progressBar.spec.ts        # Progress bar timing tests
│   ├── sampleApp.spec.ts          # Authentication tests
│   ├── textInput.spec.ts          # Text input tests
│   └── visibility.spec.ts         # Element visibility tests
├── pages/                          # Page Object Model implementations
│   ├── ajaxPage.ts                # AJAX page object
│   ├── dynamicTablePage.ts        # Dynamic table page object
│   ├── homePage.ts                # Homepage page object
│   ├── overlappedPage.ts          # Overlapped elements page object
│   ├── progressBarPage.ts         # Progress bar page object
│   ├── sampleAppPage.ts           # Sample app page object
│   ├── textInputPage.ts           # Text input page object
│   └── visibilityPage.ts          # Visibility page object
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Dependencies and scripts
├── Makefile                       # Simplified test execution
└── README.md                      # This file
```

### Test Tags
Tests are organized using tags for easy filtering:

- **@mainScenario** - Core UITAP challenges (21 tests)
- **@snapshot** - Visual regression tests (4 tests)
- **@ajax** - AJAX functionality tests
- **@dynamictable** - Dynamic table data extraction tests
- **@overlapped** - Overlapped element interaction tests
- **@progressbar** - Progress bar timing tests
- **@sampleapp** - Authentication workflow tests
- **@textinput** - Text input and DOM event tests
- **@visibility** - Element visibility mechanism tests
- **@homepage** - Homepage navigation tests

### Main Scenarios Coverage (21 tests)
The `@mainScenario` tag identifies core UI automation challenges:

1. **AJAX Challenge** - Dynamic content loading and timing
2. **Dynamic Table** - Data extraction from complex table structures  
3. **Overlapped Elements** - Handling UI element interference
4. **Progress Bar** - Precision timing and progress monitoring (2 scenarios)
5. **Authentication** - Login success/failure workflows (2 scenarios)
6. **Text Input** - DOM events vs real user input (3 scenarios)
7. **Visibility** - Element visibility and hiding mechanisms (12 scenarios)



## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the e2e directory, just copy the contents of `.env.example`. Or copy this template:

```env
# Base URL for the application under test
BASE_URL=

```

### Playwright Configuration
The `playwright.config.ts` file includes important settings:

#### Automatic Local Server
The configuration includes a `webServer` setting that **automatically starts the UITAP application** when tests run:

```typescript
webServer: {
  command: "cd ../ && node app.js",        // Starts UITAP server
  url: "http://localhost:3000",            // Test target URL
  reuseExistingServer: !process.env.CI,    // Reuse server in local development
}
```

This means:
- **No manual server startup required** - Playwright automatically starts the UITAP application
- **Dependency installation required** - Main application dependencies must be installed (`npm install` in root directory)
- **Automatic cleanup** - Server is stopped when tests complete

#### Key Configuration Options
- **Base URL**: `http://localhost:3000` (configurable via BASE_URL env var)
- **Browser**: Chromium (Desktop Chrome configuration)
- **Parallel Execution**: Fully parallel for faster execution
- **Retries**: 2 retries on CI, 0 locally for faster development
- **Reporter**: HTML reports with detailed test results
- **Tracing**: Enabled on first retry for debugging failed tests

### Browser Configuration
Tests run on:
- **Primary**: Chromium (Desktop Chrome)
- **Additional** (commented): Mobile Chrome, Mobile Safari, Microsoft Edge, Google Chrome

Uncomment additional browsers in `playwright.config.ts` if cross-browser testing is needed.



---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [UI Testing Playground](http://uitestingplayground.com)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Playwright Test Tags](https://playwright.dev/docs/test-annotations#tag-tests)

## 🤝 Contributing

When adding new tests:
1. Follow the existing Page Object Model pattern
2. Add appropriate tags (@mainScenario for core challenges)
3. Update this README if adding new components
4. Add make commands for new test categories
5. Ensure cross-platform compatibility

For questions or issues, please refer to the project documentation or create an issue in the repository.
