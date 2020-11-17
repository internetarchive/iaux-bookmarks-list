import { css } from 'lit-element';

export default css`
:host {
  display: block;
  height: 100%;
  padding: 0 1rem 2rem 1rem;
  overflow-y: auto;
  box-sizing: border-box;
  color: var(--primaryTextColor);
  background: var(--activeButtonBg);
}

small {
  font-style: italic;
}

ul {
  padding: var(--activeBorderWidth) 0 2rem 0;
  margin: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: var(--bookmarkThumbWidth) 1fr auto;
  grid-gap: .2rem 1rem;
  justify-content: space-between;
  align-items: center;
  padding: .2rem;
  margin-top: .2rem;
  cursor: pointer;
  border: var(--activeBorderWidth) solid transparent;
  outline: none;
}

img {
  display: block;
  width: var(--bookmarkThumbWidth);
  min-height: calc(var(--bookmarkThumbWidth) * 1.55);
  background: var(--loadingPagePlaceholder);
}

.active {
  border-color: var(--activeBookmark);
}

h4 {
  margin: 0;
  font-size: 1.4rem;
}

p {
  padding: 0;
  margin: 0;
  grid-column: 1 / 4;
}

li button {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  outline: none;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  width: var(--iconWidth);
  height: var(--iconHeight);
}

.button {
  -webkit-appearance: none;
  appearance: none;
  padding: .5rem 1rem;
  box-sizing: border-box;
  font: normal 1.3rem "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: var(--primaryTextColor);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: var(--createButtonColor);
}

ia-bookmark-edit {
  --blueBookmarkColor: #0023f5;
  --redBookmarkColor: #eb3223;
  --greenBookmarkColor: #75ef4c;
  --saveButtonColor: #538bc5;
  --deleteButtonColor: #d33630;
  grid-column: 1 / 4;
}
`;
