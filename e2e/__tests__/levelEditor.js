import puppeteer from 'puppeteer';
import dovenv from 'dotenv';
import {
  getComputedStyleProperty,
  getNoOfElementsWithStyle,
  getNoOfElements,
  isDisplayed,
  getStarsValues,
} from '../testUtils';

dovenv.config();

const debugMode = false;

//  Set the timeout. Good for when using slowMo for debugging
jest.setTimeout(debugMode ? 20000 : 10000);

describe('The level editor', () => {
  let browser;
  let page;

  beforeAll(async done => {
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
    await page.waitForSelector('#level-creator');
    done();
  });

  it('Shows the highlighted state when the user clicks on a tile', async done => {
    //  The first element in the tile container should have the
    //  selected border from the start
    let borderWidth = await getComputedStyleProperty(
      page,
      'borderWidth',
      '#tile-selector .tile:nth-child(1)',
      ':before',
    );
    expect(borderWidth).toBe('2px');

    //  Assert that the initial border width of one of the other selector tiles is 0
    borderWidth = await getComputedStyleProperty(
      page,
      'borderWidth',
      '#tile-selector .tile:nth-child(4)',
      ':before',
    );
    expect(borderWidth).toBe('0px');

    //  Click in that selector tile and assert that it now has a border
    await page.click('#tile-selector .tile:nth-child(4)');
    borderWidth = await getComputedStyleProperty(
      page,
      'borderWidth',
      '#tile-selector .tile:nth-child(4)',
      ':before',
    );
    expect(borderWidth).toBe('2px');

    //  Assert that the original tile now doesn't have a border
    borderWidth = await getComputedStyleProperty(
      page,
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
      page,
      'backgroundColor',
      '#editor-grid .tile:nth-child(54) > div > div',
    );
    expect(backgroundColor).toBe('rgb(51, 51, 51)');

    //  Check that the tile changes color to the that of the
    //  currently selected tile after being clicked on
    await page.click('#editor-grid .tile:nth-child(54)');
    backgroundColor = await getComputedStyleProperty(
      page,
      'backgroundColor',
      '#editor-grid .tile:nth-child(54) > div > div',
    );
    expect(backgroundColor).toBe('rgb(255, 0, 0)');

    done();
  });

  it('Resets the level editor when the "Reset" button is clicked', async done => {
    //  One of the tiles should be colored
    let coloredTilesCount = await getNoOfElementsWithStyle(
      page,
      '#editor-grid .tile > div > div',
      'backgroundColor',
      'rgb(255, 0, 0)',
    );
    expect(coloredTilesCount).toBe(1);

    //  All tiles are blank after resetting grid
    await page.click('#btn-reset');
    coloredTilesCount = await getNoOfElementsWithStyle(
      page,
      '#editor-grid .tile > div > div',
      'backgroundColor',
      'rgb(255, 0, 0)',
    );
    expect(coloredTilesCount).toBe(0);

    //  Reset, solve and preview buttons should not be enabled
    expect(await isDisplayed(page, '#btn-reset:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-solve:disabled')).toBe(true);
    expect(await isDisplayed(page, '#btn-preview:disabled')).toBe(true);

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
    const coloredTilesCount = await getNoOfElementsWithStyle(
      page,
      '#editor-grid .tile > div > div',
      'backgroundColor',
      'rgb(255, 0, 0)',
    );
    expect(coloredTilesCount).toBe(5);

    done();
  });

  it('Allows the user to change the number of moves needed to obtain stars', async done => {
    //  Check the default values
    let starsValues = await getStarsValues(page);
    expect(starsValues).toEqual(['1', '2', '3']);

    //  Increase the 3-star moves and check that the others move with it
    //  @FIXME clickCount doesn't work?
    await page.click('#stars-editor > ul > li:nth-child(1) .btn-increment');
    await page.click('#stars-editor > ul > li:nth-child(1) .btn-increment');
    await page.click('#stars-editor > ul > li:nth-child(1) .btn-increment');
    starsValues = await getStarsValues(page);
    expect(starsValues).toEqual(['4', '4', '4']);

    //  Decrease the 1-star moves and check that the others move with it
    //  @FIXME clickCount doesn't work?
    await page.click('#stars-editor > ul > li:nth-child(3) .btn-decrement');
    await page.click('#stars-editor > ul > li:nth-child(3) .btn-decrement');
    await page.click('#stars-editor > ul > li:nth-child(3) .btn-decrement');
    starsValues = await getStarsValues(page);
    expect(starsValues).toEqual(['1', '1', '1']);

    done();
  });

  //  @TODO
  it('Allows the user to export the level');

  it('Allows the user to create links between linkable tiles', async done => {
    const { mouse } = page;
    await page.click('#btn-reset');

    //  Create a simple level with two teleporters
    await page.click('#tile-selector .tile:nth-child(51)');
    await page.click('#editor-grid .tile:nth-child(54)');
    await page.click('#editor-grid .tile:nth-child(56)');
    await page.click('#tile-selector .tile:nth-child(2)');
    await page.click('#editor-grid .tile:nth-child(53)');
    await page.click('#editor-grid .tile:nth-child(57)');
    await page.click('#tile-selector .tile:nth-child(4)');
    await page.click('#editor-grid .tile:nth-child(52)');
    await page.click('#editor-grid .tile:nth-child(58)');

    //  Get the start/end coords for the two teleporters
    const startingTile = await page.$('#editor-grid .tile:nth-child(54)');
    const finishingTile = await page.$('#editor-grid .tile:nth-child(56)');
    const startingTilePos = await startingTile.boundingBox();
    const finishingTilePos = await finishingTile.boundingBox();

    //  Drag the start dragging from the starting tile
    await mouse.move(startingTilePos.x + 10, startingTilePos.y + 10);
    await mouse.down();

    //  Ensure that no tiles have the darkened out state just yet
    let nonTeleporterOpacity = await getComputedStyleProperty(
      page,
      'opacity',
      '#editor-grid .tile:nth-child(1)',
      ':after',
    );
    expect(nonTeleporterOpacity).toBe('1');
    let teleporterOpacity = await getComputedStyleProperty(
      page,
      'opacity',
      '#editor-grid .tile:nth-child(54)',
      ':after',
    );
    expect(teleporterOpacity).toBe('1');

    //  Drag to the end tile
    await mouse.move(finishingTilePos.x + 10, finishingTilePos.y + 10, { steps: 5 });

    //  Ensure the any non-linkable tiles are darkened
    nonTeleporterOpacity = await getComputedStyleProperty(
      page,
      'opacity',
      '#editor-grid .tile:nth-child(1)',
      ':after',
    );
    expect(nonTeleporterOpacity).toBe('0.5');
    teleporterOpacity = await getComputedStyleProperty(
      page,
      'opacity',
      '#editor-grid .tile:nth-child(54)',
      ':after',
    );
    expect(teleporterOpacity).toBe('1');

    //  Check that a link has been created
    let noOfLinks = await getNoOfElements(page, 'svg line');
    expect(noOfLinks).toBe(1);

    //  Stop dragging
    await mouse.up();

    //  Ensure that non-linkable tiles are no longer darkened
    nonTeleporterOpacity = await getComputedStyleProperty(
      page,
      'opacity',
      '#editor-grid .tile:nth-child(1)',
      ':after',
    );
    expect(nonTeleporterOpacity).toBe('1');

    //  Ensure that the link still remains but is slightly faded
    noOfLinks = await getNoOfElements(page, 'svg line');
    expect(noOfLinks).toBe(1);
    const lineOpacity = await getComputedStyleProperty(page, 'opacity', '#link-display');
    expect(lineOpacity).toBe('0.5');

    done();
  });

  it('Does not allow a user to create the same link twice', async done => {
    const { mouse } = page;

    //  Get the start/end coords for the two teleporters
    const startingTile = await page.$('#editor-grid .tile:nth-child(56)');
    const finishingTile = await page.$('#editor-grid .tile:nth-child(54)');
    const startingTilePos = await startingTile.boundingBox();
    const finishingTilePos = await finishingTile.boundingBox();

    //  Try and create a new link over the existing one in the other direction
    await mouse.move(startingTilePos.x + 10, startingTilePos.y + 10);
    await mouse.down();
    await mouse.move(finishingTilePos.x + 10, finishingTilePos.y + 10, { steps: 5 });
    await mouse.up();

    //  Ensure that there is still only one link
    const noOfLinks = await getNoOfElements(page, 'svg line');
    expect(noOfLinks).toBe(1);

    done();
  });

  it('Removes all links from a tile that gets updated', async done => {
    //  Overwrite one of the teleporters with another teleporter
    await page.click('#tile-selector .tile:nth-child(51)');
    await page.click('#editor-grid .tile:nth-child(54)');

    //  Ensure that all links have been removed
    const noOfLinks = await getNoOfElements(page, 'svg line');
    expect(noOfLinks).toBe(0);

    done();
  });

  it('Does not allow a user to create a link to a non-linkable tile', async done => {
    const { mouse } = page;

    //  Get the start/end coords for the two teleporters
    const startingTile = await page.$('#editor-grid .tile:nth-child(54)');
    const finishingTile = await page.$('#editor-grid .tile:nth-child(55)');
    const startingTilePos = await startingTile.boundingBox();
    const finishingTilePos = await finishingTile.boundingBox();

    //  Try and create a new link over the existing one in the other direction
    await mouse.move(startingTilePos.x + 10, startingTilePos.y + 10);
    await mouse.down();
    await mouse.move(finishingTilePos.x + 10, finishingTilePos.y + 10, { steps: 5 });
    await mouse.up();

    //  Ensure that there are no links
    const noOfLinks = await getNoOfElements(page, 'svg line');
    expect(noOfLinks).toBe(0);

    done();
  });

  it('Removes all links when resetting a level', async done => {
    const { mouse } = page;

    //  Get the start/end coords for the two teleporters
    const startingTile = await page.$('#editor-grid .tile:nth-child(54)');
    const finishingTile = await page.$('#editor-grid .tile:nth-child(56)');
    const startingTilePos = await startingTile.boundingBox();
    const finishingTilePos = await finishingTile.boundingBox();

    //  Try and create a new link over the existing one in the other direction
    await mouse.move(startingTilePos.x + 10, startingTilePos.y + 10);
    await mouse.down();
    await mouse.move(finishingTilePos.x + 10, finishingTilePos.y + 10, { steps: 5 });
    await mouse.up();

    //  Ensure that there is one link
    let noOfLinks = await getNoOfElements(page, 'svg line');
    expect(noOfLinks).toBe(1);

    //  Reset the editor tiles
    await page.click('#btn-reset');

    //  Ensure that there are no links
    noOfLinks = await getNoOfElements(page, 'svg line');
    expect(noOfLinks).toBe(0);

    done();
  });
});
