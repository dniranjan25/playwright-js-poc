import { test, expect } from '@playwright/test';
 
const baseURL = 'https://testautomationpractice.blogspot.com/';
 
//Test Case 1: Test to fill data for different webelements
test('Test to fill data for different webelements', async({ page }) => {
    await page.goto(baseURL);
    //Filling the basic data for Text fields like name, area, phone number, address
    await page.locator('#name').fill('Niranjan Das');
    await page.locator('#email').fill('niranjan@test.com');
    await page.locator('#phone').fill('9090989098900');
    await page.locator('#textarea').fill('Bengaluru , Karnatka');
 
    // Selecting the radio button like gender
    await page.locator('#male').check();
 
    // Select the checkbox like specific days
    await page.locator('#sunday').check();
    await page.locator('#monday').check();

    // Select single item in dropdown like Country
    await page.locator('#country').selectOption('India');

    // Select multiselect listbox/dropdown like colors and sanimals
    await page.locator('#colors').selectOption(['red', 'blue', 'green']);
    await page.locator('#animals').selectOption(['cat', 'dog', 'lion']);

    // Date Picker 1 (MM/DD/YYYY)
    await page.locator('#datepicker').fill('08/22/2026');

    // Date Picker 2 (Readonly Calendar)
    await page.locator('#txtDate').click();
    await page.locator('.ui-datepicker-month').selectOption('Aug');
    await page.locator('.ui-datepicker-year').selectOption('2026');
    await page.locator("//a[text()='22']").click();
    await expect(page.locator('#txtDate')).toHaveValue('22/08/2026');
    await page.waitForTimeout(10000);
    // Submit
    await page.locator("//button[normalize-space()='Submit']").nth(0).click();
    // await page.locator("//button[normalize-space()='Submit']").click();

    await page.waitForTimeout(3000);
});
 
