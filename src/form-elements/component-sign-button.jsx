import React, { useState, useEffect } from 'react';
import http from '../axiosClient';
import Button from 'devextreme-react/button';
// import { useSelector } from "react-redux";
import cButton from 'devextreme/ui/button';
import { TextBox } from 'devextreme-react';

// require("./scss/application.scss");

const ComponentSignButton = ({ data, onClick, mutable, handleSubmit }) => {
  let undoRef = React.createRef();
  const [item] = useState(data);
  // const [updated, setUpdated] = useState(false);

  // const [isDisabled, setIsDisabled] = useState(data.disabled);

  // const buttonClicked = (button, status) => {
  //   button.setAttribute('clicked', status);
  // };

  // useEffect(() => {
  //   setIsDisabled(() => {
  //     if (data.disabled || data.clicked) return true;
  //     if (
  //       !(
  //         (data.permissions &&
  //           data.permissions.findIndex((r) => r.key === props.user.role.id) >=
  //             0) ||
  //         data.permissions === undefined ||
  //         data.permissions.length === 0
  //       )
  //     )
  //       return true;
  //     else return false;
  //   });
  // }, [data.disabled, data.permissions, data.clicked]);
  // console.log('button');
  return (
    <div className="component-sign">
      {/* {updated ? '' : ''} */}
      <Button
        className="CheckButton"
        key={item.id}
        text={item.attributes.text || item.attributes.displayName}
        style={item.style}
        id={`button${item.id}`}
        name={`button${item.id}`}
        disabled={mutable ? item.disabled : true}
        icon={item.icon}
        hint="Click to Approve"
        onClick={(e) => {
          //  setUpdated(
          onClick({
            style: { backgroundColor: 'rgba(198, 239, 226, 1)' },
            icon: 'check',
            undoVisibility: true,
            sign: item,
            clicked: true,
            // updated: updated,
            e: e,
          });
          // );
          if (handleSubmit) handleSubmit();
        }}
      />
      <Button
        style={{
          marginLeft: 10,
        }}
        ref={undoRef}
        id={`undo-${item.id}`}
        icon="undo"
        stylingMode="text"
        visible={item.undoVisibility || false}
        hint="Click to undo"
        disabled={mutable ? item.undoDisabled : true}
        onClick={(e) => {
          //  setUpdated(
          onClick({
            style: {},
            icon: null,
            undoVisibility: false,
            sign: item,
            clicked: false,
            // updated: updated,
            e: e,
          });
          //   );
          if (handleSubmit) handleSubmit();
        }}
      ></Button>
    </div>
  );
};

export default ComponentSignButton;
