# UI Test Automation Playground E2E Tests - Makefile
# Simplifies Playwright test execution with various options and filters

.PHONY: help test mainScenarioTest testDebug createSnapshots testHeaded \
		ajaxTest dynamicTableTest overlappedTest progressBarTest \
		sampleAppTest textInputTest visibilityTest homepageTest \
		testReport openReport clean install updateSnapshots \
		testParallel testSlow testCI

# Default target - show help
help:
	@echo "UI Test Automation Playground E2E Tests - Available Commands:"
	@echo ""
	@echo "Core Test Commands:"
	@echo "  make test              - Run all tests"
	@echo "  make mainScenarioTest  - Run tests with @mainScenario tag"
	@echo "  make testDebug         - Run tests in debug mode"
	@echo "  make createSnapshots   - Run tests with @snapshot tag and update snapshots"
	@echo "  make testHeaded        - Run tests in headed browsers (visible)"
	@echo ""
	@echo "Component-Specific Tests:"
	@echo "  make ajaxTest          - Run AJAX tests (@ajax tag)"
	@echo "  make dynamicTableTest  - Run Dynamic Table tests (@dynamictable tag)"
	@echo "  make overlappedTest    - Run Overlapped Element tests (@overlapped tag)"
	@echo "  make progressBarTest   - Run Progress Bar tests (@progressbar tag)"
	@echo "  make sampleAppTest     - Run Sample App tests (@sampleapp tag)"
	@echo "  make textInputTest     - Run Text Input tests (@textinput tag)"
	@echo "  make visibilityTest    - Run Visibility tests (@visibility tag)"
	@echo "  make homepageTest      - Run Homepage tests (@homepage tag)"
	@echo ""
	@echo "Advanced Options:"
	@echo "  make testParallel      - Run tests with maximum parallelism"
	@echo "  make testSlow          - Run tests slowly (good for debugging)"
	@echo "  make testCI            - Run tests with CI settings (retries enabled)"
	@echo ""
	@echo "Reporting & Utilities:"
	@echo "  make openReport        - Open existing HTML report"
	@echo "  make clean             - Clean test results and reports"
	@echo "  make install           - Install dependencies"
	@echo ""
	@echo "Examples:"
	@echo "  make mainScenarioTest  # Run only core UITAP scenarios"
	@echo "  make createSnapshots   # Update visual regression baselines"
	@echo "  make testHeaded        # Watch tests run in real browser"
	@echo "  make ajaxTest          # Test only AJAX functionality"

# Core test commands
test:
	@echo "🚀 Running all E2E tests..."
	npx playwright test

mainScenarioTest:
	@echo "🎯 Running main scenario tests (@mainScenario)..."
	npx playwright test --grep "@mainScenario"

testDebug:
	@echo "🐛 Running tests in debug mode..."
	npx playwright test --debug

createSnapshots:
	@echo "📸 Running snapshot tests and updating baselines..."
	npx playwright test --grep "@snapshot" --update-snapshots

testHeaded:
	@echo "👁️ Running tests in headed mode (visible browsers)..."
	npx playwright test --headed

# Component-specific test commands
ajaxTest:
	@echo "🔄 Running AJAX tests..."
	npx playwright test --grep "@ajax"

dynamicTableTest:
	@echo "📊 Running Dynamic Table tests..."
	npx playwright test --grep "@dynamictable"

overlappedTest:
	@echo "🔀 Running Overlapped Element tests..."
	npx playwright test --grep "@overlapped"

progressBarTest:
	@echo "📈 Running Progress Bar tests..."
	npx playwright test --grep "@progressbar"

sampleAppTest:
	@echo "🔐 Running Sample App (Authentication) tests..."
	npx playwright test --grep "@sampleapp"

textInputTest:
	@echo "⌨️ Running Text Input tests..."
	npx playwright test --grep "@textinput"

visibilityTest:
	@echo "👻 Running Visibility tests..."
	npx playwright test --grep "@visibility"

homepageTest:
	@echo "🏠 Running Homepage tests..."
	npx playwright test --grep "@homepage"

# Advanced test options
testParallel:
	@echo "⚡ Running tests with maximum parallelism..."
	npx playwright test --workers=100%

testSlow:
	@echo "🐌 Running tests slowly for better debugging..."
	npx playwright test --workers=1 --timeout=60000

testCI:
	@echo "🏗️ Running tests with CI configuration..."
	npx playwright test --reporter=html --retries=2

# Reporting and utilities
testReport:
	@echo "📋 Generating and opening HTML test report..."
	npx playwright test --reporter=html && npx playwright show-report

openReport:
	@echo "📖 Opening existing HTML test report..."
	npx playwright show-report

clean:
	@echo "🧹 Cleaning test results and reports..."
	rm -rf test-results/ playwright-report/
	@echo "✅ Cleaned test artifacts"

install:
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✅ Dependencies installed"

# Performance and validation commands
validateSetup:
	@echo "🔍 Validating test setup..."
	npx playwright --version
	@echo "Node.js version: $$(node --version)"
	@echo "NPM version: $$(npm --version)"
	@if [ -f "package.json" ]; then echo "✅ package.json found"; fi
	@if [ -f "playwright.config.ts" ]; then echo "✅ playwright.config.ts found"; fi
	@echo "✅ Setup validation completed"

# Show test statistics
stats:
	@echo "📊 Test Suite Statistics:"
	@echo "Total test files: $$(find tests -name '*.spec.ts' | wc -l)"
	@echo "Total tests with @mainScenario: $$(grep -r '@mainScenario' tests/ | wc -l)"
	@echo "Total snapshot tests: $$(grep -r '@snapshot' tests/ | wc -l)"
	@echo "Component test files:"
	@echo "  - AJAX: $$(ls tests/ajax.spec.ts 2>/dev/null && echo '✅' || echo '❌')"
	@echo "  - Dynamic Table: $$(ls tests/dynamicTable.spec.ts 2>/dev/null && echo '✅' || echo '❌')"
	@echo "  - Overlapped: $$(ls tests/overlapped.spec.ts 2>/dev/null && echo '✅' || echo '❌')"
	@echo "  - Progress Bar: $$(ls tests/progressBar.spec.ts 2>/dev/null && echo '✅' || echo '❌')"
	@echo "  - Sample App: $$(ls tests/sampleApp.spec.ts 2>/dev/null && echo '✅' || echo '❌')"
	@echo "  - Text Input: $$(ls tests/textInput.spec.ts 2>/dev/null && echo '✅' || echo '❌')"
	@echo "  - Visibility: $$(ls tests/visibility.spec.ts 2>/dev/null && echo '✅' || echo '❌')"
	@echo "  - Homepage: $$(ls tests/base.spec.ts 2>/dev/null && echo '✅' || echo '❌')"
