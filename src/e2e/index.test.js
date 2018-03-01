import Nightmare from 'nightmare';

describe('The level creator', () => {
  const nightmare = new Nightmare({ show: false });
  const page = nightmare.goto('http://127.0.0.1:1337');

  it('Loads without any issues', async () => {
    const result = await page
      .exists('#level-creator');

    expect(result).toBe(true);
  });

  it('Shows the highlighted state when the user clicks on a tile', async () => {
    let borderStyle = await page
      .evaluate(() => (
        window.getComputedStyle(
          document.querySelector('#tile-selector .tile:nth-child(3)'),
          ':before',
        ).borderWidth
      ));

    expect(borderStyle).toBe('0px');

    borderStyle = await page
      .click('#tile-selector .tile:nth-child(3)')
      .evaluate(() => (
        window.getComputedStyle(
          document.querySelector('#tile-selector .tile:nth-child(3)'),
          ':before',
        ).borderWidth
      ));

    expect(borderStyle).toBe('2px');

    borderStyle = await page
      .click('#tile-selector .tile:nth-child(5)')
      .evaluate(() => (
        window.getComputedStyle(
          document.querySelector('#tile-selector .tile:nth-child(3)'),
          ':before',
        ).borderWidth
      ));

    expect(borderStyle).toBe('0px');

    borderStyle = await page
      .evaluate(() => (
        window.getComputedStyle(
          document.querySelector('#tile-selector .tile:nth-child(5)'),
          ':before',
        ).borderWidth
      ));

    expect(borderStyle).toBe('2px');
  });

  it('Updates tiles in the editor grid with the currently selected tile when clicked on', async () => {
    let backgroundColor = await page
      .evaluate(() => (
        window.getComputedStyle(
          document.querySelector('#editor-grid .tile:nth-child(54) > div'),
        ).backgroundColor
      ));

    expect(backgroundColor).toBe('rgb(51, 51, 51)');

    backgroundColor = await page
      .click('#editor-grid .tile:nth-child(54)')
      .evaluate(() => (
        window.getComputedStyle(
          document.querySelector('#editor-grid .tile:nth-child(54) > div'),
        ).backgroundColor
      ))
      .end();

    expect(backgroundColor).toBe('rgb(255, 255, 0)');
  });
});
