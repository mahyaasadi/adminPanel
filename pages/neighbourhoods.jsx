"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import NeighbourhoodsListTable from "@/components/dashboard/neighbourhoods/neighbourhoodsTable";
import NeighbourhoodsModal from "@/components/dashboard/neighbourhoods/neighbourhoodsModal";

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

const Neighbourhoods = ({ UserData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [neighbourhoodsData, setNeighbourhoodsData] = useState([]);
  const [editNeighbourhoodData, setEditNeighbourhoodData] = useState([]);
  const [provinceOptionsList, setProvinceOptionsList] = useState([]);
  const [cityOptionsList, setCityOptionsList] = useState([]);
  const [selectedProvinceList, setSelectedProvinceList] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const handleCloseModal = () => setShowModal(false);

  // get all states
  const getAllStates = () => {
    let url = "State/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        setIsLoading(false);
        setNeighbourhoodsData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Add new state
  const openAddModal = () => {
    setModalMode('add');
    setShowModal(true)
  }

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

    axiosClient
      .post(url, data)
      .then((response) => {
        setNeighbourhoodsData([...neighbourhoodsData, response.data]);
        setShowModal(false)

        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const getAllProvinces = () => {
    setIsLoading(true);

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
        setIsLoading(false);
        setProvinceOptionsList(selectProvinceData);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  let SelectedCity = "";
  const FUSelectProvince = (province) => setSelectedProvinceList(province);
  const FUSelectCity = (city) => SelectedCity = city;
  const setCityOption = (data) => setCityOptionsList(data);

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

    if (StateID) {
      axiosClient
        .put(url, data)
        .then((response) => {
          updateItem(StateID, response.data);
          setIsLoading(false);
          setShowModal(false)
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          ErrorAlert("خطا", "ویرایش اطلاعات با خطا  مواجه گردید!");
        });
    }
  };

  const updateItem = (id, newArr) => {
    let index = neighbourhoodsData.findIndex((x) => x._id === id);
    let g = neighbourhoodsData[index];
    g = newArr;

    if (index === -1) {
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
    setShowModal(true);
    setModalMode('edit')
  };

  // Delete State
  const deleteState = async (id) => {
    let result = await QuestionAlert("", "آیا از حذف مطمئن هستید");

    if (result) {
      setIsLoading(true);
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
                  <button
                    onClick={openAddModal}
                    className="btn btn-primary btn-add"
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    افزودن
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title font-16">لیست محله ها</h5>
                      </div>
                    </div>
                  </div>

                  <NeighbourhoodsListTable
                    data={neighbourhoodsData}
                    updateState={updateState}
                    deleteState={deleteState}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <NeighbourhoodsModal
          isLoading={isLoading}
          show={showModal}
          mode={modalMode}
          onHide={handleCloseModal}
          onSubmit={modalMode === "add" ? addNewState : editState}
          provinceOptionsList={provinceOptionsList}
          FUSelectProvince={FUSelectProvince}
          FUSelectCity={FUSelectCity}
          setCityOption={setCityOption}
          cityOptionsList={cityOptionsList}
          setSelectedProvinceList={setSelectedProvinceList}
          data={editNeighbourhoodData}
        />
      </div>
    </>
  );
};

export default Neighbourhoods;