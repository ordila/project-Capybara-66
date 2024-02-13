import { Controller, useForm } from "react-hook-form"
import MaskedTextInput from "react-text-mask"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import styles from "./DatePickerFormField.module.css"

export const DatePickerFormField = ({
  value = Date(),
  onChange,
  ...restProps
}) => {
  const { control } = useForm()

  return (
    <Controller
      control={control}
      name='ReactDatepicker'
      defaultValue={value}
      render={({ field }) => (
        <ReactDatePicker
          {...restProps}
          showIcon
          toggleCalendarOnIconClick
          wrapperClassName={styles.datapickerWrapper}
          calendarClassName={styles.datapicker}
          onChange={event => {
            field.onChange(event)
            onChange(event)
          }}
          selected={field.value}
          maxDate={new Date()}
          dateFormat='dd/MM/yyyy'
          customInput={
            <MaskedTextInput
              value={field.value}
              type='text'
              placeholder='dd/mm/yyyy'
              showMask={true}
              mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            />
          }
        />
      )}
    />
  )
}
