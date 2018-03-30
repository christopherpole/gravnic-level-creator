import puppeteer from 'puppeteer';
import dovenv from 'dotenv';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

dovenv.config();

//  Set the timeout to 10 seconds. Good for when using slowMo for ddebugging
jest.setTimeout(10000);

describe('The level manager', () => {
  let browser;
  let page;

  beforeAll(async done => {
    mongoose
      .connect(`mongodb://${process.env.DB_ADDRESS}/${process.env.DB_NAME}`, {
        useMongoClient: false,
      })
      .then(() => mongoose.connection.db.dropDatabase())
      .then(() => mongoose.connection.db.close());

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: 0,
    });

    page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 1 });

    done();
  });

  afterAll(async done => {
    await browser.close();

    done();
  });

  it('Should be visible when the user loads the page', async done => {
    await page.goto(`http://${process.env.FRONTEND_URL}`);
    await page.waitForSelector('#level-manager');

    done();
  });

  it('Should have a "no levels" message by default', async done => {
    await page.waitForSelector('.no-levels');
    expect(!!await page.$('.level')).toBe(false);

    done();
  });

  it('Should disable all of the buttons except the "new" button by default', async done => {
    expect(!!await page.$('#btn-new:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-load:not(:disabled)')).toBe(false);
    expect(!!await page.$('#btn-save:not(:disabled)')).toBe(false);
    expect(!!await page.$('#btn-delete:not(:disabled)')).toBe(false);
    expect(!!await page.$('#btn-copy:not(:disabled)')).toBe(false);
    expect(!!await page.$('#btn-rename:not(:disabled)')).toBe(false);

    done();
  });

  it('Should create a new level when clicking on the "new" button', async done => {
    //  Click on the "new" button
    await page.click('#btn-new');

    //  Hide the no levels label
    expect(!!await page.$('.no-levels')).toBe(false);

    //  Number of levels should only be one
    const levels = await page.$$('.level');
    expect(levels.length).toBe(1);

    //  Level should be titled "New name"

    //  Level name should be editable

    //  All buttons except for the "done" button should be disabled

    done();
  });
});
