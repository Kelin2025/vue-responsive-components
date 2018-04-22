# vue-responsive-components

Create responsive components with ResizeObserver

## Installation

```
npm install vue-responsive-components
```

## Usage

#### As mixin

```vue
<template>
  <div :class="['post__item', { small: el.is.small }]">
    <img class="post__image" :src="post.image" />
    <div class="post__text">{{post.text}}</div><>
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

#### As component with scoped slot

```vue
<template>
  <Responsive :breapoints="{
    small: el => el.width <= 500>
  }>
    <div slot-scope="el" :class="['post__item', { small: el.is.small }]">
      <img class="post__image" :src="post.image" />
      <div class="post__text">{{post.text}}</div><>
    </div>
  </Responsive>
</template>

<script>



import { Responsive } from 'vue-responsive-components'

export default {
  components: { Responsive }
}
```

## License

MIT
