import puppeteer from 'puppeteer';
import dovenv from 'dotenv';
import {
  isDisplayed,
  getPreviewEntityPositions,
  sleep,
  getNoOfElementsWithStyle,
  getStarsValues,
  getNoOfElements,
  getComputedStyleProperty,
} from '../testUtils';

dovenv.config();

const debugMode = false;
const moveSleepDuration = debugMode ? 1500 : 1000;

//  Set the timeout. Good for when using slowMo for debugging
jest.setTimeout(debugMode ? 15000 : 10000);

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
    await page.click('#tile-selector .tile:nth-child(4)');
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

  it('Disables the correct buttons by default', async done => {
    //  Click on the show editor button
    await page.click('#btn-preview');

    //  "Restart" and "Undo" buttons should be disabled
    expect(await isDisplayed(page, '#btn-edit:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-restart:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-undo:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-set-game-speed:not(:disabled)')).toBe(true);

    //  All star editor buttons should be disabled
    expect(
      await page.evaluate(
        () => document.querySelectorAll('.btn-increment:disabled, .btn-decrement:disabled').length,
      ),
    ).toBe(6);

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

  it("Doesn't allow the user to move in the same direction twice", async done => {
    //  Use the keyboard to move the block left
    await page.keyboard.down('ArrowRight');

    //  The "undo" and "restart" buttons shouldn't be disabled
    expect(await isDisplayed(page, '#btn-restart:not(:disabled)')).toBe(true);
    expect(await isDisplayed(page, '#btn-undo:not(:disabled)')).toBe(true);

    //  Check the moves made counter
    expect(await page.evaluate(() => document.querySelector('#moves-made-label').textContent)).toBe(
      'Moves made: 2',
    );

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
    await sleep(moveSleepDuration);

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

  //  @FIXME - use of sleep()
  it('Grays stars when the number of moves made exceeds their requirements', async done => {
    const getNoOfActiveLabels = async () =>
      getNoOfElementsWithStyle(page, '.stars-container > span', 'color', 'rgb(238, 238, 238)');

    const getNoOfActiveStars = async () =>
      getNoOfElementsWithStyle(page, '.stars-container svg path', 'fill', 'rgb(255, 255, 255)');

    //  Check that the star requirements are 1, 2 and 3
    expect(await getStarsValues(page)).toEqual(['1', '2', '3']);

    //  Check that all of the star labels and icons are white
    expect(await getNoOfActiveLabels()).toBe(3);
    expect(await getNoOfActiveStars()).toBe(6);

    //  Make a move
    await page.keyboard.down('ArrowLeft');
    await sleep(moveSleepDuration);

    //  Star labels and icons are still white
    expect(await getNoOfActiveLabels()).toBe(3);
    expect(await getNoOfActiveStars()).toBe(6);

    //  Make another move
    await page.keyboard.down('ArrowRight');
    await sleep(moveSleepDuration);

    //  The three-star requirement is no longer white
    expect(await getNoOfActiveLabels()).toBe(2);
    expect(await getNoOfActiveStars()).toBe(3);

    //  Make another move
    await page.keyboard.down('ArrowLeft');
    await sleep(moveSleepDuration);

    //  The two-star requirement is no longer white
    expect(await getNoOfActiveLabels()).toBe(1);
    expect(await getNoOfActiveStars()).toBe(1);

    //  Make one move move
    await page.keyboard.down('ArrowRight');
    await sleep(moveSleepDuration);

    //  No stars are white
    expect(await getNoOfActiveLabels()).toBe(0);
    expect(await getNoOfActiveStars()).toBe(0);

    //  All is white again after restarting the level
    await page.click('#btn-restart');
    await sleep(moveSleepDuration);
    expect(await getNoOfActiveLabels()).toBe(3);
    expect(await getNoOfActiveStars()).toBe(6);

    done();
  });

  it('Shows the correct moves on the move history display', async done => {
    //  The move history display should be in its initial state
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(0);
    expect(await page.evaluate(() => document.querySelector('#moves-made-label').textContent)).toBe(
      'Moves made: 0',
    );

    //  The move history displays correctly after moving up
    await page.keyboard.down('ArrowUp');
    await sleep(moveSleepDuration);
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(1);
    expect(await page.evaluate(() => document.querySelector('#moves-made-label').textContent)).toBe(
      'Moves made: 1',
    );
    expect(
      await getComputedStyleProperty(
        page,
        'transform',
        '#move-icons-container > svg:nth-child(1) path',
      ),
    ).toBe('matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)');

    //  The move history displays correctly after moving left
    await page.keyboard.down('ArrowLeft');
    await sleep(moveSleepDuration);
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(2);
    expect(await page.evaluate(() => document.querySelector('#moves-made-label').textContent)).toBe(
      'Moves made: 2',
    );
    expect(
      await getComputedStyleProperty(
        page,
        'transform',
        '#move-icons-container > svg:nth-child(2) path',
      ),
    ).toBe('matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)');

    //  The move history displays correctly after moving right
    await page.keyboard.down('ArrowRight');
    await sleep(moveSleepDuration);
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(3);
    expect(await page.evaluate(() => document.querySelector('#moves-made-label').textContent)).toBe(
      'Moves made: 3',
    );
    expect(
      await getComputedStyleProperty(
        page,
        'transform',
        '#move-icons-container > svg:nth-child(3) path',
      ),
    ).toBe('matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)');

    //  The move history displays correctly after moving down
    await page.keyboard.down('ArrowDown');
    await sleep(moveSleepDuration);
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(4);
    expect(await page.evaluate(() => document.querySelector('#moves-made-label').textContent)).toBe(
      'Moves made: 4',
    );
    expect(
      await getComputedStyleProperty(
        page,
        'transform',
        '#move-icons-container > svg:nth-child(4) path',
      ),
    ).toBe('matrix(1, 0, 0, 1, 0, 0)');

    //  It should update when moves get undone
    await page.click('#btn-undo');
    await sleep(moveSleepDuration);
    await page.click('#btn-undo');
    await sleep(moveSleepDuration);
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(2);
    expect(await page.evaluate(() => document.querySelector('#moves-made-label').textContent)).toBe(
      'Moves made: 2',
    );

    //  It should return to the initial state when reset
    await page.click('#btn-restart');
    await sleep(moveSleepDuration);
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(0);
    expect(await page.evaluate(() => document.querySelector('#moves-made-label').textContent)).toBe(
      'Moves made: 0',
    );

    //  It should reset when entering the level preview
    await page.keyboard.down('ArrowDown');
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(1);
    await page.click('#btn-edit');
    await page.click('#btn-preview');
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(0);

    done();
  });

  it('Should display a "level complete" overlay when the level is complete', async done => {
    //  Go to the edit screen and add another block
    await page.click('#btn-edit');
    await page.click('#editor-grid .tile:nth-child(54)');

    //  Go to the level preview and complete the level
    await page.click('#btn-preview');
    await page.keyboard.down('ArrowLeft');
    await sleep(moveSleepDuration);

    //  Snapshot the entities state
    expect(await getPreviewEntityPositions(page)).toMatchSnapshot();

    //  Ensure that the level complete overlay is showing
    expect(await isDisplayed(page, '#level-complete-overlay')).toBe(true);

    //  No moves should be able to be made when the overlay is showing
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(1);
    await page.keyboard.down('ArrowLeft');
    await sleep(moveSleepDuration);
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(1);
    expect(await getPreviewEntityPositions(page)).toMatchSnapshot();

    //  The overlay should disappear on clicking "undo"
    expect(await isDisplayed(page, '#level-complete-overlay')).toBe(true);
    await page.click('#btn-undo');
    expect(await isDisplayed(page, '#level-complete-overlay')).toBe(false);
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(0);
    await sleep(moveSleepDuration);
    expect(await getPreviewEntityPositions(page)).toMatchSnapshot();

    //  Show the overlay again
    await page.keyboard.down('ArrowLeft');
    await sleep(moveSleepDuration);

    //  The overlay should disappear on clicking "reset"
    expect(await isDisplayed(page, '#level-complete-overlay')).toBe(true);
    await page.click('#btn-restart');
    await sleep(moveSleepDuration);
    expect(await isDisplayed(page, '#level-complete-overlay')).toBe(false);
    expect(await getNoOfElements(page, '#move-icons-container > svg')).toBe(0);
    await sleep(moveSleepDuration);
    expect(await getPreviewEntityPositions(page)).toMatchSnapshot();

    done();
  });

  it('Should display the "level complete" overlay stright away when previewing a level with no matchable entities', async done => {
    //  Go back to the editor and reset it
    await page.click('#btn-edit');
    await page.click('#btn-reset');

    //  Just two floor tiles
    await page.click('#tile-selector .tile:nth-child(2)');
    await page.click('#editor-grid .tile:nth-child(54)');
    await page.click('#editor-grid .tile:nth-child(55)');

    //  Open previewing the level, the "level complete" overlay should show after a short delay
    await page.click('#btn-preview');
    await sleep(moveSleepDuration);
    expect(await isDisplayed(page, '#level-complete-overlay')).toBe(true);

    done();
  });

  it('Should display the "level complete" overlay stright away when previewing a complete level', async done => {
    //  Go back to the editor and reset it
    await page.click('#btn-edit');

    //  Just two floor tiles
    await page.click('#tile-selector .tile:nth-child(4)');
    await page.click('#editor-grid .tile:nth-child(54)');
    await page.click('#editor-grid .tile:nth-child(55)');

    //  Open previewing the level, the "level complete" overlay should show after a short delay
    await page.click('#btn-preview');
    await sleep(moveSleepDuration);
    expect(await isDisplayed(page, '#level-complete-overlay')).toBe(true);

    done();
  });
});
