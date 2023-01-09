import React, { useState, useEffect } from "react";
import ComponentSignButton from "./component-sign-button";
import cButton from "devextreme/ui/button";

// require("./scss/application.scss");
// const updateComponentSignButton1 = (e, data) => {
//   props.data.sign?.map((s) => {

//   }
//   // e.component.option("disabled", true);
//   // let button = cButton.getInstance(document.getElementById("button" + data.id));
//   // console.log(button);
// };

const ComponentSign = (props) => {
  useEffect(() => {
    for (let index = 0; index < props.data.sign?.length; index++) {
      let button = cButton.getInstance(
        document.getElementById("button" + props.data.sign[index].id)
      );

      if (props.data.sign[index].sign_permission?.data === null)
        button.option("disabled", false);
      else {
        let dep = cButton.getInstance(
          document.getElementById(
            "button" + props.data.sign[index]?.sign_permission?.data.id
          )
        );
        if (Boolean(dep.element().attributes["clicked"]?.value) === true)
          button.option("disabled", false);
        else button.option("disabled", true);
      }
    }
  }, [props]);

  const updateComponentSignButton = (e, item) => {
    // if (!e) {
    //   props.data.sign.forEach((element) => {
    //     if (element.attributes.sign_permission.data?.id === item.id) {
    //       let checkbox = cBox.getInstance(
    //         document.getElementById("checkBox" + element.id)
    //       );
    //       checkbox.option("value", false);
    //     }
    //   });
    // }

    for (let index = 0; index < props.data.sign.length; index++) {
      let button = cButton.getInstance(
        document.getElementById("button" + props.data?.sign[index].id)
      );

      if (props.data.sign[index]?.sign_permission?.data != null) {
        if (props.data.sign[index]?.sign_permission.data.id === item.id) {
          button.option("disabled", false);
        } else {
          let dep = cButton.getInstance(
            document.getElementById(
              "button" + props.data.sign[index]?.sign_permission?.data.id
            )
          );
          if (Boolean(dep.element().attributes["clicked"]?.value) === true)
            button.option("disabled", false);
          else button.option("disabled", true);
        }
      }
      // console.log(signPermissionData[index]);
    }
  };

  return (
    <div className="component-sign">
      <div className="CheckBoxField">
        {props.data.sign?.map((s) => {
          return (
            <ComponentSignButton
              key={`ComponentSignButton${s.id}`}
              data={s}
              onClick={updateComponentSignButton}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ComponentSign;
