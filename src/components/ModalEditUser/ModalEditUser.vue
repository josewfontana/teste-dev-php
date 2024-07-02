<template>
  <Modal title="Editar usuário" primary-button="Editar" secondary-button="Cancelar" @close="emit('cancel')" @success="updateUser">
    <template #body>
      <div class="tw-w-full tw-max-w-xs">
        <form class="tw-p-5">
          <div class="tw-mb-4">
            <label class="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="username">
              Nome
            </label>
            <input 
              class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline" 
              id="username" 
              type="text" 
              placeholder="Nome"
              v-model="props.user.name"
            >
          </div>
          <div class="tw-mb-4">
            <label class="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="document">
              Documento
            </label>
            <input 
              class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline" 
              id="document" 
              type="text" 
              placeholder="Documento"
              v-model="props.user.document"
              v-maska="mask"
            >
          </div>
          <div class="tw-mb-4">
            <label class="tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="address">
              Endereço
            </label>
            <input 
              class="tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-700 tw-leading-tight focus:tw-outline-none focus:tw-shadow-outline" 
              id="address" 
              type="text" 
              placeholder="Endereço"
              v-model="props.user.address"
            >
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
  import Modal from '@/components/Modal/Modal.vue';
  import type { Users } from '@/models/users';
  import { updatetUser } from '@/services/users';
  import { computed } from 'vue';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  
  interface EditUserModalProps {
    user: Users
  }

  const props = defineProps<EditUserModalProps>();

  const emit = defineEmits(['cancel', 'edit']);

  const mask = computed(() => {
    return props.user.type === 'person' ? '###.###.###-##' : '##.###.###/####-##'
  })

  async function updateUser() {
    try {
      await updatetUser(props.user)

      toast.success('Usuário alterado com sucesso')
    }catch (error) {
      console.warn(error)
      toast.error('Oops, aldo deu errado, tente novamente mais tarde!')
    } finally {
      emit('cancel')
    }
  }
</script>