const Level = require('./level');

describe('Level()', () => {
  let testLevel;

  beforeEach(() => {
    testLevel = new Level({
      name: 'Test Level 1',
      tiles: [...Array(100)].map((_, index) => ({
        selectedTileId: '0',
        position: index,
      })),
      stars: [1, 2, 3],
      position: 11,
      solution: ['UP'],
      maxMoves: 5,
      links: [{ from: 1, to: 2 }, { from: 2, to: 3 }],
    });
  });

  it('Allows a valid Level instance to be created', done => {
    testLevel.validate(err => {
      expect(err).toBe(null);
      done();
    });
  });

  it('Does not allow invalid levels', done => {
    const level = new Level();

    level.validate(err => {
      expect(err.errors.name).toBeDefined();
      expect(err.errors.tiles).toBeDefined();
      expect(err.errors.stars).toBeDefined();
      expect(err.errors.position).toBeDefined();
      done();
    });
  });

  it('Formats a level to JSON correctly', () => {
    const testLevelJson = testLevel.toJSON();

    expect(testLevelJson.name).toBe(testLevel.name);
    expect(testLevelJson.tiles instanceof Array).toBe(true);
    expect(testLevelJson.tiles[0]._id).toBe(undefined);
    expect(typeof testLevelJson.tiles[0].position).toBe('number');
    expect(typeof testLevelJson.tiles[0].selectedTileId).toBe('string');
    expect(typeof testLevelJson.id).toBe('object');
    expect(testLevelJson.stars).toEqual([1, 2, 3]);
    expect(testLevelJson.position).toEqual(11);
    expect(testLevelJson._id).toBe(undefined);
    expect(testLevelJson.__v).toBe(undefined);
    expect(testLevelJson.solution).toEqual(['UP']);
    expect(testLevelJson.maxMoves).toEqual(5);
    expect(testLevelJson.links).toEqual([{ from: 1, to: 2 }, { from: 2, to: 3 }]);
  });
});
