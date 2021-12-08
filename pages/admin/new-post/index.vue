<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <form @submit.prevent="onSave">
        <AppControlInput v-model="editedPost.author"
          >Author Name</AppControlInput
        >

        <AppControlInput v-model="editedPost.title">Title</AppControlInput>

        <AppControlInput v-model="editedPost.thumbnailLink"
          >Thumbnail Link</AppControlInput
        >

        <AppControlInput v-model="editedPost.content" control-type="textarea"
          >Content</AppControlInput
        >

        <AppButton type="submit">Save</AppButton>

        <AppButton
          type="button"
          style="margin-left: 10px"
          btn-style="cancel"
          @click="onCancel"
          >Cancel</AppButton
        >
      </form>
    </section>
  </div>
</template>

<script>
import AppButton from '@/components/UI/AppButton.vue'
import AppControlInput from '@/components/UI/AppControlInput.vue'

export default {
  components: {
    AppButton,
    AppControlInput,
  },
  data() {
    return {
      editedPost: {
        author: '',
        title: '',
        thumbnailLink: '',
        content: '',
      },
    }
  },
  methods: {
    onSave() {
      // Save the post
    },
    onCancel() {
      // Cancel
      this.$router.push('/admin')
    },
  },
}
</script>
