<template>
  <section>
    <main class="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div class="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
        <div class="bg-[#16202a] text-white flex items-center justify-center flex-col">
          <div class="my-4">
            <h1 class="text-3xl font-semibold text-center">Crie o seu cadastro!</h1>
          </div>
          <form @submit.prevent="registerUser" class="flex flex-col gap-2">
            <InputLabel
              @update:modelValue="($event) => (form.name = $event)"
              labelText="Nome:"
              inputType="text"
              placeholder="Nome"
              id="name"
              ><PersonStanding
            /></InputLabel>
            <InputLabel
              @update:modelValue="($event) => (form.lastName = $event)"
              labelText="Sobrenome:"
              inputType="text"
              placeholder="Sobrenome"
              id="last_name"
              ><PersonStanding
            /></InputLabel>
            <InputLabel
              @update:modelValue="($event) => (form.email = $event)"
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
            <InputLabel
              @update:modelValue="($event) => (form.confirmPassword = $event)"
              labelText="Confirmar Senha:"
              inputType="password"
              placeholder="Senha"
              id="confirmPassword"
              ><Key
            /></InputLabel>
            <Label>Estado:</Label>
            <select
              class="border rounded-md p-2"
              v-model="selectedState"
              @change="handleCallCityData"
            >
              <option class="mx-4" v-for="state in uf" :key="state" :value="state">
                {{ state }}
              </option>
            </select>
            <Label>Cidade:</Label>
            <select v-model="selectedCity" class="border rounded-md p-2">
              <option v-for="city in alphabeticalCityOrder" :key="city.id" :value="city.name">
                {{ city.name }}
              </option>
            </select>
            <Button v-if="!isLoading" class="rounded-full" type="submit">Registrar</Button>
            <LoaderButton v-else class="rounded-full" />
          </form>
          <p class="mt-4 text-xs text-slate-200">@2024 Todos os direitos reservados.</p>
          <p class="mt-4 text-xs text-slate-200">
            Já tem conta? Clique
            <router-link :to="{ name: RootPage.LOGIN }">aqui</router-link> para realizar o acesso!
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
import type { CityModel } from '@/domain/city-model'
import type { GeoStatisticService } from '@/data/usecases/geo-statistic-service'
import { ref, computed, reactive } from 'vue'
import { uf } from '@/data/constants'
import { Key, Mail, PersonStanding } from 'lucide-vue-next'
import { RootPage } from '@/main/routes'
import { Button } from '@/presentation/components/atoms'
import { InputLabel, LoaderButton } from '@/presentation/components/molecules'
import { isLoading } from '@/main/composables'
import { injectSafe } from '@/main/services/dependency-injection'

const geoStatisticService = injectSafe<GeoStatisticService>('GeoStatisticService')

const registerUser = () => {
  isLoading.value = true
}

const cities = ref<CityModel[]>([])

const selectedState = ref<string>('')
const selectedCity = ref<string>('')

const form = reactive({
  name: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleCallCityData = async () => {
  const citiesData = await geoStatisticService.getCitiesByState(selectedState.value)
  cities.value = citiesData
}

const alphabeticalCityOrder = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return cities.value.sort((a, b) => a.name.localeCompare(b.name))
})
</script>
