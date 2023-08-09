"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import MenuListTable from "components/dashboard/menus/menuListTable/menuListTable";
import AddToMenuModal from "components/dashboard/menus/addToMenuModal/addToMenuModal";
import SubMenuModal from "components/dashboard/menus/subMenu/subMenuModal/subMenuModal";
import AddSubMenuModal from "components/dashboard/menus/subMenu/addSubMenuModal/addSubMenuModal";
import EditMenuModal from "components/dashboard/menus/editMenuModal/editMenuModal";
import EditSubMenuModal from "components/dashboard/menus/subMenu/editSubMenuModal/editSubMenuModal";

let ActiveMenuID = null;
let ActiveMenuName = null;

const MenusManagement = () => {
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

  const [editMenuData, setEditMenuData] = useState({ empty: 1 });
  const [editedSubMenu, setEditedSubMenu] = useState({ empty: 1 });

  // menu permission checkbox
  const handleCheckedMenuPermissions = (e) => {
    const { value, checked } = e.target;
    const { menuAccessList } = menuPermissionStatus;

    console.log(`${value} is ${checked}`);
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

    console.log(`${value} is ${checked}`);

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
        setMenuList(response.data);
        console.log("menuList", response.data);
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
    let addData = {
      Name: formProps.addMenuName,
      Icon: formProps.addMenuIcon,
      Url: formProps.addMenuUrl,
      Permissions: menuPermissionStatus.menuAccessList,
    };

    console.log("addData", addData);
    axiosClient
      .post(url, addData)
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
    setSubMenuList(subMenus);
  };

  //Add subMenu
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
      Url: formProps.addSubMenuUrl,
    };

    console.log("addedData", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log("addSubResponse", response.data);
        setSubMenuList([...subMenuList, response.data]);
        setIsLoading(false);

        // updating the menu list overall
        getMenuData();
        $("#addSubMenuModal").modal("hide");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  function editMenuCheckList(data) {
    if (data.empty !== 1) {
      $(".EditPerCheckBox").prop("checked", false);
      data.Permissions.map((per) => {
        $("#EditPer" + per.PermisionID).prop("checked", true);
        console.log(data.Permissions);
      });
    }
  }

  function editSubMenuCheckList(data) {
    if (data.empty !== 1) {
      $(".EditSubMenuPerCheckBox").prop("checked", false);
      data.Permissions.map((per) => {
        $("#EditSubMenuPer" + per.PermisionID).prop("checked", true);
        console.log(data.Permissions);
      });
    }
  }

  // edit menu
  const editMenu = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let menuId = formProps.editMenuID;

    let selected = $(".EditPerCheckBox:checkbox:checked");
    let SelectedVal = [];
    selected.map((element) => {
      SelectedVal.push($(".EditPerCheckBox:checkbox:checked")[element].value);
    });

    console.log("selected", SelectedVal);

    let url = `/InoMenu/update/${menuId}`;
    let data = {
      Name: formProps.editMenuName,
      Icon: formProps.editMenuIcon,
      Permissions: SelectedVal,
      Url: formProps.editMenuUrl,
    };

    console.log("data", data, "menuId", menuId);

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        updateMenuItem(formProps.editMenuID, response.data);
        $("#editMenuModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateMenuItem = (id, newArr) => {
    let index = menuList.findIndex((x) => x._id === id);

    let g = menuList[index];
    g = newArr;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setMenuList([
        ...menuList.slice(0, index),
        g,
        ...menuList.slice(index + 1),
      ]);
  };

  const updateMenu = (data) => {
    setEditMenuData(data);
    $("#editMenuModal").modal("show");
  };

  // edit subMenu
  const editSubMenu = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let subMenuId = formProps.editSubMenuID;

    let url = `/InoMenu/update/${subMenuId}`;

    console.log(selected);
    let prevCheckedSubPermissions = editSubMenu.Permissions;
    let newlyCheckedSubPermissions = subMenuPermissionStatus.subMenuAccessList;

    console.log("prev", prevCheckedSubPermissions);
    console.log("new", newlyCheckedSubPermissions);

    let allCheckedSubPermissions = prevCheckedSubPermissions.concat(
      newlyCheckedSubPermissions
    );

    let data = {
      Name: formProps.editSubMenuName,
      Url: formProps.editSubMenuUrl,
      Permissions: allCheckedSubPermissions,
    };

    console.log("data", data, "subMenuId", subMenuId);

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        updateSubMenuItem(formProps.editSubMenuID, response.data);
        $("#editSubMenuModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateSubMenuItem = (id, newArr) => {
    let index = subMenuList.findIndex((x) => x._id === id);

    let g = subMenuList[index];
    g = newArr;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setSubMenuList([
        ...subMenuList.slice(0, index),
        g,
        ...subMenuList.slice(index + 1),
      ]);
  };

  const updateSubMenu = (data) => {
    setEditedSubMenu(data);
    $("#editSubMenuModal").modal("show");
  };

  // delete menu
  const deleteMenu = async (id) => {
    let result = await QuestionAlert(
      "حذف منو !",
      "?آیا از حذف منو مطمئن هستید"
    );

    setIsLoading(true);
    if (result) {
      let url = `/InoMenu/delete/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setMenuList(menuList.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // delete submenu
  const deleteSubMenu = async (id) => {
    let result = await QuestionAlert(
      "حذف زیر منو !",
      "?آیا از حذف زیر منو مطمئن هستید"
    );

    setIsLoading(true);
    if (result) {
      let url = `/InoMenu/deleteSubMenu/${ActiveMenuID}`;
      let data = {
        SubMenuID: id,
      };

      console.log("MenuID: ", ActiveMenuID, "subMenuID :", id);

      await axiosClient
        .delete(url, { data })
        .then((response) => {
          console.log(response.data);
          setSubMenuList(subMenuList.filter((a) => a._id !== id));

          // updating the menu list overall
          getMenuData();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

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

          {/* <!-- Menu List --> */}
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
                    deleteMenu={deleteMenu}
                    updateMenu={updateMenu}
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

        <EditMenuModal
          data={editMenuData}
          editMenu={editMenu}
          permissionsList={permissionsList}
          editMenuCheckList={editMenuCheckList}
          handleCheckedMenuPermissions={handleCheckedMenuPermissions}
        />

        <SubMenuModal
          data={subMenuList}
          addSubMenu={addSubMenu}
          openSubMenuModal={openSubMenuModal}
          deleteSubMenu={deleteSubMenu}
          menuName={ActiveMenuName}
          updateSubMenu={updateSubMenu}
        />

        <AddSubMenuModal
          menuList={menuList}
          permissionsList={permissionsList}
          addSubMenu={addSubMenu}
          handleCheckedSubMenuPermissions={handleCheckedSubMenuPermissions}
        />

        <EditSubMenuModal
          data={editedSubMenu}
          editSubMenu={editSubMenu}
          permissionsList={permissionsList}
          handleCheckedSubMenuPermissions={handleCheckedSubMenuPermissions}
          editSubMenuCheckList={editSubMenuCheckList}
        />
      </div>
    </>
  );
};

export default MenusManagement;
