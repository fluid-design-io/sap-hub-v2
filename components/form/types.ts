import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

import {
  CheckboxFieldConfig,
  DatePickerFieldConfig,
  DocumentFieldConfig,
  SlugFieldConfig,
  TextFieldConfig,
} from './fields'
import { ImageFieldConfig } from './fields/image'

/**
 * Shared base config for all field types
 */
export type BaseFieldConfig = {
  label?: string
  description?: string
  placeholder?: string
}

export type BaseAssetConfig = {
  /**
   * The bucket name to upload the image to
   * @example
   * 'blog', 'jobs', 'public_contents'
   * @default
   * 'public_contents'
   */
  storageBucket?: string
  /**
   * The path to upload the image to
   *
   * Default to the **root** of the bucket
   *
   * @example
   * `{user.id}`, 'general', 'folder/subfolder', `blog/{blog.id}`
   *
   * @default
   * undefined
   */
  path?: string
}

/**
 * Base config for all supported field types
 */
export type FieldConfig =
  | TextFieldConfig
  | CheckboxFieldConfig
  | SlugFieldConfig
  | DatePickerFieldConfig
  | ImageFieldConfig
  | DocumentFieldConfig

/**
 * Entry for a field in the fields config object
 */
export type FieldsConfig = {
  [key: string]: FieldConfig
}

/**
 * Adds a slug field to each `SlugFieldConfig` in a `FieldsConfig`
 * Defaults to `slug` as the field name, but can be overridden with the `name` property
 * @returns A union of all the slug fields in the config
 */
type SlugFieldHandling<T> =
  T extends SlugFieldConfig<infer SlugName>
    ? { [K in SlugName extends string ? SlugName : 'slug']: string }
    : {}
/**
 * Adds a slug field to each `SlugFieldConfig` in a `FieldsConfig`
 * Defaults to `slug` as the field name, but can be overridden with the `name` property
 * @returns A union of all the slug fields in the config as zod schemas
 */
type SlugFieldSchemaHandling<T> =
  T extends SlugFieldConfig<infer SlugName>
    ? { [K in SlugName extends string ? SlugName : 'slug']: z.ZodString }
    : {}

/**
 * The return type of the `fields` function as values
 */
export type FieldReturnType<T extends FieldsConfig> = {
  [K in keyof T]: z.infer<T[K]['validation']>
} & UnionToIntersection<SlugFieldHandling<T[keyof T]>>

/**
 * The return type of the `fields` function as zod schemas
 */
export type FieldSchemaReturnType<T extends FieldsConfig> = {
  [K in keyof T]: T[K]['validation']
} & UnionToIntersection<SlugFieldSchemaHandling<T[keyof T]>>

// Utility type to transform a union into an intersection
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

/**
 * The return type of the `cerateForm` function
 */
export type FormReturnType<T extends FieldsConfig> = {
  values: FieldReturnType<T>
  form: UseFormReturn<z.infer<z.ZodObject<FieldSchemaReturnType<T>>>>
}

//* --- Field Creation Functions --- *//

declare function text(args: Partial<TextFieldConfig>): TextFieldConfig

/**
 * @example
 * ```ts
const fieldsConfig = {
  title: fields.slug({
    label: 'Title',
    description: 'The title of the post',
    validation: validators.string(),
    slug: {
      label: 'SEO-friendly slug',
      description: 'This will define the file/folder name for this entry',
      name: 'slug', // Optional name override
    },
  }),
}
 * ```
 */
declare function slug<SlugName extends string | undefined>(
  args: Partial<SlugFieldConfig<SlugName>>
): SlugFieldConfig<SlugName>

declare function checkbox(args: Partial<CheckboxFieldConfig>): CheckboxFieldConfig

declare function date(args: Partial<DatePickerFieldConfig>): DatePickerFieldConfig

/**
 * Uploads an image to the specified directory,
 * the value of the input field will be the `publicUrl` of the uploaded image
 * after it has been uploaded.
 *
 * **Note: the directory must already exist and is public**
 */
declare function image(args: Partial<ImageFieldConfig>): ImageFieldConfig

declare function document(args: Partial<DocumentFieldConfig>): DocumentFieldConfig

//* ---
export type Fields = {
  text: typeof text
  textarea: typeof text
  email: typeof text
  phone: typeof text
  slug: typeof slug
  checkbox: typeof checkbox
  date: typeof date
  image: typeof image
  document: typeof document
}
