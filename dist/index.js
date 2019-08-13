"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VueResponsiveComponents = exports.ResponsiveDirective = exports.Responsive = exports.ResponsiveMixin = void 0;

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ResponsiveMixin = {
  data: function data() {
    return {
      el: {
        width: 0,
        height: 0,
        is: {}
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (typeof process === "undefined" || !process.server && (this.breakpoints || this.$options.breakpoints)) {
      this.$nextTick(function () {
        var handleResize = (0, _lodash["default"])(function (entries) {
          var cr = entries[0].contentRect;
          _this.el.width = cr.width, _this.el.height = cr.height;
          var conds = Object.assign({}, _this.breakpoints || {}, _this.$options.breakpoints || {});

          for (var breakpoint in conds) {
            _this.$set(_this.el.is, breakpoint, conds[breakpoint](_this.el));
          }
        }, 200);
        var observer = new _resizeObserverPolyfill["default"](handleResize);

        if (_this.$el instanceof Element) {
          observer.observe(_this.$el);
        }
      });
    }
  }
};
exports.ResponsiveMixin = ResponsiveMixin;
var Responsive = {
  data: function data() {
    return {
      init: false
    };
  },
  props: {
    noHide: {
      type: Boolean,
      "default": false
    },
    breakpoints: {
      type: Object,
      "default": undefined
    }
  },
  mixins: [ResponsiveMixin],
  render: function render(h) {
    var slot = this.$scopedSlots["default"] && this.$scopedSlots["default"](this.el) || this.$slots["default"];
    return !this.noHide && !this.init ? h("div", {
      style: {
        visibility: "hidden"
      }
    }, [slot]) : slot;
  },
  mounted: function mounted() {
    this.init = true;
  }
};
exports.Responsive = Responsive;
var ResponsiveDirective = {
  inserted: function inserted(el, conds) {
    if (typeof process === "undefined" || !process.server) {
      var handleResize = (0, _lodash["default"])(function (entries) {
        var cr = entries[0].contentRect;

        for (var breakpoint in conds.value) {
          if (conds.value[breakpoint](cr)) {
            el.classList.add(breakpoint);
          } else {
            el.classList.remove(breakpoint);
          }
        }
      }, 200);
      var observer = new _resizeObserverPolyfill["default"](handleResize);
      observer.observe(el);
    }
  }
};
exports.ResponsiveDirective = ResponsiveDirective;

var VueResponsiveComponents = function VueResponsiveComponents(Vue) {
  Vue.component("Responsive", Responsive);
  Vue.directive("responsive", ResponsiveDirective);
};

exports.VueResponsiveComponents = VueResponsiveComponents;