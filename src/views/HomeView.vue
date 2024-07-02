<script setup lang="ts">
  import { ref, onMounted, type Ref, reactive } from 'vue';
  import { deleteUser, getUsers } from '@/services/users';
  import type { Users, person } from '@/models/users';
  import TrashIcon from '@/components/icons/TrashIcon.vue';
  import EditIcon from '@/components/icons/EditIcon.vue';
  import ModalEditUser from '@/components/ModalEditUser/ModalEditUser.vue'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  const users: Ref<Users[]> = ref([]);
  const editModal: Ref<boolean> = ref(false);
  const selectedUser: Ref<Users> = ref({
    id: '',
    type: 'person',
    name: '',
    document: '',
    address: '',
    zipCode: '',
    state: '',
    country: '',
  })

  onMounted(() => {
    getData()
  })

  async function getData() {
    try {
      const data = await getUsers();

      users.value = data.data;
    } catch(e) {
      console.error(e)
    }
  }

  const returnType = (type: person) => {
    return type == 'company' ? 'Pessoa Jurídica' : 'Pessoa Física'
  }

  function openEditModal(user: Users) {
    selectedUser.value = user;
    editModal.value = true
  }

  function closeEditModal(){
    editModal.value = false;
  }

  async function handleDeleteUser(user: Users) {
    if(window.confirm(`Tem certeza que deseja excluir o cadastro do usuário ${user.name}?`)){
      try {
        await deleteUser(user);
        await getData()

        toast.success('Usuário deletado com sucesso')
      } catch(error) {
        console.warn(error)
        toast.error('Oops, aldo deu errado, tente novamente mais tarde!')
      }
    }
  }
</script>

<template>
  <main>
    <div class="table-container tw-overflow-auto tw-w-full">
      <table class="tw-w-full tw-table-auto tw-relative tw-border-collapse tw-border">
        <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-100 tw-sticky tw-top-0">
          <tr>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              ID
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              Nome
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              Tipo
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              Documento
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              Estado
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              País
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              {{ user.id }}
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              {{ user.name }}
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              {{ returnType(user.type) }}
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              {{ user.type == 'person' ? `CPF: ${user.document}` : `CNPJ: ${user.document}` }}
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              {{ user.state }}
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border">
              {{ user.country }}
            </th>
            <th scope="col" class="tw-px-6 tw-py-3 tw-border tw-flex tw-gap-4 tw-justify-center">
              <button>
                <TrashIcon @click="handleDeleteUser(user)"/>
              </button>
              <button @click="openEditModal(user)">
                <EditIcon />
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalEditUser
      v-if="editModal"
      :user="selectedUser"
      @cancel="closeEditModal()"
      @edit="getData()"
    />
  </main>
</template>

<style scoped>
  .table-container {
    max-height: calc(100vh - 70px);
  }
</style>