import PuppetTest from "../../src/PuppetTest";

export default class ExampleFailTest extends PuppetTest {
    protected async setup(): Promise<void> {
        await (await this.getPage()).goto("http://www.example.com");
        await (await this.getPage()).waitForSelector('h1', {visible: true, timeout: 10000});
    }

    protected async teardown(): Promise<void> {
        return Promise.resolve();
    }

    protected async test(): Promise<void> {
        let header = await (await this.getPage()).evaluate(function() : string | null {
            let header = document.querySelector('h1');
            return header ? header.textContent : null;
        });
        if(!header || header === "Example Domain") {
            throw 'No header or text is correct.';
        }
    }
}