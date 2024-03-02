import { Fields } from './types'
import { validators } from './validations'

export const fields: Fields = {
  text: (config) => ({
    ...config,
    type: 'text',
    defaultValue: config?.defaultValue ?? '',
    multiline: false,
    validation: config?.validation ?? validators.string(),
  }),
  slug: (config) => ({
    ...config,
    type: 'slug',
    defaultValue: config?.defaultValue ?? '',
    validation: config?.validation ?? validators.string(),
    slug: {
      description:
        config?.slug?.description ?? 'The slug is used to identify your content in the URL',
      label: config?.slug?.label ?? 'Slug',
      name: config?.slug?.name ?? ('slug' as any),
      validation: validators.slug(),
      defaultValue: config?.slug?.defaultValue ?? '',
    },
  }),

  textarea: (config) => ({
    ...config,
    type: 'text',
    defaultValue: config?.defaultValue ?? '',
    multiline: true,
    validation: config?.validation ?? validators.string(),
  }),

  email: (config) => ({
    ...config,
    type: 'text',
    validation: config?.validation ?? validators.email(),
  }),
  phone: (config) => ({
    ...config,
    type: 'text',
    validation: config?.validation ?? validators.phone(),
  }),
  checkbox: (config) => ({
    ...config,
    type: 'checkbox',
    defaultValue: config?.defaultValue ?? false,
    validation: config?.validation ?? validators.checkbox(),
  }),
  date: (config) => ({
    ...config,
    type: 'date',
    defaultValue: config?.defaultValue ?? undefined,
    validation: config?.validation ?? validators.string(),
  }),
  image: (config) => ({
    ...config,
    type: 'image',
    defaultValue: config?.defaultValue ?? undefined,
    validation: config?.validation ?? validators.string(),
  }),
  document: (config) => ({
    ...config,
    type: 'document',
    defaultValue: config?.defaultValue ?? undefined,
    validation: config?.validation ?? validators.document(),
  }),
}
