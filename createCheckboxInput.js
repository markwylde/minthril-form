const minthril = require('minthril');
const html = require('hyperx')(minthril, {
  createFragment: children => children
});

function createFieldText (options) {
  return minthril.createComponent(function (state, draw, component) {
    function handleInput (event) {
      state.value = !!event.target.checked;
      options.onInput && options.onInput(event, state);
    }

    function handleCreate (event) {
      event.dom.value = options.initialValue;
    }

    component.getValue = () => state.value;

    return html`
      <input id=${options.id} oncreate=${handleCreate} type="checkbox" ${options.autoFocus ? 'autofocus' : ''} name="${options.name}" oninput=${handleInput} />
      <label for=${options.id}>${options.label}</label>
    `;
  }, options, 'min-ui-form-checkbox-input');
}

createFieldText.handlesOwnLabel = true;

module.exports = createFieldText;
