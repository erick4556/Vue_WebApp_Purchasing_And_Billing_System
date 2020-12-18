<template>
  <div>
    <b-modal v-model="show" hide-footer size="xl" :title="img.tags" scrollable>
      <div class="d-block text-center">
        <b-img-lazy
          top
          :id="img.id"
          :src="img.largeImageURL"
          :alt="img.tags"
          fluid
          rounded
          v-b-popover.focus="img.tags"
        >
        </b-img-lazy>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["img", "showModal2"],
  computed: {
    show: {
      get() {
        return this.showModal2;
      },
      set(value) {
        return value;
      },
    },
  },
};
</script>

<style>
</style>

