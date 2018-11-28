import TestRunner from "../src/TestRunner";

(async function () {
    try {
        await TestRunner.runTest(`${__dirname}/ImplementedTests/ExampleTest`);
        await TestRunner.runTest(`${__dirname}/ImplementedTests/ExampleFailTest`);
    } catch (exception) {
        console.log(`Test failed with message: ${exception}`);
        return process.exit(1);
    }
    return process.exit(0);
})();