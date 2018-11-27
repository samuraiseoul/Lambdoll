let PuppetTest =  require("../lib/index").PuppetTest;

class Test extends PuppetTest {
    setup(event) {
        let promises = [
            this.page.goto('http://www.oberd.com'),
            this.page.waitForSelector('#site-logo', {visible: true, timeout: 10000})
        ];
        return Promise.all(promises);
    }

    teardown(event) {
        return Promise.resolve();
    }

    test(event) {
        return this.page.evaluate(() => document.querySelectorAll('#main-nav > li').length )
            .then(count => {
                if(count === 5){
                    throw 'count must not be 5';
                }
            });
    }
}

let test = new Test();

test.run({}).catch(console.log);