import puppeteer from 'puppeteer';
import dovenv from 'dotenv';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import { isDisplayed, sleep, getComputedStyleProperty } from '../testUtils';

mongoose.Promise = bluebird;

dovenv.config();

const debugMode = false;

//  Set the timeout. Good for when using slowMo for debugging
jest.setTimeout(debugMode ? 15000 : 15000);

const clearDatabase = () => {
  mongoose
    .connect(`mongodb://${process.env.DB_ADDRESS}/${process.env.DB_NAME}`)
    .then(() => mongoose.connection.db.dropDatabase())
    .then(() => mongoose.connection.close());
};

describe('The level solver', () => {
  let browser;
  let page;

  beforeAll(async done => {
    clearDatabase();

    browser = await puppeteer.launch({
      headless: !debugMode,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: debugMode ? 200 : 50,
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
    await page.waitForSelector('#level-solver');

    done();
  });

  it('Should display the "not yet solved" message by default', async done => {
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Not yet solved');

    expect(await isDisplayed(page, '#level-solver .arrows')).toBe(false);

    done();
  });

  it('Should show when levels are unsolvable', async done => {
    //  Put a coloured block down on its own
    await page.click('#tile-selector .tile:nth-child(4)');
    await page.click('#editor-grid .tile:nth-child(54)');

    //  Click the solve level button
    await page.click('#btn-solve');

    //  We should get the feedback that the level is loading
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Solving');

    //  We should later get the feedback that the level is unsolvable
    await page.waitForSelector('#level-solver .solution-status.finished');
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Unsolvable in 10 moves!');

    expect(await isDisplayed(page, '#level-solver .arrows')).toBe(false);

    done();
  });

  it('Should show when levels are solved by default', async done => {
    //  Stick another colored blocks next to the existing one
    await page.click('#editor-grid .tile:nth-child(55)');

    //  Click the solve level button
    await page.click('#btn-solve');

    //  We should get the feedback that the level is solved by default
    await page.waitForSelector('#level-solver .solution-status.finished');
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Solved by default');

    expect(await isDisplayed(page, '#level-solver .arrows')).toBe(false);

    done();
  });

  it('Should show when levels are solvable in a single move', async done => {
    //  Seperate the two coloured blocks with a space
    await page.click('#editor-grid .tile:nth-child(56)');
    await page.click('#tile-selector .tile:nth-child(2)');
    await page.click('#editor-grid .tile:nth-child(55)');

    //  Click the solve level button
    await page.click('#btn-solve');

    //  We should get the feedback that the level is solved by default
    await page.waitForSelector('#level-solver .solution-status.finished');
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Solvable in 1 move!');

    //  There should be single arrow icon in the level solver display
    expect(await page.$$eval('#level-solver .arrows li', els => els.length)).toBe(1);
    expect(await getComputedStyleProperty(page, 'transform', '#level-solver .arrows li path')).toBe(
      'matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)',
    );

    done();
  });

  it('Should show when levels are solvable in multiple moves', async done => {
    //  Seperate the two blocks with multiple spaces
    await page.click('#editor-grid .tile:nth-child(56)');
    await page.click('#editor-grid .tile:nth-child(46)');
    await page.click('#editor-grid .tile:nth-child(36)');
    await page.click('#editor-grid .tile:nth-child(35)');
    await page.click('#editor-grid .tile:nth-child(34)');
    await page.click('#tile-selector .tile:nth-child(4)');
    await page.click('#editor-grid .tile:nth-child(24)');

    //  Click the solve level button
    await page.click('#btn-solve');

    //  We should get the feedback that the level is solved by default
    await page.waitForSelector('#level-solver .solution-status.finished');
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Solvable in 3 moves!');

    //  There should be 3 arrows icon in the level solver display
    expect(await page.$$eval('#level-solver .arrows li', els => els.length)).toBe(3);
    expect(
      await getComputedStyleProperty(
        page,
        'transform',
        '#level-solver .arrows li:nth-child(1) path',
      ),
    ).toBe('matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)');
    expect(
      await getComputedStyleProperty(
        page,
        'transform',
        '#level-solver .arrows li:nth-child(2) path',
      ),
    ).toBe('matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)');
    expect(
      await getComputedStyleProperty(
        page,
        'transform',
        '#level-solver .arrows li:nth-child(3) path',
      ),
    ).toBe('matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)');

    done();
  });

  it('Should display the default message when clicking on the reset button', async done => {
    //  Click the reset level button
    await page.click('#btn-reset');

    //  We should get the feedback that the level is solved by default
    await page.waitForSelector('#level-solver .solution-status.finished');
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Not yet solved');

    expect(await isDisplayed(page, '#level-solver .arrows')).toBe(false);

    done();
  });

  it('Should display the default message after placing a new tile', async done => {
    //  Place two red tiles down seperated by one space
    await page.click('#editor-grid .tile:nth-child(46)');
    await page.click('#editor-grid .tile:nth-child(48)');
    await page.click('#tile-selector .tile:nth-child(2)');
    await page.click('#editor-grid .tile:nth-child(47)');

    //  Click the solve level button
    await page.click('#btn-solve');

    //  We should get the feedback that the level is solved by default
    await page.waitForSelector('#level-solver .solution-status.finished');
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Solvable in 1 move!');

    //  Place a space down
    await page.click('#editor-grid .tile:nth-child(1)');

    //  The solution status message should be reset
    await page.waitForSelector('#level-solver .solution-status.finished');
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Not yet solved');

    expect(await isDisplayed(page, '#level-solver .arrows')).toBe(false);

    done();
  });

  it('Should allow the solutions to be saved', async done => {
    let newLevelSolutionMessage;

    //  Create and save a new level
    await page.click('#btn-new');
    await sleep(100);
    await page.keyboard.type(String.fromCharCode(13));
    await page.click('#btn-save');

    //  The new level should display the default solution message
    newLevelSolutionMessage = await page.$eval('.level .solution-status', el => el.innerText);
    expect(newLevelSolutionMessage).toBe('Not yet solved');

    //  The save button should be disabled
    expect(await isDisplayed(page, '#btn-save:disabled')).toBe(true);

    //  Solve the level
    await page.click('#btn-solve');

    //  The save button should be enabled
    // await page.waitForSelector('#level-solver .solution-status.finished');
    expect(await isDisplayed(page, '#btn-save:not(:disabled)')).toBe(true);

    //  Save the solved level
    await page.click('#btn-save');

    //  The new level should display the updated solution message
    newLevelSolutionMessage = await page.$eval('.level .solution-status', el => el.innerText);
    expect(newLevelSolutionMessage).toBe('Solvable in 1 move!');

    //  The save button should be disabled
    expect(await isDisplayed(page, '#btn-save:disabled')).toBe(true);

    done();
  });

  it('Should load the solution message from a saved level', async done => {
    //  Reset the level
    await page.click('#btn-reset');

    //  Put down two red tiles next to each other
    await page.click('#tile-selector .tile:nth-child(4)');
    await page.click('#editor-grid .tile:nth-child(48)');
    await page.click('#editor-grid .tile:nth-child(49)');

    //  Solve the level
    await page.click('#btn-solve');

    //  Check to see that the solution message is correct
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Solved by default');

    //  Load the currently selected level
    await page.click('#btn-load');
    await page.waitForSelector('#confirmation-screen');
    await page.click('#btn-confirm');

    //  Check to see that the solution status text has updated
    expect(
      await page.evaluate(
        () => document.querySelector('#level-solver .solution-status').textContent,
      ),
    ).toBe('Solvable in 1 move!');

    done();
  });
});
