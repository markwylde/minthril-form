const minthril = require('minthril');
const html = require('hyperx')(minthril);

const {
  createForm,
  createTextInput,
  createSelectInput,
  createMultilineTextInput,
  createCheckboxInput,
  createFileInput
} = require('../');

const eventLog = [];
let errors = {};

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
              errors: errors.firstName,
              component: createTextInput,
              autoFocus: true,
              initialValue: 'Joe'
            },
            {
              name: 'lastName',
              label: 'Last Name',
              errors: errors.lastName,
              component: createTextInput,
              initialValue: 'Bloggs'
            },
            {
              name: 'bio',
              label: 'Profile Bio',
              errors: errors.lastName,
              component: createMultilineTextInput,
              initialValue: 'Bloggs'
            },
            {
              name: 'location',
              label: 'Location',
              errors: errors.location,
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
              errors: errors.active,
              component: createCheckboxInput,
              initialValue: true
            },
            {
              name: 'pictures',
              label: 'Profile Pictures',
              errors: errors.picture,
              prefix: '/data/avatars/',
              component: createFileInput,
              multiple: true,
              initialValue: [{
                name: 'bbb.txt',
                id: 12
              }]
            },
            {
              name: 'failOnSubmit',
              label: 'Fail on submit',
              errors: errors.failOnSubmit,
              component: createCheckboxInput,
              initialValue: false
            }
          ],
          onSubmit: (event, state) => {
            event.preventDefault();
            errors = {};
            render();

            const button = event.target.querySelector('form > button');
            button.disabled = true;

            eventLog.unshift(['submitted', JSON.stringify(state, null, 2)]);

            setTimeout(() => {
              button.disabled = false;
              if (state.failOnSubmit) {
                errors = {
                  firstName: ['Must be unique'],
                  lastName: ['Must be valid']
                };
              }
              render();
            }, 500);
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
