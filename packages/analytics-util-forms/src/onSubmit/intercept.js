import submitForm from './submit'
import filterValues from '../utils/filter'
import getFormData from '../utils/getFormValues'

export default function interceptForm(opts = {}) {
  const { onSubmit, disableFilter, debug } = opts

  const intercept = function (event) {
    event.preventDefault()

    /* Get Raw Form Values */
    const form = event.target
    const rawValues = getFormData(form)

    /* Filter sensitive values */
    const values = (disableFilter) ? rawValues : filterValues(rawValues, opts)

    if (debug) {
      console.log(JSON.stringify(values, null, 2))
    }

    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(event, values)
    }

    if (!debug) {
      /* Release form */
      form.removeEventListener('submit', intercept, false)
      /* Submit original form */
      submitForm(form, { timeout: 0 })
    }
  }

  return intercept
}
