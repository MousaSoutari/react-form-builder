import React from "react";
import ReactDOM from "react-dom";
import DemoBar from "./demobar";
import { Button } from "devextreme-react";

// eslint-disable-next-line no-unused-vars
import FormBuilder from "./src/index";

import * as variables from "./variables";

// Add our stylesheets for the demo.
require("./scss/application.scss");

const url = "/api/formdata";
const saveUrl = "/api/formdata";

// const TestComponent = () => <h2>Hello</h2>;

// const MyInput = React.forwardRef((props, ref) => {
//   const { name, defaultValue, disabled } = props;
//   return (
//     <>
//       <label style={{ marginRight: '1rem' }}><b>{ props.data.label }</b></label>
//       <input ref={ref} name={name} defaultValue={defaultValue} disabled={disabled} />;
//     </>
//   );
// });

// Registry.register('MyInput', MyInput);
// Registry.register('TestComponent', TestComponent);

// const items = [{
//     key: 'Header',
//   }, {
//     key: 'TextInput',
//   }, {
//     key: 'TextArea',
//   }, {
//     key: 'RadioButtons',
//   }, {
//     key: 'Checkboxes',
//   }, {
//     key: 'Image',
//   },
//   {
//     group_name: 'Multi Column Row',
//     key: 'TwoColumnRow'
//   },
//   {
//     group_name: 'Multi Column Row',
//     key: 'ThreeColumnRow'
//   },
//   {
//     key: 'TestComponent',
//     element: 'CustomElement',
//     component: TestComponent,
//     type: 'custom',
//     field_name: 'test_component',
//     name: 'Something You Want',
//     icon: 'fa fa-cog',
//     static: true,
//     props: { test: 'test_comp' },
//     label: 'Label Test',
//   },
//   {
//     group_name: 'Custom Element',
//     key: 'MyInput',
//     element: 'CustomElement',
//     component: MyInput,
//     type: 'custom',
//     forwardRef: true,
//     bare: true,
//     field_name: 'my_input_',
//     name: 'My Input',
//     icon: 'fa fa-cog',
//     props: { test: 'test_input' },
//     label: 'Label Input',
//   },
// ];
const CheckButton = () => {
  <Button
    className="CheckButton"
    key={"btnAcknowledgment"}
    icon="check"
    text={"Omar"}
    hint="Click to Approve"
    // onClick={() => {
    //   setApproveBtnIcon("check");
    //   setApproveBtnText(`${userConfiges.auth.currentUser.username}`);
    //   setUndoApproveButtonVisibility(true);
    // }}
  />;
};
// const onCheckBoxValueChanged = () => {};
// const checkBoxDisabled = () => {
//   return false;
// };
// const checkBoxComponent = () => {
//   return (
//     <div className="">
//       <CheckBox
//         defaultValue={false}
//         onValueChanged={onCheckBoxValueChanged}
//         disabled={checkBoxDisabled()}
//       />
//       <CheckBox
//         defaultValue={false}
//         onValueChanged={onCheckBoxValueChanged}
//         disabled={checkBoxDisabled()}
//       />
//       <CheckBox
//         defaultValue={false}
//         onValueChanged={onCheckBoxValueChanged}
//         disabled={checkBoxDisabled()}
//       />
//       <CheckBox
//         defaultValue={false}
//         onValueChanged={onCheckBoxValueChanged}
//         disabled={checkBoxDisabled()}
//       />
//       <CheckBox
//         defaultValue={false}
//         onValueChanged={onCheckBoxValueChanged}
//         disabled={checkBoxDisabled()}
//       />
//       <CheckBox
//         defaultValue={false}
//         onValueChanged={onCheckBoxValueChanged}
//         disabled={checkBoxDisabled()}
//       />
//     </div>
//   );
// };

const App = () => (
  <FormBuilder.ReactFormBuilder
    variables={variables}
    // url={url}
    // saveUrl={saveUrl}
    locale="en"
    saveAlways={false}
    // rightComponent={checkBoxComponent()}
    // toolbarItems={items}
  />
);

ReactDOM.render(<App />, document.getElementById("form-builder"));

ReactDOM.render(
  <DemoBar variables={variables} />,
  document.getElementById("demo-bar")
);
