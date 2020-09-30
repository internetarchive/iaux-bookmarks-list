import { nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { html, LitElement } from 'lit-element';
import '@internetarchive/icon-edit-pencil/icon-edit-pencil';
import bookmarksListCSS from './styles/ia-bookmarks-list.js';

export class IABookmarksList extends LitElement {
  static get styles() {
    return bookmarksListCSS;
  }

  static get properties() {
    return {
      activeBookmarkID: { type: Number },
      bookmarks: { type: Array },
      renderHeader: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.activeBookmarkID = undefined;
    this.bookmarks = [];
    this.renderHeader = false;
  }

  emitEditEvent(e, bookmark) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('bookmarkEdited', {
      bubbles: true,
      composed: true,
      detail: {
        bookmark,
      },
    }));
  }

  emitSelectedEvent(bookmark) {
    this.activeBookmarkID = bookmark.id;
    this.dispatchEvent(new CustomEvent('bookmarkSelected', {
      bubbles: true,
      composed: true,
      detail: {
        bookmark,
      },
    }));
  }

  bookmarkItem(bookmark) {
    return html`
      <li
        @click=${() => this.emitSelectedEvent(bookmark)}
        class=${classMap({ active: bookmark.id === this.activeBookmarkID })}
      >
        <img src=${bookmark.thumbnail} />
        <h4>Page ${bookmark.page}</h4>
        <button @click=${e => this.emitEditEvent(e, bookmark)} title="Edit this bookmark"><ia-icon-edit-pencil></ia-icon-edit-pencil></button>
        ${bookmark.note ? html`<p>${bookmark.note}</p>` : nothing}
      </li>
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
    `;
  }
}
