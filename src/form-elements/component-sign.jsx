import React, { useEffect } from 'react';
import { useState } from 'react';
import ComponentSignButton from './component-sign-button';

const ComponentSign = (props) => {
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
    <div className='component-sign'>
      <div className='CheckBoxField'>
        {props.data.sign &&
          { ...props }.data.sign?.map((s) => {
            return (
              <ComponentSignButton
                key={`ComponentSignButton${s.id}`}
                data={s}
                onClick={
                  props.data.onSignClicked ? props.data.onSignClicked : null
                }
                mutable={props.mutable}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ComponentSign;
