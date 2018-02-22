import Nightmare from 'nightmare';

describe('The level creator', () => {
  let nightmare;
  let page;

  beforeAll(() => {
    nightmare = new Nightmare({ show: false });
    page = nightmare.goto('http://127.0.0.1:1337');
  });

  it('Loads without any issues', async () => {
    const result = await page
      .exists('#level-creator');

    expect(result).toBe(true);
  });

  it('Shows the tile selector', async () => {
    const result = await page
      .exists('#tile-selector');

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

  afterAll(() => {
    page.end();
  });
});
