import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const EditStateCitySelect = ({ data, cityOptionsList, FUSelectCity }) => {
  let selectCityData = [];
  for (let i = 0; i < cityOptionsList.length; i++) {
    const item = cityOptionsList[i];
    let cityObj = {
      value: item.Info[0].Finglish,
      label: item.CityName,
    };
    selectCityData.push(cityObj);
  }

  let selectedCity = null;
  if (data) {
    selectedCity = {
      value: data.CityFin,
      label: data.City,
    };
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
          id="editStateCitySelect"
          name="editStateCity"
          options={selectCityData}
          key={data.City}
          defaultValue={selectedCity}
          onChangeValue={(value) => FUSelectCity(value?.value)}
          placeholder={"انتخاب نمایید"}
          required
        />
      </div>
    </>
  );
};

export default EditStateCitySelect;
