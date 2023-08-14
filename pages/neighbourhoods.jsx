"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import NeighbourhoodsListTable from "components/dashboard/neighbourhoods/neighbourhoodsListTable";
import AddStateModal from "components/dashboard/neighbourhoods/addStateModal/addStateModal";

const Neighbourhoods = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [neighbourhoodsData, setNeighbourhoodsData] = useState([]);
  const [provinceOptionsList, setProvinceOptionsList] = useState([]);
  const [cityOptionsList, setCityOptionsList] = useState([]);

  //get all states
  const getAllStates = () => {
    let url = "State/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
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

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let url = "/State/add";

    let data = {
      //   State: formProps.,
      //   Province: formProps.,
      //   ProvinceFin: formProps,
      //   City: formProps,
      //   CityFin: formProps,
    };

    if (CenterID) {
      axiosClient
        .post(url, data)
        .then((response) => {
          //   setDoctorsList([...doctorsList, response.data]);
          //   $("#addPhysicianModal").modal("hide");
          e.target.reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  useEffect(() => {
    getAllStates();
    getAllProvinces();
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

                {/* {isLoading ? (
                  <Loading />
                ) : ( */}
                <NeighbourhoodsListTable data={neighbourhoodsData} />
                {/* )} */}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        <AddStateModal
          addNewState={addNewState}
          provinceOptionsList={provinceOptionsList}
          FUSelectProvince={FUSelectProvince}
          setCityOption={setCityOption}
          cityOptionsList={cityOptionsList}
          FUSelectCity={FUSelectCity}
        />
      </div>
    </>
  );
};

export default Neighbourhoods;
