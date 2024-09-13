class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '[id="username"]';
        this.passwordInput = '[id="password"]';
        this.submitButton = 'input[type="submit"]';
    }

    async navigate() {
        await this.page.goto('https://admin-dt.convoso.com');
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.submitButton);
    }

    async assertLoginSuccess() {
        await this.page.waitForURL('**/dashboard#/Index');
    }
}
module.exports = { LoginPage };
