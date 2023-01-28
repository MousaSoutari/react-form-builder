import React, { useEffect } from 'react';
import { useState } from 'react';
import ComponentSignButton from './component-sign-button';

const ComponentSign = (props) => {
  useEffect(() => {
    updateSignDisable();
  }, [props]);

  const updateSignDisable = () => {
    // console.log('props.data.sign', props.data.sign);
    for (let index = 0; index < props.data.sign?.length; index++) {
      let buttonsRelatedToThisSign = props.data.sign.filter(
        (s) =>
          s.attributes.sign_permission?.data?.id === props.data.sign[index].id
      );
      if (props.data.sign[index].clicked === undefined)
        props.data.sign[index].clicked = false;
      if (props.data.sign[index].attributes.sign_permission?.data === null) {
        //Check if sign permission is null then enable the button unless its clicked already
        props.data.sign[index].disabled = false;

        if (props.data.sign[index].clicked === true) {
          props.data.sign[index].disabled = true;
          //check if next level approved then disable undo and button
          props.data.sign[index].undoDisabled = false;

          if (buttonsRelatedToThisSign) {
            for (const element of buttonsRelatedToThisSign) {
              if (element.clicked === true)
                props.data.sign[index].undoDisabled = true;
            }
          }
        }
        if (props.data.sign[index].disabled || props.data.sign[index].clicked) {
          props.data.sign[index].disabled = true;
          return;
        }
        if (
          !(
            (props.data.sign[index].attributes.permissions &&
              props.data.sign[index].attributes.permissions.findIndex(
                (r) => r.key === props.data.user.role.id
              ) >= 0) ||
            props.data.sign[index].attributes.permissions === undefined ||
            props.data.sign[index].attributes.permissions.length === 0
          )
        )
          props.data.sign[index].disabled = true;
        else props.data.sign[index].disabled = false;
      } else {
        props.data.sign[index].disabled = false;
        let depSign = props.data.sign.find(
          (s) =>
            s.id === props.data.sign[index]?.attributes.sign_permission?.data.id
        );
        //console.log('depSign', depSign.clicked);

        if (depSign && depSign.clicked === true)
          props.data.sign[index].disabled = false;
        else props.data.sign[index].disabled = true;

        if (props.data.sign[index].disabled || props.data.sign[index].clicked) {
          props.data.sign[index].disabled = true;
          return;
        }
        if (
          !(
            (props.data.sign[index].attributes.permissions &&
              props.data.sign[index].attributes.permissions.findIndex(
                (r) => r.key === props.data.user.role.id
              ) >= 0) ||
            props.data.sign[index].attributes.permissions === undefined ||
            props.data.sign[index].attributes.permissions.length === 0
          )
        )
          props.data.sign[index].disabled = true;
        else props.data.sign[index].disabled = false;
        //console.log('props.data.sign', props.data.sign);

        // if (buttonsRelatedToThisSign) {
        //   for (const element of buttonsRelatedToThisSign) {
        //     if (element.clicked === true)
        //       props.data.sign[index].undoDisabled = true;
        //   }
        // }
      }
    }
  };
  // const setDisabled = (data) => {
  //   if (data.disabled || data.clicked) return true;
  //   if (
  //     !(
  //       (data.permissions &&
  //         data.permissions.findIndex((r) => r.key === user.role.id) >= 0) ||
  //       data.permissions === undefined ||
  //       data.permissions.length === 0
  //     )
  //   )
  //     return true;
  //   else return false;
  // };
  const updateComponentSignButton = ({
    style,
    icon,
    undoVisibility,
    item,
    clicked,
    updated,
  }) => {
    console.log('ComponentSign:updateSign');

    let data = JSON.parse(JSON.stringify(props.data));
    let myItem = data.sign.find((s) => s.id === item.id);
    myItem.clicked = clicked;
    myItem.signedBy = props.data.user;
    if (clicked)
      myItem.attributes.text = `${item.attributes.displayName} ${props.data.user.username}`;
    else myItem.attributes.text = item.attributes.displayName;
    myItem.style = style;
    myItem.icon = icon;
    myItem.undoVisibility = undoVisibility;
    return !updated;
    //props.updateElement(data);
    //updateSignDisable();
  };
  //   // if (!e) {
  //   //   props.data.sign.forEach((element) => {
  //   //     if (element.attributes.sign_permission.data?.id === item.id) {
  //   //       let checkbox = cBox.getInstance(
  //   //         document.getElementById("checkBox" + element.id)
  //   //       );
  //   //       checkbox.option("value", false);
  //   //     }
  //   //   });
  //   // }

  //   for (let index = 0; index < props.data.sign.length; index++) {
  //     let button = cButton.getInstance(
  //       document.getElementById('button' + props.data?.sign[index].id)
  //     );

  //     if (props.data.sign[index]?.sign_permission?.data != null) {
  //       if (props.data.sign[index]?.sign_permission.data.id === item.id) {
  //         button.option('disabled', false);
  //       } else {
  //         let dep = cButton.getInstance(
  //           document.getElementById(
  //             'button' + props.data.sign[index]?.sign_permission?.data.id
  //           )
  //         );
  //         if (Boolean(dep.element().attributes['clicked']?.value) === true)
  //           button.option('disabled', false);
  //         else button.option('disabled', true);
  //       }
  //     }
  //     // console.log(signPermissionData[index]);
  //   }
  // };

  return (
    <div className="component-sign">
      <div className="CheckBoxField">
        {props.data.sign &&
          { ...props }.data.sign?.map((s) => {
            return (
              <ComponentSignButton
                key={`ComponentSignButton${s.id}`}
                data={s}
                onClick={updateComponentSignButton}
                mutable={props.mutable}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ComponentSign;
