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
      .connect(`mongodb://${process.env.DB_ADDRESS}/${process.env.DB_NAME}`)
      .then(() => mongoose.connection.db.dropDatabase())
      .then(() => mongoose.connection.close());

    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: 100,
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
    expect(!!await page.$('#btn-load:disabled')).toBe(true);
    expect(!!await page.$('#btn-save:disabled')).toBe(true);
    expect(!!await page.$('#btn-delete:disabled')).toBe(true);
    expect(!!await page.$('#btn-copy:disabled')).toBe(true);
    expect(!!await page.$('#btn-rename:disabled')).toBe(true);
    expect(!!await page.$('#btn-done')).toBe(false);

    done();
  });

  it('Should create a new level when clicking on the "new" button', async done => {
    //  Click on the "new" button
    await page.click('#btn-new');

    //  Hide the no levels label
    expect(!!await page.$('.no-levels')).toBe(false);

    //  Number of levels should only be one
    const noOfLevels = await page.$$eval('.level', levels => levels.length);
    expect(noOfLevels).toBe(1);

    //  Level should be titled "New level"
    expect(!!await page.$('.level p')).toBe(false);
    const levelName = await page.$eval('.level input', input => input.value);
    expect(levelName).toBe('New level');

    done();
  });

  it('Should allow the new level to be renamed', async done => {
    //  Level name should be editable and selected
    await page.keyboard.type('Level 1');
    let levelName = await page.$eval('.level input', input => input.value);
    expect(levelName).toBe('Level 1');

    //  All buttons except for the "done" button should be disabled
    expect(!!await page.$('#btn-new:disabled')).toBe(true);
    expect(!!await page.$('#btn-load:disabled')).toBe(true);
    expect(!!await page.$('#btn-save:disabled')).toBe(true);
    expect(!!await page.$('#btn-delete:disabled')).toBe(true);
    expect(!!await page.$('#btn-copy:disabled')).toBe(true);
    expect(!!await page.$('#btn-rename')).toBe(false);
    expect(!!await page.$('#btn-done:not(:disabled)')).toBe(true);

    //  Upon pressing the "enter" key, the level should no longer be editable
    await page.keyboard.type(String.fromCharCode(13));
    expect(!!await page.$('.level input')).toBe(false);
    expect(!!await page.$('.level p')).toBe(true);
    levelName = await page.$eval('.level p', name => name.innerText);
    expect(levelName).toBe('Level 1');

    //  All buttons except save and load should be enabled
    expect(!!await page.$('#btn-new:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-load:not(:disabled)')).toBe(false);
    expect(!!await page.$('#btn-save:not(:disabled)')).toBe(false);
    expect(!!await page.$('#btn-delete:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-copy:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-rename:not(:disabled')).toBe(true);
    expect(!!await page.$('#btn-done')).toBe(false);

    //  New level should have the selected styling
    const borderStyle = await page.evaluate(
      () => window.getComputedStyle(document.querySelector('.level')).border,
    );
    expect(borderStyle).toBe('2px solid rgb(255, 255, 0)');

    done();
  });

  it("Should enable the save/load buttons if the editor grid differs from the selected level's tiles", async done => {
    //  Change the editor grid a bit and check if the buttons are enabled
    await page.click('#tile-selector .tile:nth-child(3)');
    await page.click('#editor-grid .tile:nth-child(50)');

    expect(!!await page.$('#btn-load:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-save:not(:disabled)')).toBe(true);

    //  Change it back to the default and check the buttons are disabled again
    await page.click('#tile-selector .tile:nth-child(1)');
    await page.click('#editor-grid .tile:nth-child(50)');

    expect(!!await page.$('#btn-load:not(:disabled)')).toBe(false);
    expect(!!await page.$('#btn-save:not(:disabled)')).toBe(false);

    done();
  });

  it('Should let the user save the current level', async done => {
    //  Change the editor grid a bit and check if the buttons are enabled
    await page.click('#tile-selector .tile:nth-child(3)');
    await page.click('#editor-grid .tile:nth-child(50)');

    //  Click on the save button
    await page.click('#btn-save');

    //  The save/load buttons should be disabled
    expect(!!await page.$('#btn-load:not(:disabled)')).toBe(false);
    expect(!!await page.$('#btn-save:not(:disabled)')).toBe(false);

    //  Check the level preview reflects the editor grid
    const allTilesMatch = await page.evaluate(() => {
      const tiles = document.querySelectorAll('#editor-grid .tile > div');

      return (
        Array.prototype.slice
          .call(tiles)
          .filter(
            (tile, index) =>
              window.getComputedStyle(tile).backgroundColor !==
              window.getComputedStyle(
                document.querySelector(
                  `.level .level-preview .preview-tile:nth-child(${index + 1}) > div`,
                ),
              ).backgroundColor,
          ).length === 0
      );
    });

    expect(allTilesMatch).toBe(true);

    done();
  });
});
