import {Browser, Page, launch as BrowserBuilder} from "puppeteer";
import * as Chromium from 'chrome-aws-lambda';

export default abstract class PuppetTest {
    private browser ?: Browser;
    protected page ?: Page;

    protected abstract async setup(event : object) : Promise<void>;

    protected abstract async teardown(event : object) : Promise<void>;

    protected async abstract test(event : object) : Promise<void>;

    public async run(event : object) : Promise<void> {
        this.browser = await PuppetTest.getBrowser();
        this.page = await this.browser.newPage();
        await this.setup(event);
        try {
            await this.test(event);
        } finally {
            await this.teardown(event);
            this.browser.close();
        }
    }


    /**
     * Chromium Aws Lambda(https://github.com/alixaxel/chrome-aws-lambda) is used due to
     * the default chrome that puppeteer ships with being too large. It seems to work but
     * work needs to be done to see if we can still test locally using puppeteer's version
     * as this one doesn't seemingly work well/at all locally.
     */
    private static async getBrowser() : Promise<Browser> {
        console.log(Chromium.args);
        return BrowserBuilder({
            args: Chromium.args.concat('--disable-software-rasterizer').concat('--disable-gpu'),
            executablePath: await Chromium.executablePath,
            headless: Chromium.headless,
        });
    }
}

//TODO: Local run non headless chrome, maybe puppeteer's default
//TODO: clean up run()
//TODO: Make a few more tests and then add a test parser from labda's event
//TODO: clean up lambda handler
//TODO: streamline deploy/build process
//TODO: Make repo and update readme.md
//TODO: git hook dispatcher(also use lambda maybe?)
//TODO: add reporting for ran tests(sql or something, some website perhaps? report to github too)
//TODO: some way to re-run tests, all that jazz
//TODO: spin up a test version of site to use per run, also fixtures