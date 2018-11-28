import {Browser, Page, launch as BrowserBuilder} from "puppeteer";
import Chromium from "chrome-aws-lambda";

export default abstract class PuppetTest {
    private browser : Browser | undefined = undefined;
    private page : Page | undefined = undefined;

    protected abstract async setup () : Promise<void>;

    protected abstract async teardown () : Promise<void>;

    protected async abstract test () : Promise<void>;

    public async run () : Promise<void> {
        await this.getBrowser();
        await this.getPage();
        await this.setup();
        try {
            await this.test();
        } finally {
            await this.teardown();
            await (await this.getBrowser()).close();
        }
    }

    protected async getPage () : Promise<Page> {
        if (!this.page) {
            this.page = await (await this.getBrowser()).newPage();
        }
        return this.page;
    }

    protected async getBrowser () : Promise<Browser> {
        if (!this.browser) {
            this.browser = await PuppetTest.buildBrowser();
        }
        return this.browser;
    }

    /**
     * Chromium Aws Lambda(https://github.com/alixaxel/chrome-aws-lambda) is used due to
     * the default chrome that puppeteer ships with being too large. It seems to work but
     * work needs to be done to see if we can still test locally using puppeteer's version
     * as this one doesn't seemingly work well/at all locally.
     */
    private static async buildBrowser () : Promise<Browser> {
        return BrowserBuilder({
            args: Chromium.args.concat("--disable-software-rasterizer").concat("--disable-gpu"),
            executablePath: await Chromium.executablePath,
            headless: Chromium.headless,
        });
    }
}

// TODO: Make a few more tests and then add a test parser from labda's event
// TODO: git hook dispatcher(also use lambda maybe?)
// TODO: add reporting for ran tests(sql or something, some website perhaps? report to github too)
// TODO: some way to re-run tests, all that jazz
// TODO: spin up a test version of site to use per run, also fixtures