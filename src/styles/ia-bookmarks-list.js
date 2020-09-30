import { css } from 'lit-element';

export default css`
:host {
  display: block;
  padding: 0 1rem;
  color: var(--primaryTextColor);
}

small {
  font-style: italic;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: 37px 1fr auto;
  grid-gap: .2rem 1rem;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 5px solid transparent;
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
`;
