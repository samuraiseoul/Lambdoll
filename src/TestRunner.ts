import PuppetTest from "./PuppetTest";

export default class TestRunner {

    private static async buildTestInstance (testPath : string) : Promise<PuppetTest> {
        const testClassPrototype = (await import(testPath)).default;
        return new testClassPrototype();
    }

    public static async runTest (testPath : string) : Promise<object> {
        const test = await TestRunner.buildTestInstance(testPath);
        await test.run();
        return {
            testSuccess : true
        };
    }
}