import {
  html,
  fixture,
  expect,
  oneEvent,
} from '@open-wc/testing';
import { IABookmarksList } from '../src/ia-bookmarks-list.js';

customElements.define('ia-bookmarks-list', IABookmarksList);

const bookmarks = {
  3: {
    id: 3,
    thumbnail: '//placehold.it/37x46/e5e5e5/06c',
    page: 9,
    note: 'Interesting quote here regarding the division of labor',
  },
  1: {
    id: 1,
    thumbnail: '//placehold.it/37x46',
    page: 'xii',
  },
  2: {
    id: 2,
    thumbnail: '//placehold.it/37x46/06c/fff',
    page: 9,
    note: 'This is a long comment I left about this bookmark in order to test out the display in the panel on the side of the bookreader.',
  },
};

const bookmarkColors = [{
  id: 0,
  className: 'blue',
}, {
  id: 1,
  className: 'red',
}, {
  id: 2,
  className: 'green',
}];

const container = (bookmarksSet = []) => (
  html`<ia-bookmarks-list .bookmarks=${bookmarksSet} .bookmarkColors=${bookmarkColors}></ia-bookmarks-list>`
);

describe('<ia-bookmarks-list>', () => {
  it('sets default properties', async () => {
    const el = await fixture(container(bookmarks));

    expect(el.bookmarks).to.equal(bookmarks);
    expect(el.activeBookmarkID).to.be.undefined;
    expect(el.renderHeader).to.be.false;
  });

  it('renders bookmarks that contain page numbers', async () => {
    const el = await fixture(container(bookmarks));

    expect(el.shadowRoot.innerHTML).to.include(`Page ${bookmarks[3].page}`);
  });

  it('renders bookmarks that contain an optional note', async () => {
    const el = await fixture(container(bookmarks));

    expect(el.shadowRoot.innerHTML).to.include(bookmarks[3].note);
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

  it('emits a saveBookmark event', async () => {
    const el = await fixture(container(bookmarks));

    setTimeout(() => (
      el.emitSaveBookmark(bookmarks[0])
    ));
    const response = await oneEvent(el, 'saveBookmark');

    expect(response).to.exist;
  });

  it('emits a deleteBookmark event', async () => {
    const el = await fixture(container(bookmarks));

    setTimeout(() => (
      el.emitDeleteBookmark(bookmarks[3].id)
    ));
    const response = await oneEvent(el, 'deleteBookmark');

    expect(response).to.exist;
  });

  it('emits a bookmarkColorChanged event', async () => {
    const el = await fixture(container(bookmarks));

    setTimeout(() => (
      el.emitBookmarkColorChanged({ detail: { bookmarkId: 0, colorId: 0 } })
    ));
    const response = await oneEvent(el, 'bookmarkColorChanged');

    expect(response).to.exist;
  });

  it('sets editedBookmark when an edit button is clicked', async () => {
    const el = await fixture(container(bookmarks));
    let prevState = el.editedBookmark;

    el.shadowRoot.querySelector('li button').click();
    await el.updateComplete;

    expect(el.editedBookmark).not.to.equal(prevState);
    expect(el.editedBookmark.page).to.equal(bookmarks[1].page);

    // When clicking the same edit button while in edit mode, should toggle
    // edit mode off and remove editedBookmark pointer
    prevState = el.editedBookmark;
    el.shadowRoot.querySelector('li button').click();
    await el.updateComplete;

    expect(el.editedBookmark).not.to.equal(prevState);
    expect(el.editedBookmark.page).not.to.equal(bookmarks[1].page);
  });

  it('resets editedBookmark when saveBookmark callback called', async () => {
    const el = await fixture(container(bookmarks));
    const bookmark = bookmarks[3];
    el.editedBookmark = bookmark;
    await el.updateComplete;
    el.saveBookmark({ detail: { bookmark } });
    await el.updateComplete;

    expect(el.editedBookmark).not.to.equal(bookmarks[3]);
    expect(el.editedBookmark).not.to.have.keys(['page', 'thumbnail', 'id']);
  });

  it('resets editedBookmark when deleteBookmark callback called', async () => {
    const el = await fixture(container(bookmarks));
    const bookmark = bookmarks[3];

    await el.updateComplete;
    el.deleteBookmark({ detail: { id: bookmark.id } });
    await el.updateComplete;

    expect(el.editedBookmark).not.to.equal(bookmark);
    expect(el.editedBookmark).not.to.have.keys(['page', 'thumbnail', 'id']);
  });

  it('renders the bookmarks count', async () => {
    const el = await fixture(container([bookmarks[3]]));
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

  it('draws nothing when no bookmarks are provided', async () => {
    const el = await fixture(container([]));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('ul')).not.to.exist;
    expect(el.shadowRoot.querySelector('.separator')).not.to.exist;
  });

  it('sorts bookmarks in ascending order at render', async () => {
    const el = await fixture(container([])); // start at no bookmarks
    await el.updateComplete;

    const mockSort = [bookmarks[2], bookmarks[3], bookmarks[1]];
    el.sortBookmarks = () => mockSort; // force order of bookmarks to display
    el.bookmarks = bookmarks; // feed new bookmarks
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('ul')).to.exist;

    const allBookmarks = el.shadowRoot.querySelectorAll('li');
    expect(allBookmarks[0].getAttribute('data-pageindex')).to.contain(bookmarks[2].id);
    expect(allBookmarks[1].getAttribute('data-pageindex')).to.contain(bookmarks[3].id);
    expect(allBookmarks[2].getAttribute('data-pageindex')).to.contain(bookmarks[1].id);
  });
});
