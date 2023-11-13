import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";

const CenterSearch = ({
  centersSearchByOptions,
  selectedSearchByOption,
  setSelectedSearchByOption,
  provinceOptionsList,
  FUSelectCenterProvince,
  selectedProvinceList,
  cityOptionsList,
  FUSelectCity,
  SelectedCity,
  applyCenterSearch,
  getCentersData,
  searchIsLoading,
}) => {
  let selectCityData = [];
  for (let i = 0; i < cityOptionsList?.length; i++) {
    const item = cityOptionsList[i];
    let cityObj = {
      value: item.Info[0].Finglish,
      label: item.CityName,
    };
    selectCityData.push(cityObj);
  }

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter")
      applyCenterSearch(selectedSearchByOption, e.target.value);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue.trim()) getCentersData();
  };

  const handleSearchClick = () => {
    const searchValue = $("#centerSearchInput").val();
    applyCenterSearch(selectedSearchByOption, searchValue);
  };

  return (
    <div className="card ">
      <div
        id="centerSearchFrm"
        className="card-body filterCentersContainer row align-items-center"
      >
        <div className="col-md-1 col-12">
          <Link
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#addCenterModal"
            className="btn btn-primary btn-add w-100 addCenter"
          >
            <Tooltip target=".addCenter">افزودن مرکز</Tooltip>
            <FeatherIcon icon="plus-square" />
          </Link>
        </div>

        <div className="col-md-2 col-12">
          <label className="lblAbs font-12">بر اساس</label>
          <Dropdown
            value={selectedSearchByOption}
            onChange={(e) => setSelectedSearchByOption(e.value)}
            options={centersSearchByOptions}
            optionLabel="label"
            placeholder="انتخاب کنید"
            showClear
          />
        </div>

        <div className="col-md-2 col-12">
          <label className="lblAbs font-12">استان</label>
          <Dropdown
            value={selectedProvinceList}
            onChange={(e) => FUSelectCenterProvince(e.value)}
            options={provinceOptionsList}
            optionLabel="label"
            placeholder="انتخاب کنید"
            filter
            showClear
          />
        </div>

        <div className="col-md-2 col-12">
          <label className="lblAbs font-12">شهر</label>
          <Dropdown
            value={SelectedCity}
            onChange={(e) => FUSelectCity(e.value)}
            options={selectCityData}
            optionLabel="label"
            placeholder="انتخاب کنید"
            filter
            showClear
          />
        </div>

        <div className="search col-md-4 col-12">
          <label className="lblAbs font-12">جستجوی مرکز</label>
          <input
            onKeyUp={handleSearchSubmit}
            onChange={handleInputChange}
            id="centerSearchInput"
            autoComplete="off"
            className="form-control rounded-sm font-11 articleSearchInput"
            placeholder="نام مرکز / نام پزشک ..."
            type="text"
          />
        </div>

        <div className="col-md-1 col-12">
          {!searchIsLoading ? (
            <button
              onClick={handleSearchClick}
              className="btn btn-primary w-100"
            >
              <i className="fe fe-search"></i>
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-100" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              ></span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CenterSearch;
