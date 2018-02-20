import Nightmare from 'nightmare';

const nightmare = new Nightmare();

describe('The level creator', () => {
  it('loads without any issues', async () => {
    const page = nightmare.goto(`http://127.0.0.1:${process.env.PORT}`);

    const result = await page
      .exists('#level-creator')
      .end();

    expect(result).toBe(true);
  });
});
