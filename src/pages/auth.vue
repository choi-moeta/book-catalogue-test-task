<script setup lang="ts">
import { useRouter } from 'vue-router'
import { signIn, useAuth } from '../firebase'

const router = useRouter()
const { isAuthenticated } = useAuth()

watch(isAuthenticated, (val) => {
  if (val) {
    router.push('/')
  }
})
</script>

<template>
  <div
    class="
      max-w-400px
      border border-gray-300 dark:border-gray-700
      rounded
      mx-auto mt-100px p-4
      flex flex-col
    "
  >
    <app-title>
      Sign In
    </app-title>
    <p class="mt-2">
      To use the app you need to be authorized.
    </p>
    <app-button class="mt-8" @click="signIn">
      Sign in with google
    </app-button>
  </div>
</template>
