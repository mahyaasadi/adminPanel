import FeatherIcon from "feather-icons-react";
import DtPicker from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/index.css";
import JDate from "jalali-date";

const jdate = new JDate();
const currentYear = jdate.getFullYear();
const currentMonth = jdate.getMonth();
const currentDay = jdate.getDate();

const SingleDatePicker = ({ setDate, defaultDate, label }) => {
  let initialDate = null;
  if (defaultDate) {
    defaultDate = defaultDate.replaceAll(/\//g, "");
    initialDate = {
      year: parseInt(defaultDate.substr(0, 4)),
      month: parseInt(defaultDate.substr(4, 2)),
      day: parseInt(defaultDate.substr(6, 2)),
    };
  } else {
    initialDate = {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
    };
  }

  const handleDateChange = (e) => {
    if (e?.month.toString().length === 1) {
      e.month = "0" + e.month.toString();
    }
    if (e?.day.toString().length === 1) {
      e.day = "0" + e.day;
    }
    setDate(e);
  };

  return (
    <>
      <div className="datePickerContainer d-flex align-items-center">
        <label className="lblAbs datePickerLbl font-12">{label}</label>
        <DtPicker
          onChange={handleDateChange}
          type="single"
          local="fa"
          inputClass="datePickerInput rounded font-12"
          headerClass="datePickerHeader"
          calenderModalClass="calenderModalContainer"
          placeholder="&nbsp;"
          daysClass="fullDay"
          inputName="date"
          name="selectedDate"
          initValue={initialDate}
        />

        <i className="calendarIcon text-secondary">
          <FeatherIcon icon="calendar" />
        </i>
      </div>
    </>
  );
};

export default SingleDatePicker;

