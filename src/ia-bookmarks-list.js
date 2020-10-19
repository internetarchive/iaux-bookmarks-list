import { nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { html, LitElement } from 'lit-element';
import '@internetarchive/ia-bookmark-edit/ia-bookmark-edit';
import '@internetarchive/icon-edit-pencil/icon-edit-pencil';
import bookmarksListCSS from './styles/ia-bookmarks-list.js';

export class IABookmarksList extends LitElement {
  static get styles() {
    return bookmarksListCSS;
  }

  static get properties() {
    return {
      activeBookmarkID: { type: Number },
      bookmarkColors: { type: Array },
      bookmarks: { type: Array },
      editedBookmark: { type: Object },
      renderAddBookmarkButton: { type: Boolean },
      renderHeader: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.activeBookmarkID = undefined;
    this.bookmarkColors = [];
    this.bookmarks = [];
    this.editedBookmark = {};
    this.renderAddBookmarkButton = true;
    this.renderHeader = false;
  }

  emitEditEvent(e, bookmark) {
    this.dispatchEvent(new CustomEvent('bookmarkEdited', {
      detail: {
        bookmark,
      },
    }));
  }

  emitSelectedEvent(bookmark) {
    this.activeBookmarkID = bookmark.id;
    this.dispatchEvent(new CustomEvent('bookmarkSelected', {
      detail: {
        bookmark,
      },
    }));
  }

  emitSaveBookmark(bookmark) {
    this.dispatchEvent(new CustomEvent('saveBookmark', {
      detail: {
        bookmark,
      },
    }));
  }

  emitDeleteBookmark(id) {
    this.dispatchEvent(new CustomEvent('deleteBookmark', {
      detail: {
        id,
      },
    }));
  }

  emitBookmarkColorChanged({ detail }) {
    const { bookmarkId, colorId } = detail;
    this.dispatchEvent(new CustomEvent('bookmarkColorChanged', {
      detail: {
        bookmarkId,
        colorId,
      },
    }));
  }

  emitAddBookmark() {
    this.dispatchEvent(new CustomEvent('addBookmark'));
  }

  editBookmark(e, bookmark) {
    this.emitEditEvent(e, bookmark);
    this.editedBookmark = this.editedBookmark === bookmark ? {} : bookmark;
  }

  saveBookmark({ detail }) {
    const { bookmark } = detail;
    this.editedBookmark = {};
    this.emitSaveBookmark(bookmark);
  }

  deleteBookmark({ detail }) {
    const { id } = detail;
    this.editedBookmark = {};
    this.emitDeleteBookmark(id);
  }

  bookmarkItem(bookmark) {
    const editMode = this.editedBookmark.id === bookmark.id;
    return html`
      <li
        @click=${() => this.emitSelectedEvent(bookmark)}
        class=${classMap({ active: bookmark.id === this.activeBookmarkID })}
        tabindex="0"
      >
        <img src=${bookmark.thumbnail} />
        <h4>Page ${bookmark.page}</h4>
        <button @click=${e => this.editBookmark(e, bookmark)} title="Edit this bookmark"><ia-icon-edit-pencil></ia-icon-edit-pencil></button>
        ${!editMode && bookmark.note ? html`<p>${bookmark.note}</p>` : nothing}
        ${editMode ? this.editBookmarkComponent : nothing}
      </li>
    `;
  }

  get editBookmarkComponent() {
    const showBookmark = false;
    return html`
      <ia-bookmark-edit
        .bookmark=${this.editedBookmark}
        .bookmarkColors=${this.bookmarkColors}
        .showBookmark=${showBookmark}
        @saveBookmark=${this.saveBookmark}
        @deleteBookmark=${this.deleteBookmark}
        @bookmarkColorChanged=${this.emitBookmarkColorChanged}
      ></ia-bookmark-edit>
    `;
  }

  get bookmarksCount() {
    const count = this.bookmarks.length;
    return html`<small>(${count})</small>`;
  }

  get headerSection() {
    return html`<header>
      <h3>
        Bookmarks
        ${this.bookmarks.length ? this.bookmarksCount : nothing}
      </h3>
    </header>`;
  }

  render() {
    return html`
      ${this.renderHeader ? this.headerSection : nothing}
      <ul>
        ${this.bookmarks.length ? repeat(this.bookmarks, bookmark => bookmark.id, this.bookmarkItem.bind(this)) : nothing}
      </ul>
      ${this.renderAddBookmarkButton ? html`<button class="button" @click=${this.emitAddBookmark}>Add bookmark</button>` : nothing}
    `;
  }
}
