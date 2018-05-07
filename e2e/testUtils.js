/**
 * Retrieves the computed style of the given property for the given selector
 * @param {Object} page - The current Pupeteer page
 * @param {String} property - The property to check the value of
 * @param {String} selector - A selector string for the element to check
 * @param {String} [pseudoelement] - An selector for a pseudoelement
 * @returns {String} The value of the computed style
 */
export const getComputedStyleProperty = (page, property, selector, pseudoelement) =>
  page.evaluate(
    (property2, selector2, pseudoelement2) =>
      window.getComputedStyle(document.querySelector(selector2), pseudoelement2)[property2],
    property,
    selector,
    pseudoelement,
  );

/**
 * Returns the number of elements with from the given selector
 * whose computed style of the given property matches the given value
 * @param {Object} page - The current Pupeteer page
 * @param {String} selector - A selector string for the element to check
 * @param {String} property - The property to check the value of
 * @param {String} value - The value to check the computed style against
 * @returns {Number} The number of elements that match the given params
 */
export const getNoOfElementsWithStyle = (page, selector, property, value) =>
  page.evaluate(
    (selector2, property2, value2) =>
      Array.prototype.slice
        .call(document.querySelectorAll(selector2))
        .filter(tile => window.getComputedStyle(tile)[property2] === value2).length,
    selector,
    property,
    value,
  );

/**
 * Determines whether or not the the given selector is currently displayed in the DOM
 * @param {Object} page - The current Pupeteer page
 * @param {String} selector - A selector string for the element to check
 * @returns {Boolean} "true" is the element is on the page and "false" otherwise
 */
export const isDisplayed = async (page, selector) => !!await page.$(selector);

/**
 * Returns the number of elements on the page that match the given selector
 * @param {Object} page - The current Pupeteer page
 * @param {String} selector - A selector string for the element to check
 * @returns {Number} The number of elements on the page
 */
export const getNoOfElements = async (page, selector) => page.$$eval(selector, eles => eles.length);

/**
 * Reads the values of the star requirements from the DOM
 * @param {Object} page - The current Pupeteer page
 * @returns {String[]} An array of the star requrements for this level
 */
export const getStarsValues = page =>
  page.evaluate(() =>
    Array.prototype.slice
      .call(document.querySelectorAll('#stars-editor > ul > li > span'))
      .map(span => span.innerText),
  );

/**
 * Returns a Promise which will resolve after the given time
 * @param {Number} ms - The number of miliseconds before the Promise resolves
 * @returns {Function} A Promise which will resolve after the elapsed time
 */
export const sleep = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

/**
 * Returns a representation of the left/top styles on the preview entities
 * @param {Object} page - The current Pupeteer page
 * @returns {Array} An array of objects with the top/left styles for each preview entity
 */
export const getPreviewEntityPositions = async page =>
  page.evaluate(() =>
    Array.from(document.querySelectorAll('#tiles-container > div')).map(tile => {
      const tileStyles = window.getComputedStyle(tile);

      return {
        left: tileStyles.left,
        top: tileStyles.top,
      };
    }),
  );

/**
 * Check that the editor grid tiles match those of the first preview level's
 * @param {Object} page - The current Pupeteer page
 * @returns {Boolean} "true" if the preview matches the editor tiles and false otherwise
 */
export const editorTilesMatchPreviewTiles = async page =>
  page.evaluate(
    () =>
      Array.prototype.slice
        .call(document.querySelectorAll('#editor-grid .tile > div'))
        .filter(
          (tile, index) =>
            window.getComputedStyle(tile).backgroundColor !==
            window.getComputedStyle(
              document.querySelector(
                `.level:first-child .level-preview .preview-tile:nth-child(${index + 1}) > div`,
              ),
            ).backgroundColor,
        ).length === 0,
  );
