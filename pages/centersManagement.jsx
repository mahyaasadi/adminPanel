"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { axiosClient } from "class/axiosConfig.js";
import FeatherIcon from "feather-icons-react";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import CenterSearch from "components/dashboard/centers/centerSearch";
import CentersListTable from "components/dashboard/centers/centersListTable";
import AddCenterModal from "components/dashboard/centers/addCenterModal/addCenterModal";
import EditCenterModal from "components/dashboard/centers/editCenterModal/editCenterModal";
import BusinessHoursModal from "components/dashboard/centers/centerBusinessHours/businessHoursModal";
import EditBusinessHourModal from "components/dashboard/centers/centerBusinessHours/editBusinessHoursModal";
import CenterAboutUsModal from "components/dashboard/centers/aboutUs/centerAboutUsModal";
import EditAboutUsModal from "components/dashboard/centers/aboutUs/editAboutUsModal";
import { getSession } from "lib/session";

export const getServerSideProps = async ({ req, res }) => {
  const result = getSession(req, res);

  if (result) {
    const { UserData } = result;
    return { props: { UserData } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
};

let ActiveCenterID,
  ActiveCenterName = null;

const CentersManagement = ({ UserData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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

  const initialPage = Number(router.query.page) || 1; // Default to page 1 if no page is provided in the URL.
  const [selectedPage, setSelectedPage] = useState(initialPage);

  const ChangeTablePage = (e) => {
    setSelectedPage(e);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: e },
      },
      undefined,
      { shallow: true }
    );
  };

  //get all centers
  const getCentersData = () => {
    setIsLoading(true);
    let url = "Center/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        // console.log("all centers", response.data);
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

        // reset
        e.target.reset();
        logo = null;
        $("#addCenterLogo").val("");
        $("#logoUploadPreview").attr("src", "");

        $("#addCenterModal").modal("hide");
        setIsLoading(false);
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
  };

  let newLogo = null;
  const editCenter = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

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
          // $("#editCenterLogo").val("");
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

    if (centerId) {
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
    }
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

    if (centerId) {
      axiosClient
        .get(url)
        .then((response) => {
          // console.log(response.data);
          setCenterAboutUsData(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setCenterAboutUsData([]);
          setIsLoading(false);
          ErrorAlert("خطا", "دریافت اطلاعات با خطا مواجه گردید!");
        });
    }
  };

  const openAboutUsModal = async (data, centerId, centerName) => {
    await getCenterAboutUs(centerId);

    $("#centerAboutUsModal").modal("show");
    ActiveCenterID = centerId;
    ActiveCenterName = centerName;
  };

  // edit about us
  const updateAboutUs = (data) => {
    $("#editCenterAboutUsModal").modal("show");
    setCenterAboutUsData(data);
  };

  const editCenterAboutUs = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterProfile/UpdateAboutUs";
    let data = {
      CenterID: ActiveCenterID,
      AboutUs: formProps.editAboutUsText,
    };

    console.log("data", data);

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        setCenterAboutUsData(response.data);

        e.target.reset();
        $("#editCenterAboutUsModal").modal("hide");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
        setIsLoading(false);
      });
  };

  // OR State
  const ChangeOR = async (id, type) => {
    let findIndex = centersData.findIndex((x) => x._id === id);
    centersData[findIndex].OR = type;
    let data = centersData;
    await setCentersData([]);
    console.log(centersData);
    setTimeout(() => {
      setCentersData(data);
    }, 100);
  };

  const activeOR = async (id) => {
    let result = await QuestionAlert(
      "تغییر وضعیت نوبت دهی!",
      "آیا از ثبت وضعیت نوبت دهی به فعال اطمینان دارید؟"
    );
    if (result) {
      let url = "Center/setOR/" + id;
      axiosClient
        .put(url)
        .then((response) => {
          ChangeOR(id, true);
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید");
        });
    }
  };
  const deActiveOR = async (id) => {
    let result = await QuestionAlert(
      "تغییر وضعیت نوبت دهی!",
      "آیا از ثبت وضعیت نوبت دهی به غیر فعال اطمینان دارید؟"
    );
    if (result) {
      let url = "Center/removeOR/" + id;
      axiosClient
        .put(url)
        .then((response) => {
          ChangeOR(id, false);
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید");
        });
    }
  };

  // change center activeState
  const changeCenterActiveState = (id, type) => {
    let findCenter = centersData.find((x) => x._id === id);
    findCenter.Deactive = type;
    let findIndex = centersData.findIndex((x) => x._id === id);
    centersData[findIndex] = findCenter;

    // console.log({ findCenter });
    setCentersData(centersData);
    // console.log({ centersData });
  };

  // activate center
  const activateCenter = async (id) => {
    let result = await QuestionAlert(
      "فعال سازی مرکز",
      "آیا از فعال سازی مرکز اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      let url = `Center/setActive/${id}`;

      await axiosClient
        .put(url)
        .then((response) => {
          console.log(response.data);
          changeCenterActiveState(id, false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // deActivate center
  const deActivateCenter = async (id) => {
    let result = await QuestionAlert(
      "غیرفعال سازی مرکز!",
      "آیا از غیرفعال سازی مرکز اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      let url = `Center/setDeactive/${id}`;

      await axiosClient
        .put(url)
        .then((response) => {
          console.log(response.data);
          changeCenterActiveState(id, true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // change center searchableState
  const changeCenterSearchableState = (id, type) => {
    let findCenter = centersData.find((x) => x._id === id);
    findCenter.Searchable = type;
    let findIndex = centersData.findIndex((x) => x._id === id);
    centersData[findIndex] = findCenter;

    console.log({ findCenter });
    setCentersData(centersData);
    console.log({ centersData });
  };

  // activate center
  const setSerachableCenter = async (id) => {
    let result = await QuestionAlert(
      "قابل جستجو سازی مرکز",
      "آیا از فعال کردن این قابلیت اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      let url = `Center/setSearchable/${id}`;

      await axiosClient
        .put(url)
        .then((response) => {
          console.log(response.data);
          changeCenterSearchableState(id, true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // deActivate center
  const removeSearchableCenter = async (id) => {
    let result = await QuestionAlert(
      "غیر قابل جستجو سازی مرکز!",
      "آیا از غیر فعال کردن این قابلیت اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      let url = `Center/removeSearchable/${id}`;

      await axiosClient
        .put(url)
        .then((response) => {
          console.log(response.data);
          changeCenterSearchableState(id, false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getCentersData();
    getAllProvinces();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      setSelectedPage(router.query.page);
      console.log({ selectedPage });
    }
  }, [router.isReady]);

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
                    ChangeTablePage={ChangeTablePage}
                    activeOR={activeOR}
                    deActiveOR={deActiveOR}
                    activateCenter={activateCenter}
                    deActivateCenter={deActivateCenter}
                    setSerachableCenter={setSerachableCenter}
                    removeSearchableCenter={removeSearchableCenter}
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
