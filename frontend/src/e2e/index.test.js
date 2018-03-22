import Nightmare from 'nightmare';

describe('The level creator', () => {
  const nightmare = new Nightmare({ show: false });
  const page = nightmare.goto('http://127.0.0.1:1337');

  afterAll(async done => {
    await page.end();
    done();
  });

  it('Loads without any issues', async () => {
    const result = await page.exists('#level-creator');

    expect(result).toBe(true);
  });

  it('Shows the highlighted state when the user clicks on a tile', async () => {
    let borderStyle = await page.evaluate(
      () =>
        window.getComputedStyle(
          document.querySelector('#tile-selector .tile:nth-child(3)'),
          ':before',
        ).borderWidth,
    );

    expect(borderStyle).toBe('0px');

    borderStyle = await page
      .click('#tile-selector .tile:nth-child(3)')
      .evaluate(
        () =>
          window.getComputedStyle(
            document.querySelector('#tile-selector .tile:nth-child(3)'),
            ':before',
          ).borderWidth,
      );

    expect(borderStyle).toBe('2px');

    borderStyle = await page
      .click('#tile-selector .tile:nth-child(5)')
      .evaluate(
        () =>
          window.getComputedStyle(
            document.querySelector('#tile-selector .tile:nth-child(3)'),
            ':before',
          ).borderWidth,
      );

    expect(borderStyle).toBe('0px');

    borderStyle = await page.evaluate(
      () =>
        window.getComputedStyle(
          document.querySelector('#tile-selector .tile:nth-child(5)'),
          ':before',
        ).borderWidth,
    );

    expect(borderStyle).toBe('2px');
  });

  it('Updates tiles in the editor grid with the currently selected tile when clicked on', async () => {
    let backgroundColor = await page.evaluate(
      () =>
        window.getComputedStyle(document.querySelector('#editor-grid .tile:nth-child(54) > div'))
          .backgroundColor,
    );

    expect(backgroundColor).toBe('rgb(51, 51, 51)');

    backgroundColor = await page
      .click('#editor-grid .tile:nth-child(54)')
      .evaluate(
        () =>
          window.getComputedStyle(document.querySelector('#editor-grid .tile:nth-child(54) > div'))
            .backgroundColor,
      );

    expect(backgroundColor).toBe('rgb(255, 255, 0)');
  });

  it('Shows the preview placeholder when clicking on the "preview" button', async () => {
    const editorGridShowing = await page.click('#btn-preview').exists('#editor-grid');
    expect(editorGridShowing).toBe(false);

    const levelPreviewShowing = await page.exists('#level-preview');
    expect(levelPreviewShowing).toBe(true);
  });

  it('Hides the preview placeholder when clicking on the "edit" button in preview mode', async () => {
    const editorGridShowing = await page.click('#btn-edit').exists('#editor-grid');
    expect(editorGridShowing).toBe(true);

    const levelPreviewShowing = await page.exists('#level-preview');
    expect(levelPreviewShowing).toBe(false);
  });

  it('Resets the level editor when the "Reset" button is clicked', async () => {
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
    allTilesBlank = await page.click('#btn-reset').evaluate(() => {
      const tiles = document.querySelectorAll('#editor-grid .tile > div');

      return (
        Array.prototype.slice
          .call(tiles)
          .filter(tile => window.getComputedStyle(tile).backgroundColor !== 'rgb(51, 51, 51)')
          .length === 0
      );
    });

    expect(allTilesBlank).toBe(true);
  });
});