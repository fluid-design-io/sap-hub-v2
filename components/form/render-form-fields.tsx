import React from 'react'
import { Control } from 'react-hook-form'

import { Checkbox, DatePicker, Document, Image, Input, Slug } from './fields'
import { FieldsConfig } from './types'

export const renderFormFields = (fieldsConfig: FieldsConfig, control: Control<any>) => {
  return Object.entries(fieldsConfig).map(([name, config]) => {
    switch (config.type) {
      case 'text':
        return <Input key={name} name={name} control={control} {...config} />
      case 'checkbox':
        return <Checkbox key={name} name={name} control={control} {...config} />
      case 'slug':
        return <Slug key={name} name={name} control={control} {...config} />
      case 'date':
        return <DatePicker key={name} name={name} control={control} {...config} />
      case 'image':
        return <Image key={name} name={name} control={control} {...config} />
      case 'document':
        return <Document key={name} name={name} {...config} />
      default:
        return null // Or a default component if necessary
    }
  })
}
