// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

class GoogleMeet {
    constructor(email, pass, head) {
        this.email = email;
        this.pass = pass;
        this.head = head;
        this.browser;
        this.page;
    }
    async schedule(url) {
        try {
            // Open browser
            this.browser = await puppeteer.launch({
                headless: this.head,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--use-fake-ui-for-media-stream',
                    '--disable-audio-output'
                ],
            });
            this.page = await this.browser.newPage()
            await this.page.goto('https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin')

            // Login Start
            await this.page.type("input#identifierId", this.email, {
                delay: 0
            })
            await this.page.click("div#identifierNext")

            await this.page.waitFor(7000)

            await this.page.type("input.whsOnd.zHQkBf", this.pass, {
                delay: 0
            })
            await this.page.click("div#passwordNext")

            await this.page.waitFor(5000)

            await this.page.goto(url)

            console.log("inside meet page")
            await this.page.waitFor(7000)
            await this.page.click("div.IYwVEf.HotEze.uB7U9e.nAZzG")
            await this.page.waitFor(1000)
            await this.page.click("div.IYwVEf.HotEze.nAZzG")
            await this.page.waitFor(1000)
            console.log('clicking on join')
            await this.page.click("span.NPEfkd.RveJvd.snByac")

            console.log("Successfully joined/Sent join request")
        }
        catch(err) {
            console.log(err)
        }
    }

    async end() {
        await this.browser.close();
    }
}

module.exports = GoogleMeet;

