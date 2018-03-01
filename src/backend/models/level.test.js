const Level = require('./level');

describe('The level model', () => {
  let testLevel;

  beforeEach(() => {
    testLevel = new Level({
      name: 'Test Level 1',
      tiles: [...Array(100)].map((_, index) => ({
        selectedTileId: '0',
        position: index,
      })),
    });
  });

  it('Allows a valid Level instance to be created', (done) => {
    testLevel.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });

  it('Does not allow invalid levels', (done) => {
    const level = new Level();

    level.validate((err) => {
      expect(err.errors.name).toBeDefined();
      expect(err.errors.tiles).toBeDefined();
      done();
    });
  });
});
