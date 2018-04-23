# vue-responsive-components

Create responsive components with ResizeObserver.

## Idea

Check out [**my post on ITNEXT**](https://itnext.io/making-adaptive-vue-components-with-resizeobserver-123b5ebb20ae)

## Installation

```
npm install vue-responsive-components
```

## (Optional) Add plugin globally

```javascript
import Vue from "vue"
import { VueResponsiveComponents } from "vue-responsive-components"

Vue.use(VueResponsiveComponents)
```

It will add `Responsive` component and `v-responsive` directive

## Usage

#### `Responsive` component with scoped slot

```vue
<template>
  <Responsive :breakpoints="{
    small: el => el.width <= 500
  }">
    <div slot-scope="el" :class="['post__item', { small: el.is.small }]">
      <img class="post__image" :src="post.image" />
      <div class="post__text">{{post.text}}</div>
    </div>
  </Responsive>
</template>

<script>
import { Responsive } from "vue-responsive-components"

export default {
  props: ["post"],
  components: { Responsive }
}
</script>

<style>
.post__item {
  display: flex;
}

.post__image {
  flex: 0 0 200px;
  height: 200px;
}

.post__item.small {
  flex-direction: column;
}

.post__item.small .post__image {
  flex: 0 auto;
  height: auto;
}
</style>
```

#### `v-responsive` directive

> Thanks to [**this guy**](https://www.reddit.com/r/vuejs/comments/8eap88/making_responsive_vue_components_with/dxtx0bu/) for idea

```vue
<template>
  <!-- Will add/remove .small if the width is less / greater -->
  <div class="post__item" v-responsive="{ small: el => el.width <= 500 }">
    <img class="post__image" :src="post.image" />
    <div class="post__text">{{post.text}}</div>
  </div>
</template>

<script>
import { ResponsiveDirective } from "vue-responsive-components"

export default {
  props: ["post"],
  directives: {
    responsive: ResponsiveDirective
  }
}
</script>
```

#### Mixin

```vue
<template>
  <div :class="['post__item', { small: el.is.small }]">
    <img class="post__image" :src="post.image" />
    <div class="post__text">{{post.text}}</div>
  </div>
</template>

<script>
import { ResponsiveMixin } from "vue-responsive-components"

export default {
  props: ["post"],
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 500
  }
}
</script>
```

## License

MIT
