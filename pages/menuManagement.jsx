"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import MenuListTable from "components/dashboard/menuManagement/menuListTable/menuListTable";
import AddToMenuModal from "components/dashboard/menuManagement/addToMenuModal/addToMenuModal";
import SubMenuModal from "components/dashboard/menuManagement/subMenu/subMenuModal/subMenuModal";
import AddSubMenuModal from "components/dashboard/menuManagement/subMenu/addSubMenuModal/addSubMenuModal";
import EditMenuModal from "components/dashboard/menuManagement/editMenuModal/editMenuModal";
import EditSubMenuModal from "components/dashboard/menuManagement/subMenu/editSubMenuModal/editSubMenuModal";

let ActiveMenuID = null;
let ActiveMenuName = null;

let CenterID = Cookies.get("CenterID");

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

  const [editedMenu, setEditedMenu] = useState([]);
  const [editedSubMenu, setEditedSubMenu] = useState([]);

  //
  // let data = $(".perCheckbox-input:checked").serialize();
  // data = data.split("&");
  // let selectedPermission = [];

  // data.map((item) => {
  //   let permissionID = item.replace("per=", "");
  //   var foundIndex = permissionsList.findIndex((x) => x._id == permissionID);
  //   selectedPermission.push(foundIndex);
  //   let arr = permissionsList[foundIndex];
  //   arr.Checked = 1;
  //   permissionsList[foundIndex] = arr;
  // });

  // permissionsList.forEach((item, index) => {
  //   if (!selectedPermission.includes(index)) {
  //     let arr = permissionsList[index];
  //     arr.Checked = 0;
  //     permissionsList[index] = arr;
  //   }
  // });
  //

  // const [agreement, setAgreement] = useState(true);
  // const handleChange = (e) => setAgreement(e.target.checked);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(`checked: ${agreement}`);
  // };

  const [checkedState, setCheckedState] = useState();

  // menu permission checkbox
  const handleCheckedMenuPermissions = (e) => {
    const { value, checked } = e.target;
    const { menuAccessList } = menuPermissionStatus;

    console.log(`${value} is ${checked}`);
    setCheckedState(checked);
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
    };

    console.log("addedData", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log("addSubResponse", response.data);
        setSubMenuList([...subMenuList, response.data]);
        console.log("subMenuList", subMenuList);
        setIsLoading(false);

        $("#addSubMenuModal").modal("hide");
        // updating the menu list overall
        getMenuData();
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // edit menu
  const editMenu = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let menuId = formProps.editMenuID;

    let url = `/InoMenu/update/${menuId}`;

    let data = {
      CenterID: CenterID,
      Name: formProps.editMenuName,
      Icon: formProps.editMenuIcon,
      Permissions: formProps.editmenuAccessList,
    };

    console.log(formProps);
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
    setEditedMenu(data);
    $("#editMenuModal").modal("show");
  };

  // edit subMenu
  const editSubMenu = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let subMenuId = formProps.editSubMenuID;

    let url = `/InoMenu/update/${subMenuId}`;
    let data = {
      CenterID: CenterID,
      Name: formProps.editSubMenuName,
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
      let data = { CenterID: CenterID };

      await axiosClient
        .delete(url, { data })
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
        CenterID: CenterID,
        SubMenuID: id,
      };

      console.log("MenuID: ", ActiveMenuID, "subMenuID :", id);

      await axiosClient
        .delete(url, { data })
        .then((response) => {
          console.log(response.data);
          setSubMenuList(subMenuList.filter((a) => a._id !== id));
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
          data={editedMenu}
          editMenu={editMenu}
          permissionsList={permissionsList}
          handleCheckedMenuPermissions={handleCheckedMenuPermissions}
          // checked={checked}
          // checked={(e) => handleCheckedMenuPermissions(e.checked)}
          // handleChange={handleChange}
          // handleSubmit={handleSubmit}
          // agreement={agreement}
          checkedState={checkedState}
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
        />
      </div>
    </>
  );
};

export default MenuManagement;
