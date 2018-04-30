import puppeteer from 'puppeteer';
import dovenv from 'dotenv';

dovenv.config();

const debugMode = false;

//  Set the timeout. Good for when using slowMo for debugging
jest.setTimeout(debugMode ? 10000 : 5000);

describe('The level editor', () => {
  let browser;
  let page;

  //  Retrieves the border width for the :before pseudoelement
  const getComputedStyleProperty = (property, selector, pseudoelement) =>
    page.evaluate(
      (property2, selector2, pseudoelement2) =>
        window.getComputedStyle(document.querySelector(selector2), pseudoelement2)[property2],
      property,
      selector,
      pseudoelement,
    );

  //  Returns the number of elements with with the given selector whose
  //  given CSS property matches the given value
  const getNoNoOfElementsWithStyle = async (selector, property, value) =>
    page.evaluate(
      (selector2, property2, value2) =>
        Array.prototype.slice
          .call(document.querySelectorAll(selector2))
          .filter(tile => window.getComputedStyle(tile)[property2] === value2).length,
      selector,
      property,
      value,
    );

  //  Returns "true" if given selector is in the DOM and "false" otherwise
  const isDisplayed = async selector => !!await page.$(selector);

  beforeAll(async done => {
    browser = await puppeteer.launch({
      headless: !debugMode,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: debugMode ? 200 : 20,
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
    await page.waitForSelector('#level-creator');
    done();
  });

  it('Shows the highlighted state when the user clicks on a tile', async done => {
    //  The first element in the tile container should have the
    //  selected border from the start
    let borderWidth = await getComputedStyleProperty(
      'borderWidth',
      '#tile-selector .tile:nth-child(1)',
      ':before',
    );
    expect(borderWidth).toBe('2px');

    //  Assert that the initial border width of one of the other selector tiles is 0
    borderWidth = await getComputedStyleProperty(
      'borderWidth',
      '#tile-selector .tile:nth-child(3)',
      ':before',
    );
    expect(borderWidth).toBe('0px');

    //  Click in that selector tile and assert that it now has a border
    await page.click('#tile-selector .tile:nth-child(3)');
    borderWidth = await getComputedStyleProperty(
      'borderWidth',
      '#tile-selector .tile:nth-child(3)',
      ':before',
    );
    expect(borderWidth).toBe('2px');

    //  Assert that the original tile now doesn't have a border
    borderWidth = await getComputedStyleProperty(
      'borderWidth',
      '#tile-selector .tile:nth-child(1)',
      ':before',
    );
    expect(borderWidth).toBe('0px');

    done();
  });

  it('Updates tiles in the editor grid with the currently selected tile when clicked on', async done => {
    //  Check that a tile is blank by defualt
    let backgroundColor = await getComputedStyleProperty(
      'backgroundColor',
      '#editor-grid .tile:nth-child(54) > div',
    );
    expect(backgroundColor).toBe('rgb(51, 51, 51)');

    //  Check that the tile changes color to the that of the
    //  currently selected tile after being clicked on
    await page.click('#editor-grid .tile:nth-child(54)');
    backgroundColor = await getComputedStyleProperty(
      'backgroundColor',
      '#editor-grid .tile:nth-child(54) > div',
    );
    expect(backgroundColor).toBe('rgb(255, 0, 0)');

    done();
  });

  it('Shows the preview placeholder when clicking on the "preview" button', async done => {
    //  The editor grid is showing
    let editorGridShowing = await isDisplayed('#editor-grid');
    expect(editorGridShowing).toBe(true);

    // The level preview is hidden
    let levelPreviewShowing = await isDisplayed('#level-preview');
    expect(levelPreviewShowing).toBe(false);

    //  Click on the preview button
    await page.click('#btn-preview');

    //  Editor grid should be hidden
    editorGridShowing = await isDisplayed('#editor-grid');
    expect(editorGridShowing).toBe(false);

    //  Level preview should be showing
    levelPreviewShowing = await isDisplayed('#level-preview');
    expect(levelPreviewShowing).toBe(true);

    done();
  });

  it('Hides the preview placeholder when clicking on the "edit" button in preview mode', async done => {
    //  Click on the show editor button
    await page.click('#btn-edit');

    //  Level preview should be showing
    const editorGridShowing = await isDisplayed('#editor-grid');
    expect(editorGridShowing).toBe(true);

    //  Level preview should be hidden
    const levelPreviewShowing = await isDisplayed('#level-preview');
    expect(levelPreviewShowing).toBe(false);

    done();
  });

  it('Resets the level editor when the "Reset" button is clicked', async done => {
    //  One of the tiles should be colored
    let coloredTilesCount = await getNoNoOfElementsWithStyle(
      '#editor-grid .tile > div',
      'backgroundColor',
      'rgb(255, 0, 0)',
    );
    expect(coloredTilesCount).toBe(1);

    //  All tiles are blank after resetting grid
    await page.click('#btn-reset');
    coloredTilesCount = await getNoNoOfElementsWithStyle(
      '#editor-grid .tile > div',
      'backgroundColor',
      'rgb(255, 0, 0)',
    );
    expect(coloredTilesCount).toBe(0);

    //  Reset and preview buttons should not be enabled
    expect(await isDisplayed('#btn-reset:disabled')).toBe(true);
    expect(await isDisplayed('#btn-preview:disabled')).toBe(true);

    done();
  });

  it('Allows users to set tiles by dragging the mouse over them', async done => {
    //  Drag the mouse over 5 tiles
    const { mouse } = page;

    //  Get the coords of the starting/finishing tiles
    const startingTile = await page.$('#editor-grid .tile:nth-child(13)');
    const finishingTile = await page.$('#editor-grid .tile:nth-child(35)');
    const startingTilePos = await startingTile.boundingBox();
    const finishingTilePos = await finishingTile.boundingBox();

    //  Drag the cursor right first and then down toward to the finishing tile
    await mouse.move(startingTilePos.x + 10, startingTilePos.y + 10);
    await mouse.down();
    await mouse.move(finishingTilePos.x + 10, startingTilePos.y + 10, { steps: 5 });
    await mouse.move(finishingTilePos.x + 10, finishingTilePos.y + 10, { steps: 5 });
    await mouse.up();

    //  Count the number of colored tiles and make sure that it's 5
    const coloredTilesCount = await getNoNoOfElementsWithStyle(
      '#editor-grid .tile > div',
      'backgroundColor',
      'rgb(255, 0, 0)',
    );
    expect(coloredTilesCount).toBe(5);

    done();
  });

  it('Allows the user to change the number of moves needed to obtain stars', async done => {
    //  Gets the values of the stars
    const getStarsValues = async () =>
      page.evaluate(() =>
        Array.prototype.slice
          .call(document.querySelectorAll('#stars-editor > ul > li > span'))
          .map(span => span.innerText),
      );

    //  Check the default values
    let starsValues = await getStarsValues();
    expect(starsValues).toEqual(['1', '2', '3']);

    //  Increase the 3-star moves and check that the others move with it
    //  @FIXME clickCount doesn't work?
    await page.click('#stars-editor > ul > li:nth-child(1) .btn-increment');
    await page.click('#stars-editor > ul > li:nth-child(1) .btn-increment');
    await page.click('#stars-editor > ul > li:nth-child(1) .btn-increment');
    starsValues = await getStarsValues();
    expect(starsValues).toEqual(['4', '4', '4']);

    //  Decrease the 1-star moves and check that the others move with it
    //  @FIXME clickCount doesn't work?
    await page.click('#stars-editor > ul > li:nth-child(3) .btn-decrement');
    await page.click('#stars-editor > ul > li:nth-child(3) .btn-decrement');
    await page.click('#stars-editor > ul > li:nth-child(3) .btn-decrement');
    starsValues = await getStarsValues();
    expect(starsValues).toEqual(['1', '1', '1']);

    done();
  });
});
