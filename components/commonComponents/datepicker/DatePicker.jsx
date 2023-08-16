import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import DtPicker, { convertToFa } from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/index.css";
import JDate from "jalali-date";

const jdate = new JDate();
const currentYear = jdate.getFullYear();
const currentMonth = jdate.getMonth();
const currentDay = jdate.getDate();

const DatePicker = ({ setArticleDate }) => {
  const [todaysDate, setTodaysDate] = useState({
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  });

  return (
    <>
      <div className="datePickerContainer d-flex align-items-center">
        <label className="lblAbs datePickerLbl font-12">
          تاریخ <span className="text-danger">*</span>
        </label>
        <DtPicker
          onChange={setArticleDate}
          type="single"
          local="fa"
          inputClass="datePickerInput rounded font-12"
          headerClass="datePickerHeader"
          calenderModalClass="calenderModalContainer"
          placeholder="&nbsp;"
          inputName="date"
          required
          name="articleDate"
          initValue={todaysDate}
        />

        <i className="calendarIcon text-secondary">
          <FeatherIcon icon="calendar" />
        </i>
      </div>
    </>
  );
};
export default DatePicker;

