import React, { useState, useEffect } from "react";
import http from "../axiosClient";
import Button from "devextreme-react/button";
// import { useSelector } from "react-redux";
import cButton from "devextreme/ui/button";

// require("./scss/application.scss");

const ComponentSignButton = ({ data, onClick }) => {
  let undoRef = React.createRef();
  // const userConfiges = useSelector((state) => state.userConfiges);

  const [undoApproveButtonVisibility, setUndoApproveButtonVisibility] =
    useState(false);
  const [approveBtnIcon, setApproveBtnIcon] = useState(null);
  const [btnStyle, setBtnStyle] = useState({});
  const [btnText, setBtnText] = useState(data.displayName);

  const buttonClicked = (button, status) => {
    button.setAttribute("clicked", status);
  };

  return (
    <div className="component-sign">
      <Button
        className="CheckButton"
        key={data.id}
        text={btnText}
        style={btnStyle}
        id={`button${data.id}`}
        // name={this.name}
        //   disabled={
        //     (data.roles1 &&
        //       data.roles1.findIndex(
        //         (r) => r.key === userConfiges.extra.extra.role.id
        //       ) >= 0) ||
        //     data.roles1 === undefined ||
        //     data.roles1.length === 0
        //       ? false
        //       : true
        //   }
        // icon="check"
        // text={`${userConfiges.auth.currentUser.username}`}
        hint="Click to Approve"
        onClick={(e) => {
          onClick(e, data);
          setBtnText(`${data.displayName} omar`);
          buttonClicked(e.element, true);
          setBtnStyle({ backgroundColor: "rgba(198, 239, 226, 1)" });
          setApproveBtnIcon("check");
          setUndoApproveButtonVisibility(true);
        }}
      />
      <Button
        style={{
          marginLeft: 10,
        }}
        ref={undoRef}
        id={`undo-${data.id}`}
        icon="undo"
        stylingMode="text"
        visible={undoApproveButtonVisibility}
        hint="Click to undo the Approve"
        onClick={(e) => {
          let button = cButton.getInstance(
            document.getElementById("button" + data.id)
          );
          buttonClicked(button.element(), false);

          // setApproveBtnType("normal");
          setBtnStyle({});
          setApproveBtnIcon(null);

          setUndoApproveButtonVisibility(false);
        }}
      ></Button>
    </div>
  );
};

export default ComponentSignButton;
