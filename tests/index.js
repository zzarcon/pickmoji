const Pickmoji = require('../src');

const fixturesClassName = 'test-fixtures';
const fixturesClass = `.${fixturesClassName}`;
const createFixtureElement = _ => {
  const fixtureElement = document.createElement('div');
  
  fixtureElement.classList.add(fixturesClassName);
  document.body.appendChild(fixtureElement);

  return fixtureElement;
};
const initComponent = (options) => {
  const pickmoji = new Pickmoji(options);

  pickmoji.attachTo(fixturesClass);

  return pickmoji;
};

describe('Pickmoji', function() {
  let fixturesWrapper;

  before(function() {
    fixturesWrapper = createFixtureElement();
  });

  beforeEach(function() {
    
  });

  afterEach(function() {
    document.querySelector(fixturesClass).innerHTML = '';
  });

  it('Should be attached to the passed DOM selector', function() {
    const pickmoji = initComponent();

    assert.ok(fixturesWrapper.classList.contains('pickmoji'));
  });

  it('Should render a button to show the emojis', function() {
    const pickmoji = initComponent();

    assert.equal(fixturesWrapper.querySelectorAll('.js-toggle-emojis').length, 1);
  });

  it('Should render an emoji container when clicking on the button for first time', function() {
    const pickmoji = initComponent();

    fixturesWrapper.querySelector('.js-toggle-emojis').click();

    assert.equal(fixturesWrapper.querySelectorAll('.js-emoji-content').length, 1);
  });

  it('#show', function() {
    const pickmoji = initComponent();

    pickmoji.show();

    assert.equal(fixturesWrapper.querySelectorAll('.js-emoji-content').length, 1);
  });

  it('#hide', function() {
    const pickmoji = initComponent();

    pickmoji.hide();

    assert.equal(fixturesWrapper.querySelectorAll('.js-emoji-content').length, 0);
  });

  it('Should render all categories headers' ,function() {
    const pickmoji = initComponent();
    const categoriesLength = Object.keys(pickmoji.categories).length;

    pickmoji.show();

    const categoriesElement = fixturesWrapper.querySelector('.js-categories-header');

    assert.equal(fixturesWrapper.querySelectorAll('.js-categories-header').length, 1);
    assert.equal(
      fixturesWrapper.querySelectorAll('.js-categories-content .js-active-category').length,
      1
    );
    assert.equal(categoriesElement.children.length, categoriesLength);
  });

  it('Should show the initial category emojis by default', function() {
    const pickmoji = initComponent();

    pickmoji.show();

    const activeCategory = pickmoji.activeCategory;
    const activeCategoryEmojis = pickmoji.activeCategoryEmojis;
    const activeCategoryElement = fixturesWrapper.querySelector('.js-active-category');

    assert.equal(
      activeCategoryElement.getAttribute('data-category-name'),
      activeCategory
    );
    assert.equal(
      activeCategoryElement.querySelectorAll('li').length,
      activeCategoryEmojis.length
    );
  });

  it('User is able to switch active category')
  it.skip('#toggle', function() {

  });

  it.skip('Should hide component when clicking in the outside area', function() {

  });

  it.skip('Should be able to filter emojis by name', function() {

  });

  it.skip('Should show frequently used emojis', function() {

  });
});