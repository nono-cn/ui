import type { ComponentDocConfig, ExampleProps, ExampleState } from '@docs/config/component-docs'
import attachmentImage from '@docs/assets/attachment.svg'
import {
  Attachment,
  attachmentDefaults,
  attachmentOrientations,
  attachmentSizes,
  attachmentStates,
  themeRadii,
} from '@nono/ui'

const booleans = ['false', 'true']

const pdf = {
  label: 'sales-dashboard.pdf',
  description: 'PDF · 2.4 MB',
  icon: 'fileText',
} as const

const image = {
  label: 'workspace.png',
  description: 'PNG · 840 kB',
  src: attachmentImage,
} as const

const stateDescriptions: Record<string, string> = {
  idle: 'Waiting to upload',
  uploading: 'Uploading · 64%',
  processing: 'Processing',
  error: 'Upload failed. Try again.',
  done: pdf.description,
}

function stateProps(state: ExampleState): ExampleProps {
  const value = state.state!
  return {
    ...pdf,
    state: value,
    description: stateDescriptions[value] ?? pdf.description,
    ...(value === 'uploading' ? { progress: 64 } : {}),
  }
}

const attachment: ComponentDocConfig = {
  slug: 'attachment',
  title: 'Attachment',
  description:
    'Displays a file or image attachment with its type, metadata, upload state and actions.',
  component: Attachment,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass a File, or anything with name, type and size, to the file prop: it picks the icon, the "PDF · 2.4 MB" line and, for images, a thumbnail. Or set label, description and icon yourself.',
      props: () => ({ ...pdf }),
    },
  ],
  examples: [
    {
      title: 'Image',
      description:
        'Show a thumbnail with src. An image File gets one on its own, and its object URL is revoked when the file changes or the component unmounts.',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: attachmentOrientations,
          default: 'vertical',
        },
      ],
      props: (state) => ({ ...image, orientation: state.orientation! }),
    },
    {
      title: 'State',
      description:
        'Follow the upload lifecycle. Idle draws a dashed border, uploading and processing show a spinner and shimmer the label, and error turns the media and description red. During uploading, progress fills a bar from 0 to 100.',
      controls: [
        {
          key: 'state',
          label: 'State',
          type: 'select',
          options: attachmentStates,
          default: 'uploading',
        },
      ],
      props: stateProps,
    },
    {
      title: 'Size',
      description: 'Adjust the media, padding and text. The sm size shows the label only.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: attachmentSizes,
          default: attachmentDefaults.size,
        },
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: attachmentOrientations,
          default: attachmentDefaults.orientation,
        },
      ],
      props: (state) => ({
        ...pdf,
        size: state.size!,
        orientation: state.orientation!,
      }),
    },
    {
      title: 'Removable',
      description:
        'Show a remove button that emits remove. Its name says which file it removes, like "Remove sales-dashboard.pdf".',
      controls: [
        {
          key: 'removable',
          label: 'Removable',
          type: 'select',
          options: booleans,
          default: 'true',
        },
      ],
      props: (state) => ({ ...pdf, removable: state.removable === 'true' }),
    },
    {
      title: 'Open',
      description:
        'Listen to open to make the whole card a button, for example to show a preview. The remove button stays clickable above it.',
      props: () => ({ ...image, removable: true }),
      handlers: [
        {
          event: 'open',
          name: 'preview',
          source: "const preview = () => window.alert('Open workspace.png')",
          handler: () => window.alert('Open workspace.png'),
        },
      ],
    },
    {
      title: 'Radius',
      description: 'Use a theme radius, none, full, or any CSS length.',
      controls: [
        {
          key: 'radius',
          label: 'Radius',
          type: 'select',
          options: themeRadii,
          default: attachmentDefaults.radius,
        },
      ],
      props: (state) => ({ ...pdf, radius: state.radius! }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Attachment renders a div with no role, so its label and description are read as content. Attributes passed to Attachment reach the root. Wrap several in AttachmentGroup, a scrolling row with role="group"; give it an aria-label such as "Attached files".',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['data-slot="attachment"', 'Root', 'Lets you style every attachment from CSS.'],
          ['data-state', 'Root', 'The state: idle, uploading, processing, error or done.'],
          ['aria-busy="true"', 'Root', 'Set while uploading or processing.'],
          [
            'aria-label',
            'Remove button',
            'The removeLabel prop, or "Remove {name}" in the locale from provideLocale.',
          ],
          [
            'aria-label',
            'Open button',
            'The openLabel prop, or "Open {name}" in the locale from provideLocale.',
          ],
          [
            'role="progressbar"',
            'Progress',
            'Rendered while uploading with progress, named after the file.',
          ],
          ['alt', 'Image', 'The alt prop, or empty because the label already names the file.'],
          ['aria-hidden="true"', 'Icon', 'The icon is decorative.'],
        ],
      },
    },
    {
      title: 'Keyboard',
      description:
        'Only the open and remove buttons take focus. A focused open button draws the ring around the whole card.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          ['Tab', 'Moves focus to the open button, then to the remove button.'],
          ['Space, Enter', 'Opens or removes the attachment.'],
        ],
      },
    },
    {
      title: 'States',
      description:
        'The state is shown with color, a spinner and a shimmer, so also say it in the description, like "Uploading · 64%" or why it failed. Announce finished or failed uploads in a live region of your own, and move focus somewhere sensible after a remove.',
    },
  ],
  api: {
    props: [
      {
        name: 'file',
        type: 'File | { name: string; type: string; size: number }',
        description:
          'The file to show. It sets the label, the icon by type, the description as extension and size, and a thumbnail for image Files.',
      },
      {
        name: 'label',
        type: 'string',
        description: 'File name. Defaults to the name of file; the label slot replaces it.',
      },
      {
        name: 'description',
        type: 'string',
        description:
          'Line below the label, such as the type and size or the upload status. Defaults to "PDF · 2.4 MB" from file. Hidden in the sm size.',
      },
      { name: 'src', type: 'string', description: 'URL of a thumbnail; it replaces the icon.' },
      {
        name: 'alt',
        type: 'string',
        default: "''",
        description: 'Alternative text of the thumbnail.',
      },
      {
        name: 'icon',
        type: 'IconName',
        description:
          'Icon in the media box. Defaults to one picked from the type of file, or file. The media slot replaces it.',
      },
      {
        name: 'state',
        type: attachmentStates.map((state) => `'${state}'`).join(' | '),
        default: `'${attachmentDefaults.state}'`,
        description: 'Stage of the upload, reflected in data-state.',
      },
      {
        name: 'progress',
        type: 'number',
        description: 'Upload progress from 0 to 100. The bar shows only while uploading.',
      },
      {
        name: 'size',
        type: attachmentSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${attachmentDefaults.size}'`,
        description: 'Width, media, padding and text size.',
      },
      {
        name: 'orientation',
        type: attachmentOrientations.map((value) => `'${value}'`).join(' | '),
        default: `'${attachmentDefaults.orientation}'`,
        description: 'Media beside the text, or above it with the actions on the media.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${attachmentDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      {
        name: 'removable',
        type: 'boolean',
        default: String(attachmentDefaults.removable),
        description: 'Shows the remove button.',
      },
      {
        name: 'removeLabel',
        type: 'string',
        description:
          'Accessible name of the remove button. Without it, "Remove {name}" is translated to the locale from provideLocale.',
      },
      {
        name: 'openLabel',
        type: 'string',
        description:
          'Accessible name of the open button. Without it, "Open {name}" is translated to the locale from provideLocale.',
      },
      {
        name: 'ui',
        type: `{
  media?: () => HTMLAttributes
  image?: () => ImgHTMLAttributes
  icon?: () => HTMLAttributes
  content?: () => HTMLAttributes
  label?: () => HTMLAttributes
  description?: () => HTMLAttributes
  actions?: () => HTMLAttributes
  removeButton?: () => ButtonProps & ButtonHTMLAttributes
  trigger?: () => ButtonHTMLAttributes
  progress?: () => HTMLAttributes
}`,
        typePre: true,
        description:
          'Attributes for the inner nodes, matched by data-slot: media, image, icon, content (the box around label and description), label, description, actions, removeButton (a Button, which also takes Button props), trigger (the open button) and progress. Classes are merged with the defaults and win on conflict, styles are combined, and other attributes replace the default. The root takes attributes directly.',
      },
    ],
    emits: [
      {
        name: 'remove',
        type: '[]',
        description: 'Emitted when the remove button, or remove from the actions slot, is used.',
      },
      {
        name: 'open',
        type: '[event: MouseEvent]',
        description:
          'Emitted when the card is pressed. Listening to it renders the open button over the card.',
      },
    ],
    slots: [
      {
        name: 'media',
        type: '-',
        description: 'Content of the media box; overrides the image, icon and spinner.',
      },
      { name: 'label', type: '-', description: 'Label content; overrides the label fallback.' },
      {
        name: 'description',
        type: '-',
        description: 'Description content; overrides the description fallback.',
      },
      {
        name: 'actions',
        type: '{ remove: () => void }',
        description:
          'Buttons at the end, such as retry or download. Receives remove, which emits remove. Give each icon button a name that says the file.',
      },
    ],
    expose: [],
  },
}

export default attachment
