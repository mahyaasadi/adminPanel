"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import CenterSearch from "components/dashboard/centers/centerSearch/centerSearch";
import CentersListTable from "components/dashboard/centers/centersListTable/centersListTable";
import AddCenterModal from "components/dashboard/centers/addCenterModal/addCenterModal";
import EditCenterModal from "components/dashboard/centers/editCenterModal/editCenterModal";
import BusinessHoursModal from "components/dashboard/centers/centerBusinessHours/businessHoursModal";
import EditBusinessHourModal from "components/dashboard/centers/centerBusinessHours/editBusinessHoursModal";
import CenterAboutUsModal from "components/dashboard/centers/aboutUs/centerAboutUsModal";
import EditAboutUsModal from "components/dashboard/centers/aboutUs/editCenterAboutUs/editAboutUsModal";
import { useRouter } from "next/router";

let ActiveCenterID,
  ActiveCenterName = null;

const CentersManagement = () => {
  const Router = useRouter();
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

  // -------------------
  const [centerAboutUsData, setCenterAboutUsData] = useState([]);

  // -------------------
  let selectedPage = Router.query.page;
  const ChangeDtPage = (e) => {
    const url = new URL(location);
    url.searchParams.set("page", e);
    history.pushState({}, "", url);
  };

  //get all centers
  const getCentersData = () => {
    setIsLoading(true);
    let url = "Center/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        setCentersData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "خطا در دریافت اطلاعات مرکز");
      });
  };

  // Search In Centers
  const [centerSearchInput, setCenterSearchInput] = useState("");
  const searchedCenters = centersData.filter((center) =>
    center.Name.toLowerCase().includes(centerSearchInput.toLowerCase())
  );

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
    ActiveCenterID = centerId;
    console.log("centerId", ActiveCenterID);
  };

  let newLogo = null;
  const editCenter = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const CenterID = formProps.editCenterID;

    if (ActiveCenterID) {
      let url = `center/edit/${ActiveCenterID}`;
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
          response.data._id = ActiveCenterID;
          updateItem(formProps.editCenterID, response.data);
          $("#editCenterModal").modal("hide");
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید");
        });
    } else {
      ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید");
    }
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

  // ------ about us -------

  const getCenterAboutUs = (centerId) => {
    let url = `/CenterProfile/getAboutUs/${centerId}`;
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setCenterAboutUsData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        ErrorAlert("خطا", "دریافت اطلاعات با خطا مواجه گردید!");
      });
  };

  const openAboutUsModal = (data, centerId, centerName) => {
    $("#centerAboutUsModal").modal("show");
    ActiveCenterID = centerId;
    ActiveCenterName = centerName;
    getCenterAboutUs(centerId);
  };

  // edit about us
  const updateAboutUs = (data) => {
    $("#editCenterAboutUsModal").modal("show");
    setCenterAboutUsData(data);
  };

  const editCenterAboutUs = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterProfile/UpdateAboutUs";
    let data = {
      CenterID: ActiveCenterID,
      AboutUs: formProps.editAboutUsText,
    };

    console.log("data", data);

    setIsLoading(true);

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        setCenterAboutUsData(response.data);
        setIsLoading(false);
        $("#editCenterAboutUsModal").modal("hide");
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
      <Head>
        <title>مدیریت مراکز</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-md-12 d-flex gap-2 justify-content-end media-srvHeader">
                  <CenterSearch
                    centerSearchInput={centerSearchInput}
                    setCenterSearchInput={setCenterSearchInput}
                  />
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
                    data={searchedCenters}
                    updateCenterInfo={updateCenterInfo}
                    openBusinessHoursModal={openBusinessHoursModal}
                    openAboutUsModal={openAboutUsModal}
                    selectedPage={selectedPage}
                    ChangeDtPage={ChangeDtPage}
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

        <CenterAboutUsModal
          data={centerAboutUsData}
          CenterName={ActiveCenterName}
          updateAboutUs={updateAboutUs}
        />

        <EditAboutUsModal
          data={centerAboutUsData}
          isLoading={isLoading}
          editCenterAboutUs={editCenterAboutUs}
        />
      </div>
    </>
  );
};

export default CentersManagement;
