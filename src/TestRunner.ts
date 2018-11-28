import PuppetTest from "./PuppetTest";

export default class TestRunner {

    private static async buildTestInstance(testPath : string) : Promise<PuppetTest> {
        let TestClassPrototype = (await import(testPath)).default;
        return new TestClassPrototype();
    }

    public static async runTest(testPath : string) : Promise<object> {
        let test = await TestRunner.buildTestInstance(testPath);
        await test.run();
        return {
            'testSuccess' : true
        };
    }
}