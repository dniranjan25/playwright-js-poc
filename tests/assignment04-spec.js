import { test, expect } from '@playwright/test';
 
const baseURL = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login';
 
test('Verify Financial Transaction', async({ page }) => {
    // Launch / navigate to URL
    await page.goto(baseURL);
    
    // Bank Manager Login
    await page.getByRole('button', { name: 'Bank Manager Login' }).click();

    // Open Add Customer Tab
    await page.getByRole('button', { name: 'Add Customer' }).click();

    // Enter Customer Data
    await page.getByRole('textbox', { name: 'First Name' }).fill('Niranjan');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Das');
    await page.getByRole('textbox', { name: 'Post Code' }).fill('E1 6RF');
    // Add customer to Open Account
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });
    await page.locator('button[type="submit"]').click();

    // Open Customer Tab
    await page.getByRole('button', { name: 'Open Account' }).click();

    // Select customer, set currency and process the data.
    const customerDropdown = page.locator('#userSelect');
    await customerDropdown.selectOption({label: 'Niranjan Das'});
    const currencyDropdown = page.locator('#currency');
    await currencyDropdown.selectOption('Dollar');
    await page.getByRole('button', { name: 'Process' }).click();

    // Open Customer Tab and verify the generated account exist.
    await page.getByRole('button', { name: 'Customers' }).click();
    page.getByRole('row').filter({
        hasText: 'Niranjan Das'
    });

    // Click Home and select Customer Login
    await page.getByRole('button', { name: 'Home' }).click();
    await page.getByRole('button', { name: 'Customer Login' }).click();

    // Select customer account created and Login
    const customerNameDropdown = page.locator('#userSelect');
    await customerNameDropdown.selectOption({label: 'Niranjan Das'});
    await page.getByRole('button', { name: 'Login' }).click();

    // Initial Balance check
    const balanceLocator = page.locator('div.center strong.ng-binding').nth(1);
    await expect(balanceLocator).toHaveText('0');

    // Perform Deposit and verify 
    await page.getByRole('button', { name: 'Deposit' }).click();
    await page.locator('input[placeholder="amount"]').fill('5000');
    await page.getByRole('button', { name: 'Deposit' }).click();
    await expect(
      page.getByText('Deposit Successful')
    ).toBeVisible();
    await expect(balanceLocator).toHaveText('5000');

    // Perform Withdraw and verify
    await page.getByRole('button', { name: 'Withdrawl' }).click();
    await page.locator('input[placeholder="amount"]').fill('2000');
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await expect(
      page.getByText('Transaction successful')
    ).toBeVisible();
    await expect(balanceLocator).toHaveText('3000');

    // Go to Transactions and verify both transactions
    await page.getByRole('button', { name: 'Transactions' }).click();
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(2);
 
    // Deposit Transaction
    await expect(rows.nth(0)).toContainText('5000');
    await expect(rows.nth(0)).toContainText('Credit');
 
    // Withdrawal Transaction
    await expect(rows.nth(1)).toContainText('2000');
    await expect(rows.nth(1)).toContainText('Debit');
})