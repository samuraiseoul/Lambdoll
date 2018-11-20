#Building
-------------
### Typescript must be installed as a global dependency

Install npm packages
Remove the out folder
Remove the old zip file
Build using `npm run tsc`
cd to the out folder
Run `zip -r ../lambda.zip ./* ../node_modules/` 

In browser log into the AWS console, go to the S3 buckets
upload the zip file to the browsertestingzips bucket.

Navigate to the lambda function, be sure the test is pullling from the zip file
in s3, and that the test has a long enough timeout and at least one to two gigs of
memory allocated. 

Run the test

#Installing
-----------
To install Puppeteer without the Chrome binary that is too large, run the 
following command.
```
CUSTOM_CHROME=true PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install puppeteer
```
