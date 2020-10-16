import { css } from 'lit-element';

export default css`
:host {
  display: block;
  height: 100%;
  padding: 0 1rem;
  overflow-y: auto;
  box-sizing: border-box;
  color: var(--primaryTextColor);
  background: var(--activeButtonBg);
}

small {
  font-style: italic;
}

ul {
  padding: 0 0 2rem 0;
  margin: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: var(--bookmarkThumbWidth) 1fr auto;
  grid-gap: .2rem 1rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 5px solid transparent;
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

button {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  --iconWidth: 20px;
  --iconHeight: 20px;
}

button:focus {
  outline: none;
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
