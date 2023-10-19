import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

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

  return (
    <>
      <div className="col media-w-100">
        <label className="lblDrugIns font-12">
          شهر <span className="text-danger">*</span>
        </label>
        <SelectField
          styles={selectfieldColourStyles}
          className="text-center font-12 editCitySelectOptions"
          id="citySelectOptions"
          options={selectCityData}
          placeholder={"انتخاب نمایید"}
          onChangeValue={(value) => FUSelectCity(value?.value)}
          name="addCenterCity"
        />
      </div>
    </>
  );
};

export default CitySelect;
