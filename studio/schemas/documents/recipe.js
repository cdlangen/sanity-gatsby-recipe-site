import { format } from 'date-fns'

export default {
  name: 'recipe',
  type: 'document',
  title: 'Recipe',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
      validation: Rule =>
        Rule.required()
          .min(10)
          .max(60)
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the recipe',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Description',
      description:
        'This will be displayed under the recipe title. It will also end up on summary pages generated by search engines like Google and when people share your recipe in social media.',
      validation: Rule =>
        Rule.custom(blocks => {
          const block = (blocks || []).find(block => block._type === 'block')
          const all_text = block.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          const maxLength = 160

          return all_text.length <= maxLength
            ? true
            : 'Must be at most ' + maxLength + ' characters long'
        }).custom(blocks => {
          const block = (blocks || []).find(block => block._type === 'block')
          const all_text = block.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          const minLength = 20

          return all_text.length >= minLength
            ? true
            : 'Must be at least ' + minLength + ' characters long'
        })
    },
    {
      name: 'recipeNotes',
      type: 'array',
      title: 'Notes',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule recipe for publishing'
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image'
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'authorReference'
        }
      ]
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category'
          }
        }
      ]
    },
    {
      name: 'recipeIngredients',
      type: 'array',
      title: 'Ingredients',
      of: [
        {
          type: 'recipeIngredient'
        }
      ]
    },
    {
      name: 'recipeInstructions',
      type: 'array',
      title: 'Instructions',
      of: [
        {
          type: 'recipeInstruction'
        }
      ]
    }
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare({ title = 'No title', publishedAt, slug = {}, media }) {
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
