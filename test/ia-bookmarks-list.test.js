import {
  html,
  fixture,
  expect,
  oneEvent,
} from '@open-wc/testing';
import { IABookmarksList } from '../src/ia-bookmarks-list.js';

customElements.define('ia-bookmarks-list', IABookmarksList);

const container = (bookmarks = []) => (
  html`<ia-bookmarks-list .bookmarks=${bookmarks}></ia-bookmarks-list>`
);

const bookmarks = [{
  id: 1,
  thumbnail: '//placehold.it/37x46',
  page: 'xii',
}, {
  id: 2,
  thumbnail: '//placehold.it/37x46/06c/fff',
  page: 9,
  note: 'This is a long comment I left about this bookmark in order to test out the display in the panel on the side of the bookreader.',
}, {
  id: 3,
  thumbnail: '//placehold.it/37x46/e5e5e5/06c',
  page: 9,
  note: 'Interesting quote here regarding the division of labor',
}];

describe('<ia-bookmarks-list>', () => {
  it('sets default properties', async () => {
    const el = await fixture(container(bookmarks));

    expect(el.bookmarks).to.equal(bookmarks);
    expect(el.activeBookmarkID).to.be.undefined;
    expect(el.renderHeader).to.be.false;
  });

  it('renders bookmarks that contain thumbnails', async () => {
    const el = await fixture(container(bookmarks));

    expect(el.shadowRoot.querySelector('img').getAttribute('src')).to.equal(bookmarks[0].thumbnail);
  });

  it('renders bookmarks that contain page numbers', async () => {
    const el = await fixture(container(bookmarks));

    expect(el.shadowRoot.innerHTML).to.include(`Page ${bookmarks[0].page}`);
  });

  it('renders bookmarks that contain an optional note', async () => {
    const el = await fixture(container(bookmarks));

    expect(el.shadowRoot.innerHTML).to.include(bookmarks[1].note);
  });

  it('emits a custom event when a bookmark is clicked', async () => {
    const el = await fixture(container(bookmarks));

    setTimeout(() => (
      el.shadowRoot.querySelector('li').click()
    ));
    const response = await oneEvent(el, 'bookmarkSelected');

    expect(response).to.exist;
  });

  it('emits a custom event when an edit button is clicked', async () => {
    const el = await fixture(container(bookmarks));

    setTimeout(() => (
      el.shadowRoot.querySelector('li button').click()
    ));
    const response = await oneEvent(el, 'bookmarkEdited');

    expect(response).to.exist;
  });

  it('renders the bookmarks count', async () => {
    const el = await fixture(container([bookmarks[0]]));
    const bookmarksCount = await fixture(el.bookmarksCount);

    expect(bookmarksCount.innerHTML).to.include('(1)');
  });

  it('does not render the bookmarks count when no bookmarks present', async () => {
    const el = await fixture(container());
    el.renderHeader = true;

    await el.updateComplete;

    expect(el.shadowRoot.querySelector('header small')).not.to.exist;
  });

  it('renders an optional header section', async () => {
    const el = await fixture(container(bookmarks));
    el.renderHeader = true;

    await el.updateComplete;

    expect(el.shadowRoot.querySelector('header')).to.exist;
  });
});
