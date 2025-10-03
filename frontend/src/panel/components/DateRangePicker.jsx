import React, { useState, useRef, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isBefore, isAfter, isToday, setHours, setMinutes } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function DateRangePicker({ startDate, setStartDate, endDate, setEndDate, variant = "dark" }) {
  const [open, setOpen] = useState(null);
  const [currentMonth, setCurrentMonth] = useState({
    start: startDate || new Date(),
    end: endDate || new Date(),
  });
  const wrapperRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInputClick(type) {
    setOpen(open === type ? null : type);
    setCurrentMonth((prev) => ({ ...prev, [type]: (type === "start" ? startDate : endDate) || new Date() }));
  }

  function handleMonthChange(type, direction) {
    setCurrentMonth((prev) => ({
      ...prev,
      [type]: direction === "prev" ? subMonths(prev[type], 1) : addMonths(prev[type], 1),
    }));
  }

  function handleDateSelect(type, day) {
    if (type === "start") {
      const base = startDate || new Date();
      const withTime = setMinutes(setHours(day, base.getHours()), base.getMinutes());
      setStartDate(withTime);
      if (!endDate || isAfter(withTime, endDate)) setEndDate(null);
      setOpen(null);
    } else {
      const base = endDate || new Date();
      const withTime = setMinutes(setHours(day, base.getHours()), base.getMinutes());
      setEndDate(withTime);
      if (!startDate || isBefore(withTime, startDate)) setStartDate(null);
      setOpen(null);
    }
  }

  const handleTimeChange = (type, timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return;
    if (type === "start" && startDate) {
      setStartDate(setMinutes(setHours(startDate, h), m));
    }
    if (type === "end" && endDate) {
      setEndDate(setMinutes(setHours(endDate, h), m));
    }
  };

  function getDateCellClasses(cellDay, monthStart, selected, type) {
    const inCurrentMonth = isSameMonth(cellDay, monthStart);
    const selectedThis = selected && isSameDay(cellDay, selected);
    const today = isToday(cellDay);
    const disabled =
      (type === "start" && endDate && isAfter(cellDay, endDate)) ||
      (type === "end" && startDate && isBefore(cellDay, startDate));

    let classes = "text-xs text-center cursor-pointer rounded-md p-2";
    if (!inCurrentMonth) classes += " text-zinc-300";
    if (inCurrentMonth && !selectedThis && !today) classes += " text-zinc-500";
    if (selectedThis) classes += " bg-blue-600 text-white";
    if (today && !selectedThis) classes += " bg-blue-50 text-blue-600";
    if (disabled) classes += " opacity-50 cursor-not-allowed";
    if (!disabled && inCurrentMonth) classes += " hover:bg-zinc-100";
    return classes;
  }

  function renderCalendar(type) {
    const selected = type === "start" ? startDate : endDate;
    const month = currentMonth[type];
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const startDateOfGrid = startOfWeek(monthStart);
    const endDateOfGrid = endOfWeek(monthEnd);
    const totalDays = Math.ceil((endDateOfGrid - startDateOfGrid) / (1000 * 60 * 60 * 24)) + 1;
    const weeks = Math.ceil(totalDays / 7);
    const days = [];

    for (let week = 0; week < weeks; week++) {
      for (let i = 0; i < 7; i++) {
        const cellDay = addDays(startDateOfGrid, week * 7 + i);
        const inCurrentMonth = isSameMonth(cellDay, monthStart);
        const disabled =
          (type === "start" && endDate && isAfter(cellDay, endDate)) ||
          (type === "end" && startDate && isBefore(cellDay, startDate));

        days.push(
          <div
            key={cellDay.toISOString()}
            className={getDateCellClasses(cellDay, monthStart, selected, type)}
            onClick={() => inCurrentMonth && !disabled && handleDateSelect(type, cellDay)}
            style={{ pointerEvents: disabled || !inCurrentMonth ? "none" : "auto" }}
          >
            {inCurrentMonth ? cellDay.getDate() : ""}
          </div>
        );
      }
    }

    const timeValue = selected ? `${String(selected.getHours()).padStart(2, "0")}:${String(selected.getMinutes()).padStart(2, "0")}` : "";

    const popoverCls = variant === "dark"
      ? "absolute z-10 bg-gray-900 text-gray-200 shadow-lg rounded-lg p-4 w-[300px] border border-gray-700 mt-0.5"
      : "absolute z-10 bg-white shadow-lg rounded-lg p-4 w-[300px] border border-gray-200 mt-0.5";

    const headerBorder = variant === "dark" ? "border-gray-700" : "border-zinc-200";
    const weekText = variant === "dark" ? "text-gray-400" : "text-zinc-500";
    const timeInput = variant === "dark" ? "w-full h-9 px-2 border border-gray-700 rounded-md bg-gray-800 text-sm text-gray-200 focus:outline-none" : "w-full h-9 px-2 border border-gray-200 rounded-md bg-white text-sm";

    return (
      <div className="relative">
        <div className={popoverCls}>
          <div className={`flex items-center justify-between border-b pb-2 ${headerBorder}`}>
            <button className="cursor-pointer border border-gray-700 text-gray-300 h-7 w-7 bg-transparent opacity-70 hover:opacity-100 inline-flex items-center justify-center gap-2 whitespace-nowrap p-1 rounded-md" onClick={() => handleMonthChange(type, "prev")}>
              <ChevronLeft className="text-[8px] font-medium"/>
            </button>
            <span className="text-sm font-semibold text-center">{format(month, "MMMM yyyy")}</span>
            <button className="cursor-pointer border border-gray-700 text-gray-300 h-7 w-7 bg-transparent opacity-70 hover:opacity-100 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md p-1" onClick={() => handleMonthChange(type, "next")}>
              <ChevronRight className="text-[8px] font-medium"/>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mt-2">
            {WEEKDAYS.map((d) => (
              <div className={`text-xs text-center ${weekText}`} key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 mt-1">{days}</div>
          <div className="mt-3">
            <label className={variant === "dark" ? "text-xs text-gray-400 block mb-1" : "text-xs text-zinc-600 block mb-1"}>{type === "start" ? "Start time" : "End time"}</label>
            <input type="time" value={timeValue} onChange={(e) => handleTimeChange(type, e.target.value)} className={timeInput} />
          </div>
        </div>
      </div>
    );
  }

  const btnCls = variant === "dark"
    ? "flex cursor-pointer items-center h-11 px-3 border border-gray-700 rounded-lg bg-gray-800 text-sm gap-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 min-w-[180px] justify-center text-gray-200"
    : "flex cursor-pointer items-center h-11 px-4 border border-gray-200 rounded-lg bg-white text-sm gap-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 min-w-[160px] justify-center";
  const iconCls = variant === "dark" ? "w-4 h-4 text-gray-300" : "w-4 h-4 text-gray-500";

  return (
    <div className="flex items-center gap-2" ref={wrapperRef}>
      <div className="relative">
        <button type="button" className={btnCls} onClick={() => handleInputClick("start")}>
          <Calendar className={iconCls} />
          {startDate ? format(startDate, "MMM do, yyyy HH:mm") : "Start date & time"}
        </button>
        {open === "start" && renderCalendar("start")}
      </div>
      <div className="relative">
        <button type="button" className={btnCls} onClick={() => handleInputClick("end")}>
          <Calendar className={iconCls} />
          {endDate ? format(endDate, "MMM do, yyyy HH:mm") : "End date & time"}
        </button>
        {open === "end" && renderCalendar("end")}
      </div>
    </div>
  );
}


