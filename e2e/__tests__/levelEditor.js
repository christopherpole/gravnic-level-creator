import puppeteer from 'puppeteer';
import dovenv from 'dotenv';

dovenv.config();

//  Set the timeout to 10 seconds. Good for when using slowMo for ddebugging
jest.setTimeout(10000);

describe('The level editor', () => {
  let browser;
  let page;

  beforeAll(async done => {
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
    await page.waitForSelector('#level-creator');
    done();
  });

  it('Shows the highlighted state when the user clicks on a tile', async done => {
    //  Assert that the selected border is present on the first tile
    let borderWidth = await page.evaluate(
      () =>
        window.getComputedStyle(
          document.querySelector('#tile-selector .tile:nth-child(1)'),
          ':before',
        ).borderWidth,
    );
    expect(borderWidth).toBe('2px');

    //  Assert that the initial border width of one of the other selector tiles is 0
    borderWidth = await page.evaluate(
      () =>
        window.getComputedStyle(
          document.querySelector('#tile-selector .tile:nth-child(3)'),
          ':before',
        ).borderWidth,
    );
    expect(borderWidth).toBe('0px');

    //  Click in that selector tile and assert that it now has a border
    await page.click('#tile-selector .tile:nth-child(3)');

    borderWidth = await page.evaluate(
      () =>
        window.getComputedStyle(
          document.querySelector('#tile-selector .tile:nth-child(3)'),
          ':before',
        ).borderWidth,
    );
    expect(borderWidth).toBe('2px');

    //  Assert that the original tile now doesn't have a border
    borderWidth = await page.evaluate(
      () =>
        window.getComputedStyle(
          document.querySelector('#tile-selector .tile:nth-child(1)'),
          ':before',
        ).borderWidth,
    );
    expect(borderWidth).toBe('0px');

    done();
  });

  it('Updates tiles in the editor grid with the currently selected tile when clicked on', async done => {
    //  Check that a tile is blank by defualt
    let backgroundColor = await page.evaluate(
      () =>
        window.getComputedStyle(document.querySelector('#editor-grid .tile:nth-child(54) > div'))
          .backgroundColor,
    );
    expect(backgroundColor).toBe('rgb(51, 51, 51)');

    //  Check that the tile changes color to the that of the currently
    //  selected tile after being clicked on
    await page.click('#editor-grid .tile:nth-child(54)');

    backgroundColor = await page.evaluate(
      () =>
        window.getComputedStyle(document.querySelector('#editor-grid .tile:nth-child(54) > div'))
          .backgroundColor,
    );
    expect(backgroundColor).toBe('rgb(255, 0, 0)');

    done();
  });

  it('Shows the preview placeholder when clicking on the "preview" button', async done => {
    //  Assert the editor grid is showing and the level preview is not showing
    let editorGridShowing = !!await page.$('#editor-grid');
    expect(editorGridShowing).toBe(true);

    let levelPreviewShowing = !!await page.$('#level-preview');
    expect(levelPreviewShowing).toBe(false);

    //  Click on the preview button and asset that the editor grid
    //  is hidden and the level preview is showing
    await page.click('#btn-preview');

    editorGridShowing = !!await page.$('#editor-grid');
    expect(editorGridShowing).toBe(false);

    levelPreviewShowing = !!await page.$('#level-preview');
    expect(levelPreviewShowing).toBe(true);

    done();
  });

  it('Hides the preview placeholder when clicking on the "edit" button in preview mode', async done => {
    await page.click('#btn-edit');

    const editorGridShowing = !!await page.$('#editor-grid');
    expect(editorGridShowing).toBe(true);

    const levelPreviewShowing = !!await page.$('#level-preview');
    expect(levelPreviewShowing).toBe(false);

    done();
  });

  it('Resets the level editor when the "Reset" button is clicked', async done => {
    //  All tiles are initally not blank
    let allTilesBlank = await page.evaluate(() => {
      const tiles = document.querySelectorAll('#editor-grid .tile > div');

      return (
        Array.prototype.slice
          .call(tiles)
          .filter(tile => window.getComputedStyle(tile).backgroundColor !== 'rgb(51, 51, 51)')
          .length === 0
      );
    });

    expect(allTilesBlank).toBe(false);

    //  All tiles are blank after resetting grid
    await page.click('#btn-reset');

    allTilesBlank = await page.evaluate(() => {
      const tiles = document.querySelectorAll('#editor-grid .tile > div');

      return (
        Array.prototype.slice
          .call(tiles)
          .filter(tile => window.getComputedStyle(tile).backgroundColor !== 'rgb(51, 51, 51)')
          .length === 0
      );
    });

    expect(allTilesBlank).toBe(true);

    done();
  });

  it('Allows users to set tiles by dragging the mouse over them', async done => {
    //  Drag the mouse over 5 tiles
    const { mouse } = page;
    await mouse.move(100, 100);
    await mouse.down();
    await mouse.move(200, 100, { steps: 10 });
    await mouse.move(200, 200, { steps: 10 });
    await mouse.up();

    //  Count the number of non-blank tiles and make sure that it's 5
    const nonBlankTilesCount = await page.evaluate(() => {
      const tiles = document.querySelectorAll('#editor-grid .tile > div');

      return Array.prototype.slice
        .call(tiles)
        .filter(tile => window.getComputedStyle(tile).backgroundColor !== 'rgb(51, 51, 51)').length;
    });

    expect(nonBlankTilesCount).toBe(5);

    //  Make sure that the tiles that have been dragged over are not blank
    const tilesAreUpdated = await page.evaluate(() => {
      const tiles = document.querySelectorAll(
        '#editor-grid .tile:nth-child(12) > div, #editor-grid .tile:nth-child(13) > div, #editor-grid .tile:nth-child(14) > div, #editor-grid .tile:nth-child(24) > div, #editor-grid .tile:nth-child(34) > div',
      );

      return (
        Array.prototype.slice
          .call(tiles)
          .filter(tile => window.getComputedStyle(tile).backgroundColor === 'rgb(255, 0, 0)')
          .length === 5
      );
    });

    expect(tilesAreUpdated).toBe(true);

    done();
  });
});
