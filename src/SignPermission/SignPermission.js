import React, { useState, useEffect, useCallback } from 'react';
import DataGrid, {
  Column,
  FilterRow,
  SearchPanel,
  Paging,
  Pager,
  Scrolling,
  Editing,
  Form,
  RequiredRule,
  AsyncRule,
  Export,
  Popup,
  Lookup,
  RemoteOperations,
} from 'devextreme-react/data-grid';
import http from '../axiosClient';
import TagBox from 'devextreme-react/tag-box';
import { Item } from 'devextreme-react/form';
import CustomStore from 'devextreme/data/custom_store';
import { successMsg, errorMsg } from '../successAndErrorMsg/successAndErrorMsg';
import getQueryParams from '../tableUtilities';
const SignPermission = () => {
  const allowedPageSizes = [5, 10, 100];
  const exportFormats = ['excel', 'pdf'];
  const [roleNameData, setRoleNameData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState(null);
  const [loadingRole, setLoadingRole] = useState(false);
  const [roleError, setRoleError] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [signData, setSignData] = useState(null);

  function handleErrors(response) {
    if (response.status !== 200) throw Error(response.statusText);
    return response;
  }

  const gridDataSource = {
    store: new CustomStore({
      key: 'id',
      load: (loadOptions) => {
        const pageSize = loadOptions.take ?? 10;
        let pageIndex = 1;
        if (loadOptions.take && loadOptions.skip)
          pageIndex = Math.floor(loadOptions.skip / loadOptions.take) + 1;

        return http()
          .request({
            url: `/sign-permissions?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${pageSize}${getQueryParams(
              {
                loadOptions,
                ignoreDeleted: true,
              }
            )}`,
            method: 'get',
          })
          .then(handleErrors)
          .then((response) => {
            return response;
          })
          .then((result) => {
            // console.log(result);
            setSignData();
            return {
              data: result.data.data,

              totalCount: result.data.meta.pagination.total,
            };
          });
      },

      insert: (values) => {
        if (values.attributes.users_permissions_roles) {
          let roleid = values.attributes.users_permissions_roles.data.id;
          delete values.attributes.users_permissions_roles;
          values.attributes.users_permissions_roles = roleid;
        }
        return http()
          .request({
            url: '/sign-permissions',
            method: 'post',
            data: { data: values.attributes },
          })
          .then(handleErrors)
          .then(() => {
            successMsg();
          })
          .catch((err) => {
            console.log(err.message);
            errorMsg();
          });
      },
      remove: (key) => {
        return http()
          .request({
            url: `/sign-permissions/${key}`,
            method: 'put',
            data: {
              data: {
                deleted: true,
              },
            },
          })
          .then(handleErrors)
          .then(() => {
            successMsg();
          })
          .catch((err) => {
            console.log(err.message);
            errorMsg();
          });
      },

      update: (key, values) => {
        if (values.attributes.users_permissions_roles) {
          let roleid = values.attributes.users_permissions_roles.data.id;
          delete values.attributes.users_permissions_roles;
          values.attributes.users_permissions_roles = roleid;
        }
        return http()
          .request({
            url: `/sign-permissions/${key}`,
            method: 'put',
            data: { data: values.attributes },
          })
          .then(handleErrors)
          .then((response) => {
            successMsg();
          })
          .catch((err) => {
            console.log(err.message);
            errorMsg();
          });
      },
    }),
  };

  const nameValidation = (data) => {
    return new Promise((resolve, reject) => {
      const columnName = data.column.dataField.replace('attributes.', '');
      return http()
        .request({
          url: `/sign-permissions?filters[${columnName}][$eq]=${data.value}`,
          method: 'get',
        })
        .then((response) => {
          if (response.data.meta.pagination.total > 0)
            if (response.data.data[0].attributes.name === data.value)
              if (response.data.data[0].id !== data.data.id)
                reject('Name should be unique');
        })
        .catch((err) => {
          reject('Name should be unique');
        })
        .finally(() => {
          resolve('SUCCESS');
        });
    });
  };
  useEffect(
    () => {
      if (!roleData) {
        setLoadingRole(true);
        http()
          .request({
            url: '/users-permissions/roles',
            method: 'get',
          })
          .then((response) => {
            setRoleData(response.data.roles);
            setRoleError(null);
          })
          .catch((err) => {
            setRoleError(err.message);
            setRoleData(null);
          })
          .finally(() => {
            setLoadingRole(false);
          });
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const RoleTagBox = () => {
    return (
      <TagBox
        items={roleData}
        showSelectionControls={true}
        maxDisplayedTags={5}
        displayExpr="name"
        valueExpr="id"
        selectAllMode="allPages"
      />
    );
  };
  const RoleNameCellRender = (item) => {
    if (item.data.attributes.users_permissions_roles.data) {
      return item.data.attributes.users_permissions_roles.data
        .map((m) => m.attributes.name)
        .join(' ,');
    }
  };
  return (
    <React.Fragment>
      <h2 className={'content-block'}>Sign permissions</h2>

      <div className={'content-block dx-card responsive-paddings'}>
        <DataGrid
          id="gridContainer"
          dataSource={gridDataSource}
          columnAutoWidth
          focusedRowEnabled
          rowAlternationEnabled
          onExporting={onExporting}
          remoteOperations={true}
        >
          <Editing
            mode="popup"
            useIcons
            allowUpdating
            allowAdding
            allowDeleting
          >
            <Popup
              title="Sign permission Info"
              showTitle={true}
              width={700}
              height={550}
            />
            <Form labelMode="floating">
              <Item itemType="group" colCount={2} colSpan={2}>
                <Item dataField="attributes.name" />
                <Item dataField="attributes.users_permissions_roles.data.id" />
                <Item dataField="attributes.sign_permissions.data.id" />
              </Item>
            </Form>
          </Editing>
          <RemoteOperations filtering={true} />
          <Scrolling rowRenderingMode="virtual" />
          <Paging defaultPageSize={10} />
          <Pager
            visible
            showPageSizeSelector
            showInfo
            showNavigationButtons
            allowedPageSizes={allowedPageSizes}
          />
          <FilterRow visible applyFilter="" />
          <SearchPanel placeholder="Search..." />
          <Column dataField="id" caption="ID" alignment="left" />
          <Column dataField="attributes.name" caption="Name" alignment="left">
            <RequiredRule message="Name is required" />
            <AsyncRule
              validationCallback={nameValidation}
              message="item name should be unique"
            />
          </Column>

          <Column
            dataField="attributes.users_permissions_roles.data.id"
            caption="Roles"
            editCellComponent={RoleTagBox}
            cellRender={RoleNameCellRender}
          >
            <Lookup valueExpr="id" displayExpr="name" dataSource={roleData} />
          </Column>

          <Column
            dataField="attributes.sign_permissions.data.id"
            caption="Sign permissions"
          >
            <Lookup
              valueExpr="id"
              displayExpr="attributes.name"
              dataSource={gridDataSource}
            />
          </Column>
          <Column
            dataField="attributes.createdAt"
            caption="Created Date"
            alignment="left"
            dataType="datetime"
            format="M/d/yyyy, HH:mm"
            allowEditing={false}
          ></Column>
          <Column
            dataField="attributes.updatedAt"
            caption="Update Date"
            alignment="left"
            dataType="datetime"
            format="M/d/yyyy, HH:mm"
            allowEditing={false}
          ></Column>

          <Export enabled formats={exportFormats} />
        </DataGrid>
      </div>
    </React.Fragment>
  );
};

export default SignPermission;
