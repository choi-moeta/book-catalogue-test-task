<script setup lang="ts">
defineProps<{
  name: string
  error?: string | null
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <div class="text-dim">
        {{ name }}:
      </div>
      <div class="flex flex-col gap-1 items-start">
        <slot />
        <template v-if="error">
          <div class="text-xs text-red-500">
            {{ error }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
