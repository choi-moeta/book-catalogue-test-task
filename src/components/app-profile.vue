<script setup lang="ts">
import { useAuth } from '../firebase'

const { isAuthenticated, user } = useAuth()
</script>

<template>
  <app-block>
    <template v-if="isAuthenticated">
      <div class="flex flex-col gap-4 items-end">
        <div class="flex gap-4 items-center">
          <img class="w-12 h-12 rounded-sm" :src="user?.photoURL!" alt="user avatar">
          <div>
            <div>{{ user?.displayName }}</div>
            <div class="text-sm text-gray-500">
              {{ user?.email }}
            </div>
          </div>
        </div>
        <app-button size="sm" type="transparent">
          Sign out
        </app-button>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col gap-4">
        <div>Unauthenticated</div>
        <app-button type="transparent">
          Sign out
        </app-button>
      </div>
    </template>
  </app-block>
</template>
