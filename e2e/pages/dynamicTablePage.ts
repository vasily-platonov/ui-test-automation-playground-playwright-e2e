import { Page, Locator } from "@playwright/test";

export class DynamicTablePage {
  readonly page: Page;

  // Main elements
  readonly pageTitle: Locator;
  readonly table: Locator;
  readonly tableDescription: Locator;
  readonly chromeCpuLabel: Locator;

  // Table structure elements
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;
  readonly tableCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page elements
    this.pageTitle = page.locator("h3");
    this.table = page.locator('[role="table"]');
    this.tableDescription = page.locator("#table_desc");
    this.chromeCpuLabel = page.locator("p.bg-warning");

    // Table structure
    this.tableHeaders = page.locator('[role="columnheader"]');
    this.tableRows = page.locator('[role="rowgroup"]:last-child [role="row"]');
    this.tableCells = page.locator('[role="cell"]');
  }

  /**
   * Navigate to the Dynamic Table page
   */
  async goto() {
    await this.page.goto("/dynamictable");
  }

  /**
   * Get all column headers as an array of text values
   */
  async getColumnHeaders() {
    return await this.tableHeaders.allTextContents();
  }

  /**
   * Get all table data as a 2D array
   */
  async getTableData() {
    const rows = await this.tableRows.all();
    const tableData: string[][] = [];

    for (const row of rows) {
      const cells = await row.locator('[role="cell"]').all();
      const rowData: string[] = [];

      for (const cell of cells) {
        const cellText = await cell.textContent();
        rowData.push(cellText?.trim() || "");
      }

      tableData.push(rowData);
    }

    return tableData;
  }

  /**
   * Find a row by process name and return its data
   */
  async getRowByProcessName(processName: string) {
    const tableData = await this.getTableData();
    const headers = await this.getColumnHeaders();

    // Find the index of the "Name" column
    const nameColumnIndex = headers.findIndex((header) => header.toLowerCase().includes("name"));

    if (nameColumnIndex === -1) {
      throw new Error("Name column not found in table headers");
    }

    // Find the row with the matching process name
    const matchingRow = tableData.find((row) =>
      row[nameColumnIndex]?.toLowerCase().includes(processName.toLowerCase())
    );

    if (!matchingRow) {
      throw new Error(`Process "${processName}" not found in table`);
    }

    return matchingRow;
  }

  /**
   * Get CPU value for a specific process
   */
  async getCpuValueForProcess(processName: string) {
    const rowData = await this.getRowByProcessName(processName);
    const headers = await this.getColumnHeaders();

    // Find the index of the CPU column
    const cpuColumnIndex = headers.findIndex((header) => header.toLowerCase().includes("cpu"));

    if (cpuColumnIndex === -1) {
      throw new Error("CPU column not found in table headers");
    }

    return rowData[cpuColumnIndex] || "";
  }

  /**
   * Get the Chrome CPU value from the warning label
   */
  async getChromeCpuFromLabel() {
    const labelText = await this.chromeCpuLabel.textContent();
    // Extract the CPU value from "Chrome CPU: X.X%" format
    const match = labelText?.match(/Chrome CPU:\s*([\d.%]+)/);
    return match ? match[1] : "";
  }

  /**
   * Compare Chrome CPU values between table and label
   */
  async compareChromeCpuValues() {
    const tableCpuValue = await this.getCpuValueForProcess("Chrome");
    const labelCpuValue = await this.getChromeCpuFromLabel();

    return {
      tableValue: tableCpuValue,
      labelValue: labelCpuValue,
    };
  }

  /**
   * Get table description text
   */
  async getTableDescription() {
    return (await this.tableDescription.textContent()) || "";
  }

  /**
   * Get number of columns in the table
   */
  async getColumnCount() {
    return await this.tableHeaders.count();
  }

  /**
   * Get number of data rows in the table
   */
  async getRowCount() {
    return await this.tableRows.count();
  }

  /**
   * Wait for table to be loaded (useful for dynamic content)
   */
  async waitForTableToLoad() {
    await this.table.waitFor({ state: "visible" });
    await this.tableHeaders.first().waitFor({ state: "visible" });
    await this.tableCells.first().waitFor({ state: "visible" });
  }
}
