<script setup lang="ts">
withDefaults(defineProps<{
  tag?: string
  icon?: boolean
  disabled?: boolean
  type?: 'primary' | 'secondary' | 'danger' | 'transparent' | 'icon'
  size?: 'xs' | 'sm' | 'md'
}>(), {
  tag: 'button',
  icon: false,
  disabled: false,
  type: 'primary',
  size: 'md',
})
</script>

<template>
  <component
    :is="tag"
    class="hover:no-underline"
    :class="{
      'px-4 py-2 rounded': !icon && size === 'md',
      'px-3 pb-2 pt-1.5 text-sm rounded-sm': !icon && size === 'sm',
      'px-2 pt-0.5 pb-1 text-sm rounded-sm': !icon && size === 'xs',
      'p-1 rounded flex text-sm': icon,
      'bg-violet-500 hover:bg-violet-600 text-white': type === 'primary',
      'bg-gray-100 hover:bg-gray-200 dark:(bg-gray-800 hover:bg-gray-700)': type === 'secondary',
      'border border-red-500 text-red-500 hover:(bg-red-600 text-white)': type === 'danger',
      'bg-transparent hover:(bg-gray-100 dark:bg-gray-800)': type === 'transparent' || type === 'icon',
      'bg-gray-100 hover:bg-gray-100 dark:(bg-gray-800 hover:bg-gray-800) text-dim cursor-not-allowed': disabled,
    }"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>
