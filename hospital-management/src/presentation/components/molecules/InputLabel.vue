<template>
  <Label :for="id">{{ labelText }}</Label>
  <div class="relative w-full max-w-sm items-center">
    <Input
      @input="emit('update:modelValue', $event.target.value)"
      :id="id"
      :type="inputType"
      :placeholder="placeholder"
      class="pl-10 rounded-full"
    />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <slot class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { Input, Label } from '@/presentation/components/atoms'

const emit = defineEmits(['update:modelValue'])

const { labelText, inputType, id, placeholder } = defineProps({
  labelText: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  placeholder: {
    type: String
  }
})
</script>
