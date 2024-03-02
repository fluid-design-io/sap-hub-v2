import { OutputData } from '@editorjs/editorjs'
import { z } from 'zod'

// Basic string validation
const stringValidation = ({ min, max }: { min: number; max: number } = { min: 0, max: 0 }) =>
  min === max
    ? z.string()
    : z
        .string()
        .min(min, `Must be at least ${min} characters`)
        .max(max, `Must be no more than ${max} characters`)

// Email validation
const emailValidation = () => z.string().email({ message: 'Invalid email address' })

// Password validation
const passwordValidation = (minLength: number = 8) =>
  z
    .string()
    .min(minLength, `Password must be at least ${minLength} characters`)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )

// Numeric validation
const numericValidation = () => z.number()

// Checkbox validation (for boolean values)
const checkboxValidation = () => z.boolean()

/**
 * @param required - Whether or not the phone number is required for the text input
 * @default true
 */
const phoneValidation = (required: boolean = true) => {
  const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  const validation = z.string().regex(regex, {
    message: 'Invalid Phone Number',
  })
  if (required) return validation.min(10)
  return z.union([validation, z.string().length(0)]).optional()
}

const slugValidation = () =>
  z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug can only contain lowercase alphanumeric characters (a-z, 0-9) and dashes',
  })

const dateValidation = () => z.date()

const documentValidation = () => z.custom<OutputData>()

/**
 * Predefined validators for form fields
 */
export const validators = {
  string: stringValidation,
  email: emailValidation,
  password: passwordValidation,
  numeric: numericValidation,
  checkbox: checkboxValidation,
  phone: phoneValidation,
  slug: slugValidation,
  date: dateValidation,
  document: documentValidation,
}
