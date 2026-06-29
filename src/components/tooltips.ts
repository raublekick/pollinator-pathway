import { Tooltip, Popover } from 'bootstrap'

export const tooltip = {
  mounted(el: HTMLElement) {
    const tooltip = new Tooltip(el)
  }
}

export const popover = {
  mounted(el: HTMLElement) {
    // default trigger to focus so all popovers can be dismissible.
    const opts = {
      content: el.getAttribute('data-bs-content'),
      html: false,
      trigger: el.hasAttribute('data-bs-trigger') ? el.getAttribute('data-bs-trigger') : 'focus'
    }

    if (!el.hasAttribute('tabindex') && el.nodeName !== 'button') {
      el.setAttribute('tabindex', '-1')
    }

    if (el.hasAttribute('data-bs-content-id')) {
      opts.content = document.getElementById(el.getAttribute('data-bs-content-id')!)!.innerHTML
      opts.html = true
      const popover = new Popover(el, opts)
    }
    const popover = new Popover(el, opts)
  }
}
