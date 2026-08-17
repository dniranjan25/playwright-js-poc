import { test, expect } from '@playwright/test';
 
const baseURL = 'https://testautomationpractice.blogspot.com/';
 
//Test Case 1: Verify Page Loads Successfully
test('Check the title of the page ', async( { page} ) => {
    await page.goto(baseURL);
    const actualTitle = 'Automation Testing Practice';
    await expect(page).toHaveTitle(actualTitle);
});
 
//Test Case 2: Fill All Fields and Select Gender + Days
test('Fill Data Entry Form', async({ page }) => {
    await page.goto(baseURL);
    //Filling the basic data
    await page.locator('#name').fill('Niranjan Das');
    await page.locator('#email').fill('niranjan@test.com');
    await page.locator('#phone').fill('9090989098900');
    await page.locator('#textarea').fill('Bengaluru , Karnatka');
 
    // Selecting the gender
    await page.locator('#male').check();
 
    // Select the specific day
    await page.locator('#sunday').check();
    await page.locator('#monday').check();
});
 
//Test Case 3: Verify Entered Name
test('verify the entered name', async({ page }) => {
    await page.goto(baseURL);
    await page.locator('#name').fill('Niranjan');
    await expect(page.locator('#name')).toHaveValue('Niranjan');
});
 
//Verify Gender Selection
test('Verify the Male Gender Selection', async( { page }) => {
    // Launch the base URL and select male Radio button
    await page.goto(baseURL);
    await page.locator('#male').check();
    //Ensure male radio option is selected and female option is not selected
    await expect(page.locator('#male')).toBeChecked();
    await expect(page.locator('#female')).not.toBeChecked();
});
//Test Case 5: Select Multiple Days
test('Select multiple days', async({page}) => {
    await page.goto(baseURL);
 
    await page.locator('#sunday').check();
    await page.locator('#wednesday').check();
    await page.locator('#friday').check();
 
    await expect(page.locator('#sunday')).toBeChecked();
    await expect(page.locator('#wednesday')).toBeChecked();
    await expect(page.locator('#friday')).toBeChecked();
 
});
 