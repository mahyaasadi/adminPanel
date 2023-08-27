"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import CentersListTable from "components/dashboard/centers/centersListTable/centersListTable";
import AddCenterModal from "components/dashboard/centers/addCenterModal/addCenterModal";
import EditCenterModal from "components/dashboard/centers/editCenterModal/editCenterModal";
import BusinessHoursModal from "components/dashboard/centers/centerBusinessHours/businessHoursModal";
import EditBusinessHourModal from "components/dashboard/centers/centerBusinessHours/editBusinessHoursModal";

let ActiveCenterID = null;

const CentersManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [centersData, setCentersData] = useState([]);
  const [provinceOptionsList, setProvinceOptionsList] = useState([]);
  const [cityOptionsList, setCityOptionsList] = useState([]);

  const [editCenterData, setEditCenterData] = useState([]);
  const [selectedProvinceList, setSelectedProvinceList] = useState("");

  // -------------------
  const [businessHourData, setBusinessHourData] = useState([]);
  const [editBusinessHourData, setEditBusinessHourData] = useState({
    empty: 1,
  });

  //get all centers
  const getCentersData = () => {
    setIsLoading(true);
    let url = "Center/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setCentersData(response.data);

        // let centerIndex = [];
        // for (let i = 0; i < response.data.length; i++) {
        //   response.data?.map((item, index) => {
        //     let itemIndex = index;
        //     // console.log("index", index);
        //   });
        //   centerIndex.push(itemIndex);
        //   console.log("itemIndex", itemIndex);
        // }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "خطا در دریافت اطلاعات مرکز");
      });
  };

  // Convert logoUrl to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  let logo = null;
  const addCenter = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "Center/add";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.logo && formProps.logo.size != 0) {
      logo = await convertBase64(formProps.logo);
    }
    let data = {
      Name: formProps.addCenterName,
      EngName: formProps.addCenterEngName,
      City: $("#citySelectOptions").text(),
      CityFinglish: formProps.addCenterCity,
      Province: $("#ProvinceSelectOptions").text(),
      ProvinceFinglish: formProps.addCenterProvince,
      Address: formProps.addCenterAddress,
      Loc: formProps.addCenterLocation,
      Domain: formProps.addCenterDomain,
      ViewDes: formProps.addCenterDescription,
      Logo: logo,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setCentersData([...centersData, response.data]);
        $("#logoUploadPreview").attr("src", " ");

        $("#addCenterModal").modal("hide");
        setIsLoading(false);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("خطا", "افزودن مرکز با خطا مواجه گردید!");
      });
  };

  const getAllProvinces = () => {
    let url = "Province/getAll";
    axiosClient
      .get(url)
      .then((response) => {
        let selectProvinceData = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          let provinceObj = {
            value: item.Finglish,
            label: item.State,
            cities: item.Cities,
          };
          selectProvinceData.push(provinceObj);
        }
        setProvinceOptionsList(selectProvinceData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FUSelectProvince = (province) => {
    setSelectedProvinceList(province);
  };

  let SelectedCity = "";
  const FUSelectCity = (city) => {
    SelectedCity = city;
  };

  const setCityOption = (data) => {
    setCityOptionsList(data);
  };

  // Edit Center Info
  const updateCenterInfo = (data, centerId) => {
    setEditCenterData(data);
    $("#editCenterModal").modal("show");
    // ActiveCenterID = centerId;
  };

  let newLogo = null;
  const editCenter = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const CenterID = formProps.centerID;

    let url = `center/edit/${CenterID}`;
    if (formProps.editLogo && formProps.editLogo.size != 0) {
      newLogo = await convertBase64(formProps.editLogo);
    }

    let data = {
      Name: formProps.editCenterName,
      EngName: formProps.editCenterEngName,
      City: $("#editCitySelectOptions").text(),
      CityFinglish: formProps.addCenterCity,
      Province: $("#editProvinceSelectOptions").text(),
      ProvinceFinglish: formProps.editCenterProvince,
      Address: formProps.editCenterAddress,
      Loc: formProps.editCenterLocation,
      Domain: formProps.editCenterDomain,
      ViewDes: formProps.editCenterDescription,
      Logo: newLogo,
    };

    console.log("data", data);

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        updateItem(formProps.centerID, response.data);
        $("#editCenterModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید");
      });
  };

  const updateItem = (id, newArr) => {
    let index = centersData.findIndex((x) => x._id === id);
    let g = centersData[index];
    g = newArr;

    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setCentersData([
        ...centersData.slice(0, index),
        g,
        ...centersData.slice(index + 1),
      ]);
  };

  // ----- business hours -----
  const getBusinessHours = (centerId) => {
    let url = `CenterProfile/getBusinessHours/${centerId}`;
    setIsLoading(true);

    // if (centerId) {
    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setBusinessHourData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        ErrorAlert("خطا", "خطا در دریافت ساعات کاری مرکز");
      });
    // }
  };

  const openBusinessHoursModal = (id) => {
    $("#businessHoursModal").modal("show");
    ActiveCenterID = id;
    getBusinessHours(id);
  };

  // edit businessHour
  const updateBusinessHour = (data) => {
    $("#editCenterBusinessHourModal").modal("show");
    setEditBusinessHourData(data);
    console.log(data);
  };

  const changeToAllDayMode = async (data) => {
    data?.map((item, index) => {
      console.log(data[index]);
      data[index].Start = "00:00";
      data[index].End = "24:00";
      data[index].Close = false;
      console.log(data);
    });
    $("#editCenterBusinessHourModal").modal("show");
    await setEditBusinessHourData(data);
  };

  const editBusinessHours = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "CenterProfile/UpdateBusinessHours";
    let data = {
      CenterID: ActiveCenterID,
      BusinessHours: editBusinessHourData,
    };

    console.log("data", data);

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        setBusinessHourData(response.data);

        $("#editCenterBusinessHourModal").modal("hide");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
      });
  };

  useEffect(() => {
    getCentersData();
    getAllProvinces();
  }, []);

  return (
    <>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-md-12 d-flex justify-content-end">
                  <Link
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#addCenterModal"
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

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title font-16">لیست مراکز</h5>
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

                  <CentersListTable
                    data={centersData}
                    updateCenterInfo={updateCenterInfo}
                    openBusinessHoursModal={openBusinessHoursModal}
                  />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}

        <AddCenterModal
          addCenter={addCenter}
          provinceOptionsList={provinceOptionsList}
          FUSelectProvince={FUSelectProvince}
          FUSelectCity={FUSelectCity}
          cityOptionsList={cityOptionsList}
          setCityOption={setCityOption}
          defaultData={editCenterData}
          isLoading={isLoading}
        />

        <EditCenterModal
          data={editCenterData}
          editCenter={editCenter}
          provinceOptionsList={provinceOptionsList}
          FUSelectProvince={FUSelectProvince}
          FUSelectCity={FUSelectCity}
          cityOptionsList={cityOptionsList}
          setCityOption={setCityOption}
          setSelectedProvinceList={setSelectedProvinceList}
          selectedProvinceList={selectedProvinceList}
          isLoading={isLoading}
        />

        <BusinessHoursModal
          data={businessHourData}
          updateBusinessHour={updateBusinessHour}
          changeToAllDayMode={changeToAllDayMode}
        />

        <EditBusinessHourModal
          data={editBusinessHourData}
          editBusinessHours={editBusinessHours}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default CentersManagement;
