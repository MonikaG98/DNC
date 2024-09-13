const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DNCPage } = require('../pages/dncPage');
const { getNumberId } = require('../utils/numberHelper');
const { deleteNumberViaAPI } = require('../utils/apiHelpers');
const credentials = require('../fixtures/credentials.json');

test.describe('DNC Management Test', () => {
    test('should manage DNC numbers successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dncPage = new DNCPage(page);

        const numbers = [
            '8884568889', '8884568888', '8884568887', '8884568886',
            '8884568885', '8884568884', '8884568883', '8884568882',
            '8884568881', '8884568880'
        ];
      
        await loginPage.navigate();
        await loginPage.login(credentials.username, credentials.password);
        await page.getByRole('button', { name: 'Close' }).click();
        await loginPage.assertLoginSuccess();
        
        await dncPage.navigateToDNC();
        await dncPage.goToUploadDNC();

     
        for (const number of numbers) {
            await dncPage.addSingleNumber(number);
        }

        await dncPage.navigateToDNC();

        await dncPage.searchForNumbers('Campaign');
        for (const number of numbers) {
            await expect(page.locator(`text=${number}`)).toBeVisible();
        }
 
        await dncPage.editNumber('8884568881', '8884567777');
        await dncPage.navigateToDNC();
        await dncPage.searchAutomationCampaign('Campaign');
      
        await expect(page.locator('text=8884567777')).toBeVisible();
        
        for (const number of numbers) {
            const numberId = await getNumberId(page, number);  
            await deleteNumberViaAPI(page, numberId);  
        }
    });
});