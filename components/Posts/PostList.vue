<template>
  <section class="post-list">
    <PostPreview
      id="1"
      title="Big news"
      preview-text="There is something fishy going on"
      thumbnail="https://upload.wikimedia.org/wikipedia/commons/1/14/Big_Tech_companies.png"
    />
    <PostPreview
      id="2"
      title="Big news #2"
      preview-text="There is something fishy going on"
      thumbnail="https://upload.wikimedia.org/wikipedia/commons/1/14/Big_Tech_companies.png"
    />
    <PostPreview
      id="3"
      title="(3) Big news"
      preview-text="There is something fishy going on"
      thumbnail="https://upload.wikimedia.org/wikipedia/commons/1/14/Big_Tech_companies.png"
    />
  </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview.vue'

export default {
  components: {
    PostPreview,
  },
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
