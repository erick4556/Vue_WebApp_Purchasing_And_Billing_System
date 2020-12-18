<template>
  <div>
    <b-img
      :id="img.id"
      :src="img.previewURL"
      thumbnail
      fluid
      rounded
      v-b-popover.hover.top="img.tags"
      title="Curso de vue"
      @click="showModal2 = true"
    />
    <!--  <b-modal :ref="img.id" hide-footer size="xl" :title="img.tags">
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
    </b-modal> -->
    <Modal :showModal2="showModal2" :img="img" />
  </div>
</template>

<script>
import Modal from "./Modal";
export default {
  name: "Image",
  props: ["img"],
  components: {
    Modal,
  },
  data() {
    return {
      showModal2: false,
    };
  },
  methods: {
    showModal() {
      this.$refs[this.img.id].show();
    },
  },
};
</script>

<style>
</style>

