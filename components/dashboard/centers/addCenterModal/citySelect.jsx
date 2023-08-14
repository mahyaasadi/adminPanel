import SelectField from "components/commonComponents/selectfield";

const CitySelect = ({ data, cityOptionsList, FUSelectCity }) => {
  let selectCityData = [];
  for (let i = 0; i < cityOptionsList.length; i++) {
    const item = cityOptionsList[i];
    let cityObj = {
      value: item.Info[0].Finglish,
      label: item.CityName,
    };
    selectCityData.push(cityObj);
  }

  const colourStyles = {
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    control: (styles) => ({
      ...styles,
      minHeight: 43,
      borderRadius: 20,
      border: "1px solid #E6E9F4",
    }),
  };

  return (
    <>
      <div className="col media-w-100">
        <label className="lblDrugIns font-12">
          شهر <span className="text-danger">*</span>
        </label>
        <SelectField
          styles={colourStyles}
          className="text-center font-12 editCitySelectOptions"
          id="citySelectOptions"
          options={selectCityData}
          placeholder={"انتخاب نمایید"}
          onChangeValue={(value) => FUSelectCity(value?.value)}
          name="addCenterCity"
          // required
        />
      </div>
    </>
  );
};

export default CitySelect;
