import TestRunner from "../src/TestRunner";

async function runTests () : Promise<number> {
    try {
        await TestRunner.runTest(`${__dirname}/ImplementedTests/ExampleTest`);
    } catch (exception) {
        return 1;
    }
    return 0;
}

runTests()
    .then(process.exit);
