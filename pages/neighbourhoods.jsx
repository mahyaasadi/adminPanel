"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import NeighbourhoodsListTable from "components/dashboard/neighbourhoods/neighbourhoodsListTable";
import AddStateModal from "components/dashboard/neighbourhoods/addStateModal/addStateModal";
import EditStateModal from "components/dashboard/neighbourhoods/editStateModal/editStateModal";

const Neighbourhoods = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [neighbourhoodsData, setNeighbourhoodsData] = useState([]);
  const [editNeighbourhoodData, setEditNeighbourhoodData] = useState([]);
  const [provinceOptionsList, setProvinceOptionsList] = useState([]);
  const [cityOptionsList, setCityOptionsList] = useState([]);
  const [selectedProvinceList, setSelectedProvinceList] = useState("");

  //get all states
  const getAllStates = () => {
    let url = "State/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setIsLoading(false);
        setNeighbourhoodsData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Add new state
  const addNewState = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let url = "/State/add";

    let data = {
      State: formProps.addStateName,
      Finglish: formProps.addStateEngName,
      Province: $("#selectStateProvince").text(),
      ProvinceFin: formProps.addStateProvince,
      City: $("#stateCitySelect").text(),
      CityFin: formProps.addStateCity,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);

        setNeighbourhoodsData([...neighbourhoodsData, response.data]);
        $("#addStateModal").modal("hide");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const getAllProvinces = () => {
    let url = "Province/getAll";
    setIsLoading(true);

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
        setIsLoading(false);
        setProvinceOptionsList(selectProvinceData);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
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

  // Edit State
  const editState = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const StateID = formProps.stateID;

    let url = `State/update/${StateID}`;
    let data = {
      State: formProps.editStateName,
      Finglish: formProps.editStateEngName,
      Province: $("#editSelectStateProvince").text(),
      ProvinceFin: formProps.editStateProvince,
      City: $("#editStateCitySelect").text(),
      CityFin: formProps.editStateCity,
    };

    console.log("data", data);

    if (StateID) {
      axiosClient
        .put(url, data)
        .then((response) => {
          console.log(response.data);
          updateItem(StateID, response.data);

          setIsLoading(false);
          $("#editStateModal").modal("hide");
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          // ErrorAlert("خطا", "ویرایش اطلاعات با خطا همراه گرد");
        });
    }
  };

  const updateItem = (id, newArr) => {
    let index = neighbourhoodsData.findIndex((x) => x._id === id);
    let g = neighbourhoodsData[index];
    g = newArr;

    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setNeighbourhoodsData([
        ...neighbourhoodsData.slice(0, index),
        g,
        ...neighbourhoodsData.slice(index + 1),
      ]);
  };

  const updateState = (data) => {
    setEditNeighbourhoodData(data);
    $("#editStateModal").modal("show");
  };

  // Delete State
  const deleteState = async (id) => {
    let result = await QuestionAlert("حذف محله!", "آیا از حذف مطمئن هستید");
    setIsLoading(true);

    if (result) {
      let url = `/State/Delete/${id}`;

      await axiosClient
        .delete(url)
        .then(function () {
          setNeighbourhoodsData(neighbourhoodsData.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getAllStates();
    getAllProvinces();
  }, []);

  return (
    <>
      <Head>
        <title>مدیریت محله ها</title>
      </Head>
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
                    data-bs-target="#addStateModal"
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
                        <h5 className="card-title font-16">لیست محله ها</h5>
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

                  <NeighbourhoodsListTable
                    data={neighbourhoodsData}
                    updateState={updateState}
                    deleteState={deleteState}
                  />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}

        <AddStateModal
          addNewState={addNewState}
          provinceOptionsList={provinceOptionsList}
          FUSelectProvince={FUSelectProvince}
          FUSelectCity={FUSelectCity}
          setCityOption={setCityOption}
          cityOptionsList={cityOptionsList}
        />

        <EditStateModal
          data={editNeighbourhoodData}
          editState={editState}
          provinceOptionsList={provinceOptionsList}
          FUSelectProvince={FUSelectProvince}
          FUSelectCity={FUSelectCity}
          cityOptionsList={cityOptionsList}
          setCityOption={setCityOption}
          setSelectedProvinceList={setSelectedProvinceList}
          selectedProvinceList={selectedProvinceList}
        />
      </div>
    </>
  );
};

export default Neighbourhoods;
