import { StratEgoClientPage } from './app.po';

describe('strat-ego-client App', function() {
  let page: StratEgoClientPage;

  beforeEach(() => {
    page = new StratEgoClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
