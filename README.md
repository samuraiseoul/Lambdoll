# Lambdoll [![npm version](https://badge.fury.io/js/lambdoll.svg)](https://badge.fury.io/js/lambdoll) [![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](https://opensource.org/licenses/GPL-3.0/)

Lambdoll is a simple wrapper framework created to make running distributed browser 
tests using puppeteer in AWS Lambda easy.

##### IMPORTANT CAVEAT!
When bundling to push to lambda, be sure to do your production npm install with the 
following environment parameters.

```
CUSTOM_CHROME=true PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```
These environment variables tell npm to not download chromium.

This project uses puppeteer which downloads chromium as a dependency. The bundled Chromium 
is too large for AWS lambda. 

The other dependency for this project(`chrome-aws-lambda`) uses custom compression
on a minimal build of chromium that then gets extracted when the lambda function is
running.

## Getting Started

To include in your project, simply npm install
```
npm install lambdoll
```

### Prerequisites

You will need some code in place for calling the tests as well as reporting.
 
This test runner simply takes a path to the test to run, so tests to run 
will also need to be written and included. 
e
### Code Example

The tests that need to be written and included will be something like: 
```
import PuppetTest from "../../src/PuppetTest";

export default class ExampleTest extends PuppetTest {
    protected async setup () : Promise<void> {
        await (await this.getPage()).goto("http://www.example.com");
        await (await this.getPage()).waitForSelector("h1", {visible: true, timeout: 10000});
    }

    protected async teardown () : Promise<void> {
        return Promise.resolve();
    }

    protected async test () : Promise<void> {
        const headerText = await (await this.getPage()).evaluate(() : string | null => {
            const header = document.querySelector("h1");
            return header ? header.textContent : null;
        });
        if (!headerText || headerText !== "Example Domain") {
            throw new Error("No header or text incorrect.");
        }
    }
}
```

The lambda function you will need to write will look something like this:

```
import {TestRunner} from "lambdoll";
 
export async function handler(event) : Promise<Object> {
    // Your environment setup here
    try {
        await TestRunner.runTest(event.testPath, event);
    } catch (exception) {
        // Error reporting here
    }
    // Test Reporting here
}
```

## Built With

* [Puppeteer](https://github.com/GoogleChrome/puppeteer) - Headless Chrome Devtools Driver
* [Chrome-Aws-Lambda](https://github.com/alixaxel/chrome-aws-lambda) - Small chromium build for AWS lambda

## Contributing

Just fork and open a pull request and we will go from there. If there are a lot of requests
I will make a more robust contributing guide.

## Authors

* [**Scott Lavigne**](https://www.linkedin.com/in/scottlavigne/) - *Initial work* - [Oberd](https://oberd.com/)

## License

This project is licensed under the GNU GPLv3 License - see 
[gnu's site](https://www.gnu.org/licenses/gpl-3.0.en.html) for details

## Acknowledgments

* [Purplebooth Readme Guide](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [Akash Nimare's Readme Guide](https://medium.com/@meakaakka/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3)
