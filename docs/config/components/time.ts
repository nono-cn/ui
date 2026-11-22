import type { ComponentDocConfig, ExampleValue } from '@docs/config/component-docs'
import { Time } from '@nono/ui'

const datetime = '2026-04-22T08:30:00Z'

const styles = ['none', 'full', 'long', 'medium', 'short'] as const

const locales = ['en-US', 'en-GB', 'es-ES', 'pt-BR', 'ar-EG', 'ja-JP'] as const

const timeZones = ['UTC', 'America/New_York', 'Europe/Madrid', 'Asia/Tokyo'] as const

function styleOptions(state: Record<string, string>) {
  const options: Record<string, ExampleValue> = {}
  if (state.dateStyle !== 'none') options.dateStyle = state.dateStyle!
  if (state.timeStyle !== 'none') options.timeStyle = state.timeStyle!
  return options
}

const time: ComponentDocConfig = {
  slug: 'time',
  title: 'Time',
  description: 'Shows a date or time formatted for the locale, inside a native time element.',
  component: Time,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass a Date, a timestamp or an ISO string to datetime. Without options it shows the short date of the locale.',
      props: () => ({ datetime }),
    },
  ],
  examples: [
    {
      title: 'Date and time style',
      description:
        'options takes any Intl.DateTimeFormat option, such as the dateStyle and timeStyle presets.',
      controls: [
        { key: 'dateStyle', label: 'Date style', type: 'select', options: styles, default: 'long' },
        {
          key: 'timeStyle',
          label: 'Time style',
          type: 'select',
          options: styles,
          default: 'short',
        },
      ],
      props: (state) => ({ datetime, options: styleOptions(state) }),
    },
    {
      title: 'Locale',
      description:
        'Time follows the locale given to provideLocale, region included. options.locale overrides it.',
      controls: [
        { key: 'locale', label: 'Locale', type: 'select', options: locales, default: 'en-US' },
      ],
      props: (state) => ({ datetime, options: { locale: state.locale!, dateStyle: 'full' } }),
    },
    {
      title: 'Time zone',
      description: 'Show the moment in another time zone with options.timeZone.',
      controls: [
        {
          key: 'timeZone',
          label: 'Time zone',
          type: 'select',
          options: timeZones,
          default: 'UTC',
        },
      ],
      props: (state) => ({
        datetime,
        options: { timeZone: state.timeZone!, dateStyle: 'medium', timeStyle: 'long' },
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Time renders a native time element. Attributes passed to Time reach that element.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['time', 'Root', 'Marks the text as a date or time.'],
          ['datetime', 'Root', 'The moment in ISO 8601, readable by machines.'],
        ],
      },
    },
  ],
  api: {
    props: [
      {
        name: 'datetime',
        type: 'Date | number | string',
        required: true,
        description:
          'Moment to show: a Date, a timestamp in milliseconds or an ISO string. An invalid value renders an empty element.',
      },
      {
        name: 'options',
        type: 'DateFormatOptions',
        description:
          'Intl.DateTimeFormat options, such as dateStyle, timeStyle or timeZone, plus locale: a BCP 47 tag that overrides the one given to provideLocale.',
      },
      {
        name: 'ui',
        type: 'TimeUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root. See UI.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: `{
  formatted: string
}`,
        typePre: true,
        description: 'Content of the time element; overrides the formatted text it receives.',
      },
    ],
    ui: [{ node: 'root', tag: 'time' }],
    expose: [],
  },
}

export default time
