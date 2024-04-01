"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import { axiosClient } from "class/axiosConfig.js";
import { updateItem } from "utils/updateItem";
import { convertBase64 } from "utils/convertBase64";
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
  const [editCenterData, setEditCenterData] = useState([]);
  // --------------------
  const [provinceOptionsList, setProvinceOptionsList] = useState([]);
  const [cityOptionsList, setCityOptionsList] = useState([]);
  const [selectedProvinceList, setSelectedProvinceList] = useState("");
  const [SelectedCity, setSelectedCity] = useState(null);
  // -------------------
  const [businessHourData, setBusinessHourData] = useState([]);
  const [editBusinessHourData, setEditBusinessHourData] = useState({
    empty: 1,
  });
  const [centerAboutUsData, setCenterAboutUsData] = useState([]);
  // -------------------
  const [searchIsLoading, setSearchIsLoading] = useState(false);

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

  // Get all centers
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

  let logo = null;
  const addCenter = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.logo && formProps.logo.size != 0) {
      logo = await convertBase64(formProps.logo);
    }

    let url = "Center/add";
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
      ManageTel: formProps.addContactNumber,
      ViewDes: formProps.addCenterDescription,
      Logo: logo,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
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

  const FUSelectCenterProvince = (province) => {
    setSelectedProvinceList(province);
    let findCities = provinceOptionsList.find((x) => x.value === province);
    setCityOptionsList(findCities?.cities);
  };

  const FUSelectCity = (city) => {
    setSelectedCity(city);
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
        ManageTel: formProps.editContactNumber,
        ViewDes: formProps.editCenterDescription,
        Logo: newLogo,
        LogoName: formProps.currentLogo,
      };

      axiosClient
        .put(url, data)
        .then((response) => {
          response.data._id = ActiveCenterID;
          updateItem(
            formProps.editCenterID,
            response.data,
            centersData,
            setCentersData
          );

          $("#editCenterModal").modal("hide");
          // e.target.reset();
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید");
        });
    } else {
      ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید");
    }
  };

  // ----- business hours -----
  const getBusinessHours = (centerId) => {
    let url = `CenterProfile/getBusinessHours/${centerId}`;
    setIsLoading(true);

    if (centerId) {
      axiosClient
        .get(url)
        .then((response) => {
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
  };

  const changeToAllDayMode = async (data) => {
    data?.map((item, index) => {
      data[index].Start = "00:00";
      data[index].End = "24:00";
      data[index].Close = false;
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

    axiosClient
      .put(url, data)
      .then((response) => {
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

    if (centerId) {
      setIsLoading(true);
      axiosClient
        .get(url)
        .then((response) => {
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

    axiosClient
      .put(url, data)
      .then((response) => {
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

    setCentersData(centersData);
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

    setCentersData(centersData);
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
          changeCenterSearchableState(id, false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const [selectedSearchByOption, setSelectedSearchByOption] =
    useState("centersName");

  const centersSearchByOptions = [
    { value: "centersName", label: "نام مرکز" },
    { value: "doctors", label: "پزشکان" },
  ];

  const fetchCenterData = (searchBy, searchedText, province, city) => {
    setSearchIsLoading(true);
    let url = "Center";

    if (searchBy === "doctors") {
      url += "/SearchByDoctor";
    } else if (searchBy === "centersName") {
      url += "/SearchByCenterName";
    }

    let data = {
      ProvinceFinglish: province,
      CityFinglish: city,
      Text: searchedText,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setCentersData(response.data);
        setSearchIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchIsLoading(false);
      });
  };

  // const applyCenterSearch = (searchBy, searchedText) => {
  //   fetchCenterData(searchBy, searchedText, selectedProvinceList, SelectedCity);

  //   router.push({
  //     pathname: router.pathname,
  //     query: {
  //       searchBy: searchBy,
  //       searchedText: searchedText,
  //       province: selectedProvinceList,
  //       city: SelectedCity,
  //       page: selectedPage,
  //     },
  //   });
  // };

  const applyCenterSearch = (searchBy, searchedText) => {
    fetchCenterData(searchBy, searchedText, selectedProvinceList, SelectedCity);

    const query = {
      searchBy: searchBy,
      searchedText: searchedText,
      province: selectedProvinceList,
      city: SelectedCity,
    };

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  useEffect(() => {
    if (router.isReady) {
      setSelectedPage(router.query.page);
      getCentersData();
      getAllProvinces();
    }
  }, [router.isReady]);

  // useEffect(() => {
  //   const { searchBy, searchedText, province, city } = router.query;

  //   if (searchBy || searchedText || searchBy || province || city) {
  //     fetchCenterData(searchBy, searchedText, province, city);
  //     // setSelectedProvinceList(province);
  //     // setSelectedCity(city);
  //   }
  // }, [router.query]);

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
                <div className="col-md-12 media-srvHeader">
                  <CenterSearch
                    centersSearchByOptions={centersSearchByOptions}
                    selectedSearchByOption={selectedSearchByOption}
                    setSelectedSearchByOption={setSelectedSearchByOption}
                    provinceOptionsList={provinceOptionsList}
                    FUSelectCenterProvince={FUSelectCenterProvince}
                    selectedProvinceList={selectedProvinceList}
                    cityOptionsList={cityOptionsList}
                    FUSelectCity={FUSelectCity}
                    SelectedCity={SelectedCity}
                    applyCenterSearch={applyCenterSearch}
                    getCentersData={getCentersData}
                    searchIsLoading={searchIsLoading}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0"></div>

                  <CentersListTable
                    data={centersData}
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
                    fetchCenterData={fetchCenterData}
                  />
                </div>
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
