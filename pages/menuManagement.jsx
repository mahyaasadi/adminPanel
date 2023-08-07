"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/commonComponents/loading/loading";
import MenuListTable from "components/dashboard/menuManagement/menuListTable/menuListTable";
import AddToMenuModal from "components/dashboard/menuManagement/addToMenuModal/addToMenuModal";
import AddSubMenuModal from "components/dashboard/menuManagement/subMenu/addSubMenuModal/addSubMenuModal";
import SubMenuModal from "components/dashboard/menuManagement/subMenu/subMenuModal/subMenuModal";

let ActiveMenuID = null;
let ActiveMenuName = null;

const MenuManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuList, setMenuList] = useState([]);
  const [subMenuList, setSubMenuList] = useState([]);
  const [permissionsList, setPermissionsList] = useState([]);

  const [menuPermissionStatus, setMenuPermissionStatus] = useState({
    menuAccessList: [],
  });
  const [subMenuPermissionStatus, setSubMenuPermissionStatus] = useState({
    subMenuAccessList: [],
  });

  // menu permission checkbox
  const handleCheckedMenuPermissions = (e) => {
    const { value, checked } = e.target;
    const { menuAccessList } = menuPermissionStatus;

    // console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setMenuPermissionStatus({ menuAccessList: [...menuAccessList, value] });
    }
    // Case 2  : The user unchecks the box
    else {
      setMenuPermissionStatus({
        menuAccessList: menuAccessList.filter((e) => e !== value),
      });
    }
  };

  // subMenu permission checkbox
  const handleCheckedSubMenuPermissions = (e) => {
    const { value, checked } = e.target;
    const { subMenuAccessList } = subMenuPermissionStatus;

    // console.log(`${value} is ${checked}`);

    if (checked) {
      setSubMenuPermissionStatus({
        subMenuAccessList: [...subMenuAccessList, value],
      });
    } else {
      setSubMenuPermissionStatus({
        subMenuAccessList: subMenuAccessList.filter((e) => e !== value),
      });
    }
  };

  // get all permissions
  const getAllPermissions = (arr) => {
    let url = "Permision/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then(async function (response) {
        if (response.data) {
          setIsLoading(false);
          setPermissionsList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // get menu list
  const getMenuData = () => {
    let url = "InoMenu/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        // console.log("menuList", response.data);
        setMenuList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  //add to menu
  const addToMenu = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "InoMenu/add";
    let data = {
      Name: formProps.addMenuName,
      Icon: formProps.addMenuIcon,
      Permissions: menuPermissionStatus.menuAccessList,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setMenuList([...menuList, response.data]);

        $("#addToMenuModal").modal("hide");
        setIsLoading(false);
        e.target.reset();
      })
      .catch((error) => console.log(error));
    setIsLoading(false);
  };

  const openSubMenuModal = () => {
    $("#addSubMenuModal").modal("show");
  };

  const SetSubMenuInDT = (subMenus, id, name) => {
    ActiveMenuID = id;
    ActiveMenuName = name;
    // setSubMenuList([...subMenuList, menus]);
    setSubMenuList(subMenus);
    console.log("subMenuList", subMenuList, "subMenus", subMenus);
  };

  //add submenu
  const addSubMenu = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "InoMenu/addSubMenu";
    let data = {
      Name: formProps.addSubMenuName,
      MenuID: ActiveMenuID,
      Permissions: subMenuPermissionStatus.subMenuAccessList,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log("addSub Response", response.data);
        setSubMenuList([...subMenuList, response.data]);
        setIsLoading(false);

        $("#addSubMenuModal").modal("hide");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // console.log("subMenuList", subMenuList);

  useEffect(() => {
    getAllPermissions();
    getMenuData();
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addToMenuModal"
                  className="btn btn-primary btn-add"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  افزودن
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Product List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title font-16">لیست منوها</h5>
                    </div>
                    <div className="col-auto d-flex flex-wrap">
                      <div className="form-custom me-2">
                        <div
                          id="tableSearch"
                          className="dataTables_wrapper"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <MenuListTable
                    data={menuList}
                    SetSubMenuInDT={SetSubMenuInDT}
                  />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        <AddToMenuModal
          permissionsList={permissionsList}
          addToMenu={addToMenu}
          handleCheckedMenuPermissions={handleCheckedMenuPermissions}
        />

        <SubMenuModal
          data={subMenuList}
          addSubMenu={addSubMenu}
          openSubMenuModal={openSubMenuModal}
          menuName={ActiveMenuName}
        />

        <AddSubMenuModal
          menuList={menuList}
          permissionsList={permissionsList}
          addSubMenu={addSubMenu}
          handleCheckedSubMenuPermissions={handleCheckedSubMenuPermissions}
        />
      </div>
    </>
  );
};

export default MenuManagement;
