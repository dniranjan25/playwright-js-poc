import { test, expect } from '@playwright/test';
 
const baseURL = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login';
 
//Test Case 1: Test to fill data for different webelements
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

    // Select customer, set currency.
    const customerDropdown = page.locator('#userSelect');
    await customerDropdown.selectOption('Niranjan Das');
    const currencyDropdown = page.locator('#currency');
    await currencyDropdown.selectOption('Dollar');

    // Process the data. The following alert handling code is not necessary here as we have already defined previously.
    // page.on('dialog', async dialog => {
    //     console.log(dialog.message());
    //     await dialog.accept();
    // });
    await page.getByRole('button', { name: 'Process' }).click();
    await page.waitForTimeout(5000);
    // Open Customer Tab and verify the generated account exist.
    await page.getByRole('button', { name: 'Customers' }).click();
    page.getByRole('row').filter({
        hasText: 'Niranjan Das'
    });

})