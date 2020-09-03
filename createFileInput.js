const minthril = require('minthril');
const html = require('hyperx')(minthril);

function createFileInput (options) {
  return minthril.createComponent(function (state, draw, component) {
    state.value = state.value || options.initialValue || [];

    function handleChange (event) {
      const files = Array.from(event.target.files);
      state.value = state.value.concat(files.map(file => {
        return {
          name: (options.prefix || '') + file.name,
          file
        };
      }));

      event.target.value = null;
      draw();

      options.onInput && options.onInput(event, state);
    }

    function removeFile (event, fileToDelete) {
      state.value = state.value.filter(file => file !== fileToDelete);
      options.onInput && options.onInput(event, state);
      draw();
    }

    function addDragOverClass (event) {
      event.target.parentNode.classList.add('dragover');
    }

    function removeDragOverClass (event) {
      event.target.parentNode.classList.remove('dragover');
    }

    component.getValue = () => state.value;

    return html`
    <div>
      <ul>
        ${state.value.map((file, fileIndex) => html`
          <li key=${file}>
            <input oncreate=${event => { event.dom.value = file.name; }}" />
            <button onclick=${event => removeFile(event, file)}>X</button>
          </li>
        `)}
      </ul>
      <div>
        Click or drag files here to upload
        <input ondragenter=${addDragOverClass} ondragleave=${removeDragOverClass} ondrop=${removeDragOverClass} type="file"
             multiple="multiple"
             id=${options.id}
             ${options.autoFocus ? 'autofocus' : ''}
             name="${options.name}"
             onchange=${handleChange}
          />
      </div>
    </div>
    `;
  }, options, 'min-ui-form-file-input');
}

module.exports = createFileInput;
