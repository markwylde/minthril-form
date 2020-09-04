const minthril = require('minthril');
const html = require('hyperx')(minthril);
const autosize = require('autosize');

function createMultilineTextInput (options) {
  return minthril.createComponent(function (state, draw, component) {
    function handleInput (event) {
      state.value = event.target.value;
      options.onInput && options.onInput(event, state);
    }

    function handleCreate (event) {
      event.dom.value = options.initialValue || '';
      autosize(event.dom);
    }

    component.getValue = () => state.value;

    return html`
      <textarea id=${options.id} oncreate=${handleCreate} ${options.autoFocus ? 'autofocus' : ''} name="${options.name}" oninput=${handleInput}></textarea>
    `;
  }, options, 'min-ui-form-text-input');
}

module.exports = createMultilineTextInput;
