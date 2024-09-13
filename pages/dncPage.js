class DNCPage {
    constructor(page) {
        this.page = page;
        this.callCenterMenu = '#main-navbar-collapse > ul > li:nth-child(2) > a > span'; 
        this.dncSection = '#main-navbar-collapse > ul > li.dropdown.open > ul > li:nth-child(7) > a'; 
        this.uploadDncButton = '#content-wrapper > div > div > div > div > div.page-header.ng-scope > div:nth-child(2) > a'; 
        this.addNumberInput = '#number'; 
        this.campaignDropdown = '#AdminDncUploadingController > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(8) > select'; 
       this.campaignDropdownDNC= '#AdminDncManageController > div.panel-body > table > tbody.no-border.ng-scope > tr > td:nth-child(2) > select';
       this.selectCampaign= 'div.selectize-input.items.not-full.has-options.ng-valid.ng-dirty > input[type=text]';
       this.selectCampaignAtEditDNC='#AdminDncEditController > div > div.panel-body > div:nth-child(3) > div > select';
       this.countryCode= '#AdminDncUploadingController > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(6) > select#AdminDncUploadingController > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(6) > select'
        this.addButton = '[ng-click="addNumber()"]'; 
        this.searchButton = `[ng-click="search('')"]`; 
    }

    async navigateToDNC() {
        await this.page.click(this.callCenterMenu);
        await this.page.click(this.dncSection);
    }

    async goToUploadDNC() {
        await this.page.click(this.uploadDncButton, { force: true });
        await this.page.waitForURL('**/dnc/upload');
    }

    async addSingleNumber(number) {
        await this.page.fill(this.addNumberInput, `+1${number}`);
        await this.page.selectOption(this.campaignDropdown, 'Global DNC List');
        await this.page.selectOption(this.countryCode, '+1 United States');
        await this.page.click(this.addButton);
    }

    async searchForNumbers(campaign) {
        await this.page.selectOption(this.campaignDropdownDNC, campaign);
        await this.page.selectOption(this.selectCampaign, 'Global DNC');
        await this.page.click(this.searchButton);
    }

    async searchAutomationCampaign(campaign) {
        await this.page.selectOption(this.campaignDropdownDNC, campaign);
        await this.page.selectOption(this.selectCampaign, 'Automation Campaign');
        await this.page.click(this.searchButton);
    }

    async editNumber(oldNumber, newNumber) {
        const settingButton = await this.page.locator(`text=${oldNumber}`).locator('.text-right [data-toggle="dropdown"]'); 
        await settingButton.click();
        const editButton = await this.page.locator('a[href="/dnc/18429/edit"]'); 
        await editButton.click();
        await this.page.fill('input[type="text"]', newNumber); 
        await this.page.selectOption(this.selectCampaignAtEditDNC, 'Automation Campaign');
        await this.page.click('button[type="submit"]'); 
    }
}

module.exports = { DNCPage };
