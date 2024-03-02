# What is it?

An object-oriented form builder bundled with @shacdn/ui components & react-hook-form (with zod validation).

## Exmaple

```tsx
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
```
