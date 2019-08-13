import throttle from "lodash.throttle"
import ResizeObserver from "resize-observer-polyfill"

export const ResponsiveMixin = {
  data() {
    return {
      el: {
        width: 0,
        height: 0,
        is: {}
      }
    }
  },
  mounted() {
    if (
      typeof process === "undefined" ||
      (!process.server && (this.breakpoints || this.$options.breakpoints))
    ) {
      this.$nextTick(() => {
        const handleResize = throttle(entries => {
          const cr = entries[0].contentRect
          ;(this.el.width = cr.width), (this.el.height = cr.height)
          const conds = Object.assign(
            {},
            this.breakpoints || {},
            this.$options.breakpoints || {}
          )
          for (const breakpoint in conds) {
            this.$set(this.el.is, breakpoint, conds[breakpoint](this.el))
          }
        }, 200)

        const observer = new ResizeObserver(handleResize)
        if (this.$el instanceof Element) {
          observer.observe(this.$el)
        }
      })
    }
  }
}

export const Responsive = {
  data() {
    return { init: false }
  },
  props: {
    noHide: { type: Boolean, default: false },
    breakpoints: { type: Object, default: undefined }
  },
  mixins: [ResponsiveMixin],
  render(h) {
    const slot =
      (this.$scopedSlots.default && this.$scopedSlots.default(this.el)) ||
      this.$slots.default

    return !this.noHide && !this.init
      ? h(
          "div",
          {
            style: { visibility: "hidden" }
          },
          [slot]
        )
      : slot
  },
  mounted() {
    this.init = true
  }
}

export const ResponsiveDirective = {
  inserted(el, conds) {
    if (typeof process === "undefined" || !process.server) {
      const handleResize = throttle(entries => {
        const cr = entries[0].contentRect
        for (const breakpoint in conds.value) {
          if (conds.value[breakpoint](cr)) {
            el.classList.add(breakpoint)
          } else {
            el.classList.remove(breakpoint)
          }
        }
      }, 200)

      const observer = new ResizeObserver(handleResize)
      observer.observe(el)
    }
  }
}

export const VueResponsiveComponents = Vue => {
  Vue.component("Responsive", Responsive)
  Vue.directive("responsive", ResponsiveDirective)
}
