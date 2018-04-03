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
      slowMo: 50,
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

    //  New level should have the selected styling
    const borderStyle = await page.evaluate(
      () => window.getComputedStyle(document.querySelector('.level')).border,
    );
    expect(borderStyle).toBe('2px solid rgb(255, 255, 0)');

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
    expect(!!await page.$('#btn-load:disabled')).toBe(true);
    expect(!!await page.$('#btn-save:disabled')).toBe(true);
    expect(!!await page.$('#btn-delete:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-copy:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-rename:not(:disabled')).toBe(true);
    expect(!!await page.$('#btn-done')).toBe(false);

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

  it("Should enable the save/load buttons if the edit stars differs from the selected level's stars", async done => {
    //  Change the editor stars a bit and check if the buttons are enabled
    await page.click('#stars-editor > ul > li:last-child .btn-increment');

    expect(!!await page.$('#btn-load:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-save:not(:disabled)')).toBe(true);

    //  Change it back to the default and check the buttons are disabled again
    await page.click('#stars-editor > ul > li:last-child .btn-decrement');

    expect(!!await page.$('#btn-load:not(:disabled)')).toBe(false);
    expect(!!await page.$('#btn-save:not(:disabled)')).toBe(false);

    done();
  });

  it('Should let the user save the selected level', async done => {
    //  Change the editor grid a bit
    await page.click('#tile-selector .tile:nth-child(3)');
    await page.click('#editor-grid .tile:nth-child(50)');

    //  Change the stars too
    await page.click('#stars-editor > ul > li:nth-child(1) .btn-increment');
    await page.click('#stars-editor > ul > li:nth-child(2) .btn-increment');
    await page.click('#stars-editor > ul > li:nth-child(3) .btn-increment');

    //  Click on the save button
    await page.click('#btn-save');

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

    //  Check that the stars match too
    const allStarsMatch = await page.evaluate(
      () =>
        document.querySelector('#stars-editor > ul > li:nth-child(1) span').innerText === '2' &&
        document.querySelector('#stars-editor > ul > li:nth-child(2) span').innerText === '3' &&
        document.querySelector('#stars-editor > ul > li:nth-child(3) span').innerText === '4',
    );

    expect(allStarsMatch).toBe(true);

    done();
  });

  it('Should let the user load the selected level', async done => {
    //  Clear the editor
    await page.click('#btn-reset');

    //  Muck around with the stars a bit
    await page.click('#stars-editor > ul > li:nth-child(2) .btn-increment');
    await page.click('#stars-editor > ul > li:nth-child(2) .btn-increment');

    //  All buttons should be enabled
    expect(!!await page.$('#btn-new:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-load:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-save:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-delete:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-copy:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-rename:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-done')).toBe(false);

    //  Click on the "load" button
    await page.click('#btn-load');

    //  "Save" and "load" buttons should be disabled
    expect(!!await page.$('#btn-new:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-load:disabled')).toBe(true);
    expect(!!await page.$('#btn-save:disabled')).toBe(true);
    expect(!!await page.$('#btn-delete:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-copy:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-rename:not(:disabled)')).toBe(true);
    expect(!!await page.$('#btn-done')).toBe(false);

    //  Editor's tiles should match that of the selected level's
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

    //  Editor's stars should match that of the selected level's
    const allStarsMatch = await page.evaluate(
      () =>
        document.querySelector('#stars-editor > ul > li:nth-child(1) span').innerText === '2' &&
        document.querySelector('#stars-editor > ul > li:nth-child(2) span').innerText === '3' &&
        document.querySelector('#stars-editor > ul > li:nth-child(3) span').innerText === '4',
    );

    expect(allStarsMatch).toBe(true);

    done();
  });

  it('Should let the user rename selected level', async done => {
    //  Click on the "rename" button
    await page.click('#btn-rename');

    //  Check renaming mode is active
    expect(!!await page.$('.level p')).toBe(false);
    let levelName = await page.$eval('.level input', input => input.value);
    expect(levelName).toBe('Level 1');

    //  Type in the new level name
    await page.keyboard.type('New level 1');
    levelName = await page.$eval('.level input', input => input.value);
    expect(levelName).toBe('New level 1');

    //  Press the "done" button instead of using the keyboard this time
    await page.click('#btn-done');

    //  Ensure that the level name is updated and no longer editable
    expect(!!await page.$('.level input')).toBe(false);
    expect(!!await page.$('.level p')).toBe(true);
    levelName = await page.$eval('.level p', name => name.innerText);
    expect(levelName).toBe('New level 1');

    done();
  });

  it('Should let the user copy the selected level', async done => {
    //  Click on the "copy" button
    await page.click('#btn-copy');

    //  Number of levels should now be two
    const noOfLevels = await page.$$eval('.level', levels => levels.length);
    expect(noOfLevels).toBe(2);

    //  Level should be titled "Level 1"
    expect(!!await page.$('.level:nth-child(2) p')).toBe(false);
    let levelName = await page.$eval('.level:nth-child(2) input', input => input.value);
    expect(levelName).toBe('New level 1');

    //  Old level should retain the current level border
    let borderStyle = await page.evaluate(
      () => window.getComputedStyle(document.querySelector('.level:nth-child(1)')).border,
    );
    expect(borderStyle).toBe('2px solid rgb(255, 255, 255)');

    //  New level should have the selected styling
    borderStyle = await page.evaluate(
      () => window.getComputedStyle(document.querySelector('.level:nth-child(2)')).border,
    );
    expect(borderStyle).toBe('2px solid rgb(255, 255, 0)');

    //  Type in the new level name
    await page.keyboard.type('New level 2');
    levelName = await page.$eval('.level:nth-child(2) input', input => input.value);
    expect(levelName).toBe('New level 2');

    //  Upon pressing the "enter" key, the level name should be updated
    await page.keyboard.type(String.fromCharCode(13));
    levelName = await page.$eval('.level:nth-child(2) p', name => name.innerText);
    expect(levelName).toBe('New level 2');

    //  New level's tiles preview should match that of the old level
    const allTilesMatch = await page.evaluate(
      () =>
        document.querySelector('.level:nth-child(1) .level-preview .preview-tile > div')
          .innerHTML ===
        document.querySelector('.level:nth-child(2) .level-preview .preview-tile > div').innerHTML,
    );

    expect(allTilesMatch).toBe(true);

    //  New level's stars should match those of the old level
    const starsMatch = await page.evaluate(
      () =>
        document.querySelector('.level:nth-child(1) .stars-list').innerHTML ===
        document.querySelector('.level:nth-child(2) .stars-list').innerHTML,
    );

    expect(starsMatch).toBe(true);

    done();
  });

  it('Should let the user reorder the levels by dragging them', async done => {
    const { mouse } = page;

    //  Drag the second level to to top of the list
    const level = await page.$('.level:nth-child(2)');
    const rect = await level.boundingBox();
    await mouse.move(rect.x + 10, rect.y + 10, { steps: 10 });
    await mouse.down();
    await mouse.move(rect.x + 10, rect.y + 10 - rect.height, { steps: 10 });
    await mouse.up();

    //  Check that the levels have been reordered
    let levelName = await page.$eval('.level:nth-child(1) p', name => name.innerText);
    expect(levelName).toBe('New level 2');
    levelName = await page.$eval('.level:nth-child(2) p', name => name.innerText);
    expect(levelName).toBe('New level 1');

    done();
  });

  it('Should let the user delete the selected level', async done => {
    //  Select the first level in the list ("New level 2")
    await page.click('.level:first-child');

    //  Click on the "delete" button
    await page.click('#btn-delete');

    //  Number of levels should now be one
    const noOfLevels = await page.$$eval('.level', levels => levels.length);
    expect(noOfLevels).toBe(1);

    //  Remaining level name should be the first level's
    const levelName = await page.$eval('.level p', name => name.innerText);
    expect(levelName).toBe('New level 1');

    done();
  });
});
