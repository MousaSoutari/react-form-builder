import React, { useState, useEffect } from "react";
import http from "../axiosClient";
const Header = () => {
  const [signPermissionData, setSignPermissionData] = useState(null);

  useEffect(() => {
    if (!signPermissionData) {
      http()
        .request({
          url: `/sign-permissions`,
          method: "get",
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

  return (
    <div>
      {/* {usersPermissionsData?.map((i) => {
        <div>{i}</div>;
      })} */}
      {signPermissionData?.map((item, i) => {
        return (
          <h5 className="UsersPremission" key={`sign${i}`}>
            {item.attributes.name}
          </h5>
        );
      })}
    </div>
  );
};

export default Header;
