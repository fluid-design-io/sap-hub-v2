import slugify from '@sindresorhus/slugify'
import * as z from 'zod'

import { FieldReturnType, FieldSchemaReturnType, FieldsConfig } from './types'

export function createForm<T extends FieldsConfig>(
  fieldsConfig: T
): {
  defaultValues: FieldReturnType<T>
  formSchema: z.ZodObject<FieldSchemaReturnType<T>>
} {
  const defaultValues = {} as any
  const formSchema = {} as any
  for (const [key, fieldConfig] of Object.entries(fieldsConfig)) {
    if (fieldConfig.type === 'slug') {
      defaultValues[key] = fieldConfig.defaultValue
      const slugKey = fieldConfig.slug?.name || 'slug'
      defaultValues[slugKey] = fieldConfig.defaultValue ? slugify(fieldConfig.defaultValue) : ''
      formSchema[slugKey] = fieldConfig.slug!.validation
    } else {
      defaultValues[key] = fieldConfig.defaultValue
    }
    formSchema[key] = fieldConfig.validation
  }
  return {
    defaultValues: defaultValues as FieldReturnType<T>,
    formSchema: z.object(formSchema) as z.ZodObject<FieldSchemaReturnType<T>>,
  }
}

export { fields } from './field-config'
export * from './utils'
export * from './form'
