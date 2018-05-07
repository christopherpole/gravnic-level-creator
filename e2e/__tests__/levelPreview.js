import puppeteer from 'puppeteer';
import dovenv from 'dotenv';
import { isDisplayed, getPreviewEntityPositions, sleep } from '../testUtils';

dovenv.config();

const debugMode = false;
const moveSleepDuration = debugMode ? 1000 : 500;

//  Set the timeout. Good for when using slowMo for debugging
jest.setTimeout(debugMode ? 10000 : 5000);

describe('The level preview', () => {
  let browser;
  let page;

  beforeAll(async done => {
    browser = await puppeteer.launch({
      headless: !debugMode,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: debugMode ? 20 : 20,
    });

    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 600, deviceScaleFactor: 1 });

    done();
  });

  afterAll(async done => {
    await browser.close();

    done();
  });

  it('Is hidden and cannot be aceessed default', async done => {
    //  Load the page
    await page.goto(`http://${process.env.FRONTEND_URL}`);
    await page.waitForSelector('#level-creator');

    //  Check that the preview isn't on the page
    expect(await isDisplayed(page, '#level-preview')).toBe(false);

    //  Check that the preview button is disabled
    expect(await isDisplayed(page, '#btn-preview:disabled')).toBe(true);

    done();
  });

  it('Shows the preview when clicking on the "preview" button', async done => {
    //  Make a simple playable level
    await page.click('#tile-selector .tile:nth-child(2)');
    await page.click('#editor-grid .tile:nth-child(54)');
    await page.click('#editor-grid .tile:nth-child(55)');
    await page.click('#editor-grid .tile:nth-child(56)');
    await page.click('#tile-selector .tile:nth-child(3)');
    await page.click('#editor-grid .tile:nth-child(57)');

    //  Click the preview button
    expect(await isDisplayed(page, '#btn-preview:not(:disabled)')).toBe(true);
    await page.click('#btn-preview');

    // The level preview is hidden and the editor grid is showing
    expect(await isDisplayed(page, '#editor-grid')).toBe(false);
    expect(await isDisplayed(page, '#level-preview')).toBe(true);

    done();
  });

  it('Hides the preview when clicking on the "edit" button in preview mode', async done => {
    //  Click on the show editor button
    await page.click('#btn-edit');

    //  Level preview should be showing and the level preview should be hidden
    expect(await isDisplayed(page, '#editor-grid')).toBe(true);
    expect(await isDisplayed(page, '#level-preview')).toBe(false);

    done();
  });

  it('Disables the correct action bar buttons by default', async done => {
    //  Click on the show editor button
    await page.click('#btn-preview');

    //  Level preview should be showing and the level preview should be hidden
    expect(await isDisplayed(page, '#btn-edit:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-restart:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-undo:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-set-game-speed:not(:disabled)')).toBe(true);

    done();
  });

  //  @TODO: actually test that the game speed is changing correctly
  it('Allows a user to toggle the game speed', async done => {
    //  The game should be running at the normal speed
    expect(
      await page.evaluate(() => document.querySelector('#btn-set-game-speed').textContent),
    ).toBe('Speed: NORMAL');

    //  The game should be running at fast speed after
    //  clicking on the set game speed button
    await page.click('#btn-set-game-speed');
    expect(
      await page.evaluate(() => document.querySelector('#btn-set-game-speed').textContent),
    ).toBe('Speed: FAST');

    //  The game should revert back to normal speed after clicking on the button again
    await page.click('#btn-set-game-speed');
    expect(
      await page.evaluate(() => document.querySelector('#btn-set-game-speed').textContent),
    ).toBe('Speed: NORMAL');

    done();
  });

  //  @FIXME - may flake out if slowMo value is too high as it checks if buttons
  //  are disabled right after the keyboard event
  it('Allows the user to make moves', async done => {
    //  Snapshot the entities state
    expect(await getPreviewEntityPositions(page)).toMatchSnapshot();

    //  Use the keyboard to move the block left
    await page.keyboard.down('ArrowLeft');

    //  The "undo" and "restart" buttons should be disabled while
    //  entities are moving
    expect(await isDisplayed(page, '#btn-restart:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-undo:disabled')).toBe(true);

    //  The "undo" and "restart" buttons should enabled again
    //  once the entities have finished moving
    expect(!!await page.waitForSelector('#btn-restart:not(:disabled)')).toBe(true);
    expect(!!await page.waitForSelector('#btn-undo:not(:disabled)')).toBe(true);

    //  Check the game state matches the snapshot
    expect(await getPreviewEntityPositions(page)).toMatchSnapshot();

    //  Use the keyboard to move the block right
    await page.keyboard.press('ArrowRight');

    //  The "undo" and "restart" buttons should be disabled while
    //  entities are moving
    expect(await isDisplayed(page, '#btn-restart:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-undo:disabled')).toBe(true);

    //  The "undo" and "restart" buttons should enabled again
    //  once the entities have finished moving
    expect(!!await page.waitForSelector('#btn-restart:not(:disabled)')).toBe(true);
    expect(!!await page.waitForSelector('#btn-undo:not(:disabled)')).toBe(true);

    //  Check the game state matches the snapshot again
    expect(await getPreviewEntityPositions(page)).toMatchSnapshot();

    done();
  });

  //  @FIXME - brittle af
  it('Allows the user to undo moves', async done => {
    //  Undo the last move
    await page.click('#btn-undo');

    //  The "undo" and "restart" buttons should be disabled while
    //  entities are moving
    expect(await isDisplayed(page, '#btn-restart:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-undo:disabled')).toBe(true);

    //  The "undo" and "restart" buttons should enabled again
    //  once the entities have finished moving
    expect(!!await page.waitForSelector('#btn-restart:not(:disabled)')).toBe(true);
    expect(!!await page.waitForSelector('#btn-undo:not(:disabled)')).toBe(true);

    //  Undo once more
    await page.click('#btn-undo');

    //  The "undo" and "restart" buttons should be disabled while
    //  entities are moving
    expect(!!await page.waitForSelector('#btn-restart:disabled')).toBe(true);
    expect(!!await page.waitForSelector('#btn-undo:disabled')).toBe(true);

    //  Buttons should still be disabled after a pause since there are no
    //  moves left to undo
    //  @FIXME - bad. Check if entities have stopped moving instead of using sleep()
    await sleep(moveSleepDuration);
    expect(await isDisplayed(page, '#btn-restart:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-undo:disabled')).toBe(true);

    done();
  });

  //  @FIXME - replace sleep() with something better
  it('Allows the user to reset the game', async done => {
    //  Make some moves
    await page.keyboard.down('ArrowLeft');
    await sleep(moveSleepDuration);
    await page.keyboard.down('ArrowRight');
    await sleep(moveSleepDuration);
    await page.keyboard.down('ArrowLeft');
    await sleep(moveSleepDuration);

    //  Check the game state
    expect(await getPreviewEntityPositions(page)).toMatchSnapshot();

    //  Click on the "reset" button
    await page.click('#btn-restart');

    //  The "undo" and "restart" buttons should instantly be disbaled
    expect(!!await page.waitForSelector('#btn-restart:disabled')).toBe(true);
    expect(!!await page.waitForSelector('#btn-undo:disabled')).toBe(true);

    //  Buttons should still be disabled after entities have finished moving
    await sleep(moveSleepDuration);
    expect(!!await page.waitForSelector('#btn-restart:disabled')).toBe(true);
    expect(!!await page.waitForSelector('#btn-undo:disabled')).toBe(true);

    //  Check the game state
    expect(await getPreviewEntityPositions(page)).toMatchSnapshot();

    done();
  });
});
