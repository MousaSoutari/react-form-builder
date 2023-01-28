import React, { useState, useEffect } from 'react';
import http from '../axiosClient';
import { CheckBox } from 'devextreme-react';
// require("./scss/application.scss");
import cBox from 'devextreme/ui/check_box';
const ComponentRight = (props) => {
  const [signPermissionData, setSignPermissionData] = useState(null);

  useEffect(() => {
    for (let index = 0; index < signPermissionData?.length; index++) {
      let checkbox = cBox.getInstance(
        document.getElementById('checkBox' + signPermissionData[index].id)
      );

      if (signPermissionData[index].attributes.sign_permission.data === null)
        checkbox.option('disabled', false);
      else checkbox.option('disabled', true);
    }
  }, [signPermissionData]);

  const updateCheckBox = (e, item) => {
    if (!e) {
      signPermissionData.forEach((element) => {
        if (element.attributes.sign_permission.data?.id === item.id) {
          let checkbox = cBox.getInstance(
            document.getElementById('checkBox' + element.id)
          );
          checkbox.option('value', false);
        }
      });
    }

    for (let index = 0; index < signPermissionData.length; index++) {
      let checkbox = cBox.getInstance(
        document.getElementById('checkBox' + signPermissionData[index].id)
      );

      if (signPermissionData[index].attributes.sign_permission.data != null) {
        if (
          signPermissionData[index].attributes.sign_permission.data.id ===
          item.id
        ) {
          if (e === true) checkbox.option('disabled', false);
          else checkbox.option('disabled', true);
        } else {
          let dep = cBox.getInstance(
            document.getElementById(
              'checkBox' +
                signPermissionData[index].attributes.sign_permission.data.id
            )
          );
          if (dep._props.value === true) checkbox.option('disabled', false);
          else checkbox.option('disabled', true);
        }
      }
      // console.log(signPermissionData[index]);
    }
    props.updateElement(props.data);
  };

  useEffect(() => {
    if (!signPermissionData) {
      http()
        .request({
          url: `/sign-permissions?populate=*&sort=order:asc`,
          method: 'get',
        })
        .then((response) => {
          setSignPermissionData(response.data.data);
        })
        .catch((err) => {
          setSignPermissionData(null);
        })
        .finally(() => {});
    }
  }, []);

  const onCheckBoxValueChanged = (e, item, userID) => {
    //console.log(item);
    let name = item.attributes.name;
    let itemID = item.id;
    let signPermission = item.attributes.sign_permission;

    let attName = item.attributes.name
      .replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      })
      .replace(/\s/g, '');

    if (e) {
      if (!props.data.sign) {
        props.data.sign = [];
      }
      if (
        props.data.sign.length > 0 &&
        props.data.sign.find((p) => p.name === attName).length > 0
      ) {
        props.data.sign.find((p) => p.name === attName).permissions =
          item.attributes.users_permissions_roles.data.map((r) => {
            let s = { key: r.id, name: r.attributes.name };
            return s;
          });
      } else {
        let permissions = item.attributes.users_permissions_roles.data.map(
          (r) => {
            let s = { key: r.id, name: r.attributes.name };
            return s;
          }
        );
        let sign = {
          name: attName,
          displayName: name,
          permissions: permissions,
          key: itemID,
          id: itemID,
          sign_permission: signPermission,
        };
        props.data.sign.push(sign);
      }
    } else {
      let index = -1;
      props.data.sign.find((p, i) => {
        if (p.name === attName) index = i;
      });
      props.data.sign.splice(index, 1);
    }

    updateCheckBox(e, item);

    // props.data[name] = item.attributes.users_permissions_roles.data.map((r) => {
    //   let s = { key: r.id, name: r.attributes.name };
    //   return s;
    // });
    // props._updateElement(this);
  };

  if (props.mutable) {
    return null;
  }

  return (
    <div className="component-right">
      {props.data.pageBreakBefore && (
        <div className="preview-page-break">Page Break</div>
      )}
      <div className="CheckBoxField">
        {signPermissionData?.map((item) => {
          const userID = item.id;
          return (
            <CheckBox
              className="CheckBoxField"
              key={`checkBox${item.id}`}
              id={`checkBox${item.id}`}
              defaultValue={false}
              onValueChange={(e) => onCheckBoxValueChanged(e, item, userID)}
              // disabled={isDisabled(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ComponentRight;
