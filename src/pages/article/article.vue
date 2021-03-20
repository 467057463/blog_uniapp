<template lang="pug">
  b Hello World!
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello'
    }
  },
  onLoad(options) {
    console.log(options.id)
  },
  methods: {
    go(){
      this.$route.push('pages/article/article')
    }
  }
}
</script>

<style lang="scss">
b{
  color: red;
}
</style>