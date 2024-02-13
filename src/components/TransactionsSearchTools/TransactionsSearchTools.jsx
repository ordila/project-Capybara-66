import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { DatePickerFormField } from "../DatePickerFormField/DatePickerFormField"
import { format } from "date-fns"
import clsx from "clsx"

import styles from "./TransactionsSearchTools.module.css"
import SearchIcon from "@/assets/icons/Search.svg?react"
import CalendarAccentIcon from "@/assets/icons/CalendarAccent.svg?react"

import {
  selectFiltersCategory,
  selectFiltersDate,
} from "@/redux/transactionsFilters/selectors"
import {
  changeFilterCategory,
  changeFilterDate,
} from "@/redux/transactionsFilters/slice"

export const TransactionsSearchTools = () => {
  const { register } = useForm()
  const dispatch = useDispatch()
  const categoryFilter = useSelector(selectFiltersCategory)
  const dateFilter = useSelector(selectFiltersDate)

  const onCategoryChange = ({ target }) => {
    dispatch(changeFilterCategory(target.value))
  }

  const onDateChange = date => {
    dispatch(changeFilterDate(format(date, "yyyy-MM-dd")))
  }

  return (
    <form autoComplete='off' className={styles.searchToolsControls}>
      <div className={clsx(styles.fieldWrap, styles.SearchFieldWrap)}>
        <label>
          <input
            type='text'
            value={categoryFilter}
            placeholder='Search for anything...'
            {...register("category")}
            onChange={onCategoryChange}
            className={clsx(styles.inputField, styles.inputSearchField)}
          />
          <SearchIcon className={styles.fieldIconAddon} />
        </label>
      </div>
      <div className={clsx(styles.fieldWrap, styles.datepickerFieldWrap)}>
        <DatePickerFormField
          onChange={onDateChange}
          value={dateFilter}
          className={styles.inputField}
          placeholder='dd/mm/yyyy'
          icon={<CalendarAccentIcon className={styles.fieldIconAddon} />}
        />
      </div>
    </form>
  )
}
