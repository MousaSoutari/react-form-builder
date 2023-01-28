import React, { useEffect, useState } from 'react';
import ID from './UUID';
import { Popup, Position } from 'devextreme-react/popup';
import http from './axiosClient';
import { CheckBox } from 'devextreme-react';
import cBox from 'devextreme/ui/check_box';

const FormElementsPermission = (props) => {
  const [element, setElement] = useState(props.element);
  const [data, setData] = useState(props.data);
  const [dirty, setDirty] = useState(false);
  const [signPermissionData, setSignPermissionData] = useState(null);

  useEffect(() => {
    if (!signPermissionData) {
      http()
        .request({
          url: `/sign-permissions?populate=*&sort=order:asc`,
          method: 'get',
        })
        .then((response) => {
          let data = response.data.data.map((s) => {
            let name = s.attributes.name;
            let itemID = s.id;
            let signPermission = s.attributes.sign_permission;
            let attName = s.attributes.name
              .replace(/\w+/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1);
              })
              .replace(/\s/g, '');

            s.attributes.attrName = attName;
            s.attributes.displayName = name;
            return s;
          });
          setSignPermissionData(data);
        })
        .catch((err) => {
          setSignPermissionData(null);
        })
        .finally(() => {});
    }
  }, []);

  useEffect(() => {
    for (let index = 0; index < signPermissionData?.length; index++) {
      let checkbox = cBox.getInstance(
        document.getElementById('checkBox' + signPermissionData[index].id)
      );

      if (signPermissionData[index].attributes.sign_permission.data === null)
        checkbox.option('disabled', false);
      else
        signPermissionData[index].checkDisabled === false
          ? checkbox.option('disabled', false)
          : checkbox.option('disabled', true);

      if (
        props.element.sign &&
        props.element.sign.find((l) => l.id === signPermissionData[index].id)
      ) {
        checkbox.option('value', true);
      }
    }
  }, [signPermissionData]);

  const onCheckBoxValueChanged = (e, item) => {
    props.element.user = props.preview.props.user;

    if (e) {
      if (!props.element.sign) {
        props.element.sign = [];
      }
      if (
        props.element.sign.length > 0 &&
        props.element.sign.find((p) => p.id === item.id)
      ) {
        let sign = props.element.sign.find((p) => p.id === item.id);
        sign.attributes.permissions =
          item.attributes.users_permissions_roles.data.map((r) => {
            let s = { key: r.id, name: r.attributes.name };
            return s;
          });
        sign.checkClicked = true;
      } else {
        let permissions = item.attributes.users_permissions_roles.data.map(
          (r) => {
            let s = { key: r.id, name: r.attributes.name };
            return s;
          }
        );
        item.attributes.permissions = permissions;
        item.checkClicked = true;
        props.element.sign.push(item);
      }
    } else {
      let index = -1;
      props.element.sign.find((p, i) => {
        if (p.id === item.id) index = i;
      });
      props.element.sign.splice(index, 1);
    }

    setElement(props.element);
    props.updateElement(element);

    updateCheckBox(e, item);
  };

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
          if (e === true) {
            checkbox.option('disabled', false);
            signPermissionData[index].checkDisabled = false;
          } else {
            checkbox.option('disabled', true);
            signPermissionData[index].checkDisabled = true;
          }
        } else {
          let dep = cBox.getInstance(
            document.getElementById(
              'checkBox' +
                signPermissionData[index].attributes.sign_permission.data.id
            )
          );
          if (dep._props.value === true) {
            checkbox.option('disabled', false);
            signPermissionData[index].checkDisabled = false;
          } else {
            checkbox.option('disabled', true);
            signPermissionData[index].checkDisabled = true;
          }
        }
      }
      // console.log(signPermissionData[index]);
    }
  };

  if (dirty) {
    props.element.dirty = true;
  }

  return (
    <div>
      <div className="edit-permission-panel"></div>
      <Popup
        visible={true}
        dragEnabled={false}
        hideOnOutsideClick={true}
        showCloseButton={true}
        showTitle={true}
        title={props.element.text}
        container=".edit-permission-panel"
        width={600}
        height={600}
        onHiding={props.manualEditPermissionModeOff}
      >
        <Position at="center" my="center" collision="fit" />

        {signPermissionData?.map((item, i) => {
          const userID = item.id;
          console.log(item);
          return (
            <CheckBox
              className="CheckBoxField"
              key={`checkBox${item.id}`}
              id={`checkBox${item.id}`}
              onValueChange={(e) => onCheckBoxValueChanged(e, item, userID)}
              text={item.attributes.displayName}
              // disabled={isDisabled(item)}
            />
          );
        })}
      </Popup>
    </div>
  );
};

FormElementsPermission.defaultProps = { className: 'edit-element-fields' };
export default FormElementsPermission;
