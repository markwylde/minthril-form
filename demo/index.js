const minthril = require('minthril');
const html = require('hyperx')(minthril);

const { createForm, createTextInput, createSelectInput, createCheckboxInput } = require('../');

const eventLog = [];

function demoApp () {
  return html`
    <main >
      <section>
        <h1>Example Form</h1>

        <h2>Simple form</h2>
        <div class="exampleFormContainer">
        ${createForm({
          fields: [
            {
              name: 'firstName',
              label: 'First Name',
              component: createTextInput,
              autoFocus: true,
              initialValue: 'Joe'
            },
            {
              name: 'lastName',
              label: 'Last Name',
              component: createTextInput,
              initialValue: 'Bloggs'
            },
            {
              name: 'location',
              label: 'Location',
              component: createSelectInput,
              options: [
                {
                  value: 'au',
                  label: 'Australia'
                },
                {
                  value: 'uk',
                  label: 'United Kingdom'
                }
              ],
              initialValue: 'uk'
            },
            {
              name: 'active',
              label: 'Active',
              component: createCheckboxInput,
              initialValue: true
            }
          ],
          onSubmit: (event, state) => {
            event.preventDefault();
            eventLog.unshift(['submitted', JSON.stringify(state, null, 2)]);
            render();
          },
          onInput: state => {
            eventLog.unshift(['inputted', JSON.stringify(state, null, 2)]);
            render();
          }
        })}
        </div>

        <ul>
        ${eventLog.map(entry => {
          return html`
            <li>
              <strong>${entry[0]}</strong>
              <pre><code>${entry[1]}</code></pre>
          </li>
          `;
        })}
        </ul>
      </section>
    </main>
  `;
}

function render () {
  minthril.render(document.body, demoApp());
}

document.addEventListener('DOMContentLoaded', function () {
  render();
});
