import TestRunner from "../src/TestRunner";

async function runTests () : Promise<number> {
    try {
        await TestRunner.runTest(`${__dirname}/ImplementedTests/ExampleTest`);
        await TestRunner.runTest(`${__dirname}/ImplementedTests/ExampleFailTest`);
    } catch (exception) {
        return 1;
    }
    return 0;
}

runTests()
    .then(process.exit);
