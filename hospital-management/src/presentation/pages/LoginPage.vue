<template>
  <section>
    <main class="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div class="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
        <div class="bg-[#16202a] text-white flex items-center justify-center flex-col">
          <div class="my-4">
            <h1 class="text-3xl font-semibold text-center">Seja bem-vindo!</h1>
            <p class="mt-2 text-xs text-slate-400">Vamos começar com seus atendimentos</p>
          </div>
          <form @submit.prevent="loginUser" class="flex flex-col gap-2">
            <InputLabel
              @update:modelValue="($event) => (form.password = $event)"
              labelText="Email:"
              inputType="email"
              placeholder="Email"
              id="email"
              ><Mail
            /></InputLabel>
            <InputLabel
              @update:modelValue="($event) => (form.password = $event)"
              labelText="Senha:"
              inputType="password"
              placeholder="Senha"
              id="password"
              ><Key
            /></InputLabel>
            <Button v-if="!isLoading" class="rounded-full" type="submit">Acessar</Button>
            <LoaderButton v-else class="rounded-full" />
          </form>
          <p class="mt-4 text-xs text-slate-200">@2024 Todos os direitos reservados.</p>
          <p class="mt-4 text-xs text-slate-200">
            Clique <router-link :to="{ name: RootPage.REGISTER }">aqui</router-link> para se
            registrar!
          </p>
        </div>
        <div class="relative hidden md:block">
          <img class="object-cover h-full" src="/login-image.png" alt="bg-image" />
        </div>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RootPage } from '@/main/routes'
import { Button } from '@/presentation/components/atoms'
import { InputLabel, LoaderButton } from '@/presentation/components/molecules'
import { Key, Mail } from 'lucide-vue-next'
import { isLoading } from '@/main/composables'

const form = reactive({})

const loginUser = () => {
  isLoading.value = true
}
</script>
