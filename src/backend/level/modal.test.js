const Level = require('./model');

describe('Level model', () => {
  it('should allow a valid Level instance to be created', (done) => {
    const level = new Level({
      name: 'test1',
      tiles: [1, 2, 3],
    });

    level.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });

  // it('should be invalid if name is empty', done => {
  //   var level = new Level();

  //   level.validate(err => {console.log(err)
  //       expect(err.errors.name).toBeDefined();
  //       done();
  //   });
  // });
});
