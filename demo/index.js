const minthril = require('minthril');
const html = require('hyperx')(minthril);

const { createForm, createTextInput, createSelectInput, createCheckboxInput } = require('../');

const eventLog = [];

function demoApp () {
  const myForm = createForm({
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
      eventLog.unshift(['submitted', state]);
      render();
    },
    onInput: state => {
      eventLog.unshift(['inputted', state]);
      render();
    }
  });

  return html`
    <main >
      <section>
        <h1>Example Form</h1>

        <h2>Simple form</h2>
        <div class="exampleFormContainer">
          ${myForm}
        </div>

        <ul>
        ${eventLog.map(entry => {
          return html`
            <li>
        <strong>${entry[0]}</strong>
              ${JSON.stringify(entry[1])}
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
