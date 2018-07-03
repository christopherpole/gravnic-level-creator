import puppeteer from 'puppeteer';
import dovenv from 'dotenv';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import {
  getComputedStyleProperty,
  isDisplayed,
  getStarsValues,
  getNoOfElements,
  editorTilesMatchPreviewTiles,
} from '../testUtils';

mongoose.Promise = bluebird;

dovenv.config();

const debugMode = false;

//  Set the timeout. Good for when using slowMo for debugging
jest.setTimeout(debugMode ? 10000 : 5000);

const clearDatabase = () => {
  mongoose
    .connect(`mongodb://${process.env.DB_ADDRESS}/${process.env.DB_NAME}`)
    .then(() => mongoose.connection.db.dropDatabase())
    .then(() => mongoose.connection.close());
};

describe('The level manager', () => {
  let browser;
  let page;

  beforeAll(async done => {
    clearDatabase();

    browser = await puppeteer.launch({
      headless: !debugMode,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: debugMode ? 200 : 40,
    });

    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 600, deviceScaleFactor: 1 });

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
    expect(await isDisplayed(page, '.level')).toBe(false);

    done();
  });

  it('Should disable all of the buttons except the "new" button by default', async done => {
    expect(await isDisplayed(page, '#btn-new:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-load:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-save:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-delete:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-copy:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-rename:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-done')).toBe(false);

    done();
  });

  it('Should create a new level when clicking on the "new" button', async done => {
    //  Click on the "new" button
    await page.click('#btn-new');

    //  Hide the no levels label
    expect(await isDisplayed(page, '.no-levels')).toBe(false);

    //  There should be a new level visible
    expect(await getNoOfElements(page, '.level')).toBe(1);

    //  Level should be titled "New level"
    expect(await isDisplayed(page, '.level .name-wrapper p')).toBe(false);
    const levelName = await page.$eval('.level .name-wrapper input', input => input.value);
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
    let levelName = await page.$eval('.level .name-wrapper input', input => input.value);
    expect(levelName).toBe('Level 1');

    //  All buttons except for the "done" button should be disabled
    expect(await isDisplayed(page, '#btn-new:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-load:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-save:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-delete:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-copy:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-rename')).toBe(false);
    expect(await isDisplayed(page, '#btn-done:not(:disabled)')).toBe(true);

    //  Upon pressing the "enter" key, the level should no longer be editable
    await page.keyboard.type(String.fromCharCode(13));
    expect(await isDisplayed(page, '.level .name-wrapper input')).toBe(false);
    expect(await isDisplayed(page, '.level .name-wrapper p')).toBe(true);
    levelName = await page.$eval('.level .name-wrapper p', name => name.innerText);
    expect(levelName).toBe('Level 1');

    //  All buttons except save and load should be enabled
    expect(await isDisplayed(page, '#btn-new:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-load:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-save:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-delete:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-copy:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-rename:not(:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-done')).toBe(false);

    done();
  });

  it("Should enable the save/load buttons if the editor grid differs from the selected level's tiles", async done => {
    //  Change the editor grid a bit and check if the buttons are enabled
    await page.click('#tile-selector .tile:nth-child(4)');
    await page.click('#editor-grid .tile:nth-child(50)');

    expect(await isDisplayed(page, '#btn-load:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-save:not(:disabled)')).toBe(true);

    //  Change it back to the default and check the buttons are disabled again
    await page.click('#tile-selector .tile:nth-child(1)');
    await page.click('#editor-grid .tile:nth-child(50)');

    expect(await isDisplayed(page, '#btn-load:not(:disabled)')).toBe(false);
    expect(await isDisplayed(page, '#btn-save:not(:disabled)')).toBe(false);

    done();
  });

  it("Should enable the save/load buttons if the edit stars differs from the selected level's stars", async done => {
    //  Change the editor stars a bit and check if the buttons are enabled
    await page.click('#stars-editor > ul > li:last-child .btn-increment');

    expect(await isDisplayed(page, '#btn-load:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-save:not(:disabled)')).toBe(true);

    //  Change it back to the default and check the buttons are disabled again
    await page.click('#stars-editor > ul > li:last-child .btn-decrement');

    expect(await isDisplayed(page, '#btn-load:not(:disabled)')).toBe(false);
    expect(await isDisplayed(page, '#btn-save:not(:disabled)')).toBe(false);

    done();
  });

  it('Should let the user save the selected level', async done => {
    //  Change the editor grid a bit
    await page.click('#tile-selector .tile:nth-child(4)');
    await page.click('#editor-grid .tile:nth-child(50)');

    //  Change the stars too
    await page.click('#stars-editor > ul > li:nth-child(1) .btn-increment');
    await page.click('#stars-editor > ul > li:nth-child(2) .btn-increment');
    await page.click('#stars-editor > ul > li:nth-child(3) .btn-increment');

    //  Click on the save button
    await page.click('#btn-save');

    //  Check the level preview reflects the editor grid
    expect(await editorTilesMatchPreviewTiles(page)).toBe(true);

    //  Check that the stars match too
    expect(await getStarsValues(page)).toEqual(['2', '3', '4']);

    done();
  });

  it('Should let the user rename selected level', async done => {
    //  Click on the "rename" button
    await page.click('#btn-rename');

    //  Check renaming mode is active
    expect(await isDisplayed(page, '.level .name-wrapper p')).toBe(false);
    let levelName = await page.$eval('.level .name-wrapper input', input => input.value);
    expect(levelName).toBe('Level 1');

    //  Type in the new level name
    await page.keyboard.type('New level 1');
    levelName = await page.$eval('.level .name-wrapper input', input => input.value);
    expect(levelName).toBe('New level 1');

    //  Press the "done" button instead of using the keyboard this time
    await page.click('#btn-done');

    //  Ensure that the level name is updated and no longer editable
    expect(await isDisplayed(page, '.level .name-wrapper input')).toBe(false);
    expect(await isDisplayed(page, '.level .name-wrapper p')).toBe(true);
    levelName = await page.$eval('.level .name-wrapper p', name => name.innerText);
    expect(levelName).toBe('New level 1');

    done();
  });

  it('Should let the user copy the selected level', async done => {
    //  Click on the "copy" button
    await page.click('#btn-copy');

    //  Number of levels should now be two
    expect(await getNoOfElements(page, '.level')).toBe(2);

    //  Level should be titled "Level 1"
    expect(await isDisplayed(page, '.level:nth-child(2) .name-wrapper p')).toBe(false);
    let levelName = await page.$eval(
      '.level:nth-child(2) .name-wrapper input',
      input => input.value,
    );
    expect(levelName).toBe('New level 1');

    //  New level should have the selected styling
    expect(await getComputedStyleProperty(page, 'border', '.level:nth-child(2)')).toBe(
      '2px solid rgb(255, 255, 0)',
    );

    //  Type in the new level name
    await page.keyboard.type('New level 2');
    levelName = await page.$eval('.level:nth-child(2) .name-wrapper input', input => input.value);
    expect(levelName).toBe('New level 2');

    //  Upon pressing the "enter" key, the level name should be updated
    await page.keyboard.type(String.fromCharCode(13));
    levelName = await page.$eval('.level:nth-child(2) .name-wrapper p', name => name.innerText);
    expect(levelName).toBe('New level 2');

    //  New level's tiles preview should match that of the old level
    const allTilesMatch = await page.evaluate(
      () =>
        document.querySelector('.level:nth-child(1) .level-preview .preview-tile > div > div')
          .innerHTML ===
        document.querySelector('.level:nth-child(2) .level-preview .preview-tile > div > div')
          .innerHTML,
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

  it('Should let the user load the selected level', async done => {
    //  Mess around with the editor
    await page.click('#editor-grid .tile:nth-child(40)');

    //  Muck around with the stars a bit
    await page.click('#stars-editor > ul > li:nth-child(2) .btn-increment');
    await page.click('#stars-editor > ul > li:nth-child(2) .btn-increment');

    //  All buttons should be enabled
    expect(await isDisplayed(page, '#btn-new:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-load:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-save:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-delete:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-copy:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-rename:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-done')).toBe(false);

    //  Click on the "load" button
    await page.click('#btn-load');

    //  The confirmation screen should show
    await page.waitForSelector('#confirmation-screen');

    //  Ensure that the level didn't load after canceling
    await page.click('#btn-cancel');
    expect(
      await getComputedStyleProperty(
        page,
        'backgroundColor',
        '#editor-grid .tile:nth-child(40) > div > div',
      ),
    ).toBe('rgb(255, 0, 0)');

    expect(await getStarsValues(page)).toEqual(['2', '5', '5']);

    //  Click on the "load" button again
    await page.click('#btn-load');

    //  The confirmation screen should show
    await page.waitForSelector('#confirmation-screen');

    //  Confirm the loading of the level
    await page.click('#btn-confirm');

    //  "Save" and "load" buttons should be disabled
    expect(await isDisplayed(page, '#btn-new:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-load:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-save:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-delete:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-copy:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-rename:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-done')).toBe(false);

    //  Editor's tiles should match that of the selected level's
    expect(await editorTilesMatchPreviewTiles(page)).toBe(true);

    //  Editor's stars should match that of the selected level's
    expect(await getStarsValues(page)).toEqual(['2', '3', '4']);

    //  If we wipe the grid and try and load we shouldn't see the confirm screen
    await page.click('#btn-reset');
    await page.click('#btn-load');
    expect(await isDisplayed(page, '#confirmation-screen')).toBe(false);

    //  Editor's tiles should match that of the selected level's
    expect(await editorTilesMatchPreviewTiles(page)).toBe(true);

    //  Editor's stars should match that of the selected level's
    expect(await getStarsValues(page)).toEqual(['2', '3', '4']);

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
    let levelName = await page.$eval('.level:nth-child(1) .name-wrapper p', name => name.innerText);
    expect(levelName).toBe('New level 2');
    levelName = await page.$eval('.level:nth-child(2) .name-wrapper p', name => name.innerText);
    expect(levelName).toBe('New level 1');

    done();
  });

  it('Should disable the "save" and "load" buttons if previewing a level', async done => {
    //  Get the editor out of sync with the currently selected level
    await page.click('#editor-grid .tile:nth-child(99)');

    //  Check that the "save" and "load" buttons are enabled
    expect(await isDisplayed(page, '#btn-save:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-load:not(:disabled)')).toBe(true);

    //  Preview the level
    await page.click('#btn-preview');

    //  Check that the "save" and "load" buttons are disabled
    expect(await isDisplayed(page, '#btn-save:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-load:disabled')).toBe(true);

    //  Edit the level again
    await page.click('#btn-edit');

    //  Check that the "save" and "load" buttons are enabled
    expect(await isDisplayed(page, '#btn-save:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-load:not(:disabled)')).toBe(true);

    done();
  });

  it('Should let the user delete the selected level', async done => {
    //  Select the first level in the list ("New level 2")
    await page.click('.level:first-child');

    //  Click on the "delete" button
    await page.click('#btn-delete');

    //  Ensure that the confirmation screen shows then click on the cancel
    //  button and ensure that the level is still present
    await page.waitForSelector('#confirmation-screen');
    await page.click('#btn-cancel');
    expect(await getNoOfElements(page, '.level')).toBe(2);

    //  Ensure that the confirmation screen shows then click on the confirm
    //  button and ensure that the level is has been deleted
    await page.click('#btn-delete');
    await page.waitForSelector('#confirmation-screen');
    await page.click('#btn-confirm');
    expect(await getNoOfElements(page, '.level')).toBe(1);

    //  Remaining level name should be the first level's
    const levelName = await page.$eval('.level .name-wrapper p', name => name.innerText);
    expect(levelName).toBe('New level 1');

    done();
  });

  it('Should show the error screen if an error occurs on the server', async done => {
    //  Wipe the DB so the client is out of sync
    clearDatabase();

    //  Select the level and try to rename the level
    await page.click('.level:nth-child(1)');
    await page.click('#btn-rename');
    await page.click('#btn-done');

    //  The error screen should show
    await page.waitForSelector('#error-screen');
    expect(await getNoOfElements(page, '.level')).toBe(0);
    expect(await isDisplayed(page, '.no-levels')).toBe(false);

    //  The levels list should be visible again after clicking on the "reload" button
    await page.click('#btn-reload');
    await page.waitForSelector('.no-levels');

    done();
  });
});
