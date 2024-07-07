<template>
  <Button disabled>
    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
  </Button>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { Button } from '@/presentation/components/atoms'

const { text } = defineProps({
  text: {
    type: String
  }
})
</script>
