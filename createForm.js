const minthril = require('minthril');
const html = require('hyperx')(minthril);

function renderErrors (errors) {
  return html`
    <ul class="form-errors">
      ${errors.map(error => html`<li>${error}</li>`)}
    </ul>
  `;
}

function createForm (options) {
  return minthril.createComponent(function (state, draw, component) {
    function handleCreate () {
      options.fields.forEach(field => {
        state[field.name] = field.initialValue;
      });
    }

    function handleInput (event, data) {
      state[data.name] = data.value;
      options.onInput && options.onInput(state);
    }

    component.getValue = () => state.value;

    return html`
      <form oncreate=${handleCreate} onsubmit=${event => options.onSubmit && options.onSubmit(event, state)}>
        ${options.fields.map(field => {
          const id = field.id || Math.floor(Math.random() * 1e16);
          return html`
            <div class="form-group">
              ${field.component.handlesOwnLabel ? null : html`<label for=${id}>${field.label}</label>`}
              ${field.errors ? renderErrors(field.errors) : ''}
              ${field.component({ id, ...field, onInput: handleInput })}
            </div>
          `;
        })}

        <button>Submit</button>
      </form>
    `;
  }, {}, 'min-form');
}

module.exports = createForm;
