
# Cyclic Materials molecule-progress API

- [`Progress`](#Progress)

Author: Frederik Krautwald

- - -

### <a id="Progress"></a> `Progress({props$})`

The progress bars are for situations where the percentage completed
can be determinated. They give users a quick sense of how much longer
an operation will take.

Example:

    Progress({props$: Observable.just({value: 10})})

There is also a secondary progress which is useful for displaying
indeterminate progress, such as the buffer level during a streaming
playback progress bar.

Example:

    Progress({props$: Observable.just({value: 10, secondaryProgress: 30})})

### Styling

To change the active progress bar color:

    :root {
      --molecule-Progress-active-color: #e91e63;
    }

To change the second progress bar color:

    :root {
      --molecule-Progress-secondary-color: #f8bbd0;
    }

To change the progress bar background color:

    :root {
      --molecule-Progress-container-color: #64ffda;
    }

Add the CSS class name `is-Transiting` to a `Progress` to animate
the progress bar when the value changed:

    Progress({props$: Observable.just({
        value: 10, className: '.is-Transiting'
    })})

You can also customize the transition:

    :root {
        --molecule-Progress-transition-duration: 0.08s;
        --molecule-Progress-transition-timing-function: ease;
        --molecule-Progress-transition-delay: 0s;
    }

The following variables and classes are available for styling:

Variable/class | Description | Default
---------------|-------------|---------
`--molecule-Progress-container-color` | Mixin applied to container. | `--atom-Color-grey-300`
`--molecule-Progress-transition-duration` | Duration of the transition. | `0.08s`
`--molecule-Progress-transition-timing-function` | The timing function for the transition. | `ease`
`--molecule-Progress-transition-delay` | Delay for the transition. | `0s`
`--molecule-Progress-active-color` | The color of the active bar. | `--atom-Color-green-500`
`--molecule-Progress-secondary-color` | The color of the secondary bar. | `--atom-Color-green-100`
`--molecule-Progress-disabled-active-color` | The color of the active bar if disabled. | `--atom-Color-grey-500`
`--molecule-Progress-disabled-secondary-color` | The color of the secondary bar if disabled. | `--atom-Color-grey-300`
`--molecule-Progress-height` | The height of the progress bar. | `4px`
`.molecule-Progress` | Progress component. |
`.molecule-Progress_container` | Container descendent. |
`.molecule-Progress_primary` | Primary progress bar descendent. |
`.molecule-Progress_secondary` | Secondary progress bar descendent. |
`.is-Transiting` | Transiting state modifier. |
`.is-Disabled` | Disabled state modifier. |
`.is-Indeterminate` | Indeterminate state modifier. |

### Properties

The following properties are available:

Property | Description | Default
---------------|-------------|---------
`className` | `{String}` Additional CSS class names appended to the component. | `empty string`
`disabled` | `{Boolean}` `true` if the progress is disabled. | `true`
`indeterminate` | `{Boolean}` Use an indeterminate progress indicator. | `false`
`max` | `{Number}` The number that indicates the maximum value of the range. | `100`
`min` | `{Number}` The number that indicates the minimum value of the range. | `0`
`ratio` | `{Number}` **read-only** Returns the ratio of the value. | `0`
`secondaryProgress` | `{Number}` The number that represents the current secondary progress. | `0`
`secondaryRatio` | `{Number}` **read-only** The secondary ratio. | `0`
`step` | `{Number}` Specifies the value granularity of the range’s value. | `1`
`value` | `{Number}` The number that represents the current value. | `0`

#### Arguments:

- `{props$} :: Object` A specification of: 
    - *props$ :: Observable* An observable of object of properties.

#### Return:

*(Object)* The Progress API. The object has the following structure: 
    {
      <Observable>DOM,
      <Observable>state$
    }

- - -

