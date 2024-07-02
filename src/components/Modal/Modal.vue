<script setup lang="ts">
  interface ModalProps {
    title: string;
    primaryButton: string;
    secondaryButton: string;
  }
  
  const modalProps = defineProps<ModalProps>();

  const emit = defineEmits(['success', 'close'])

  const handleSuccess = () => {
    emit('success');
  }

  const handleClose = () => {
    emit('close')
  }
</script>

<template>
  <div class="tw-bg-black/55 tw-h-full tw-w-full tw-fixed tw-top-0 tw-left-0 tw-flex tw-justify-center tw-items-center">
    <div class="tw-bg-white tw-w-2/4 tw-h-3/4 tw-rounded-md tw-shadow-lg tw-relative">
      <div class="tw-flex tw-justify-end tw-p-3.5">
        <h3 class="tw-text-lg tw-font-bold">{{ modalProps.title }}</h3>
        <button 
          type="button"
          class="tw-text-gray-400 tw-bg-transparent hover:tw-bg-gray-200 hover:tw-text-gray-900 tw-rounded-lg tw-text-sm p-1.5 tw-ml-auto tw-inline-flex tw-items-center"
          @click="handleClose"
        >
          <svg 
            class="tw-w-5 tw-h-5" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
              <path 
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" 
              />
          </svg>
        </button>
      </div>
      <slot name="body"></slot>
      <div class="tw-flex tw-gap-4 tw-justify-center tw-items-center tw-absolute tw-bottom-0 tw-w-full tw-border tw-border-t-2 tw-p-3.5">
        <button 
          type="button"
          class="tw-text-red-400 tw-bg-transparent hover:tw-bg-gray-100 hover:tw-text-red-600 tw-rounded-lg"
          @click="handleClose"
        >
          {{ modalProps.secondaryButton }}
        </button>
        <button 
          type="button"
          class="tw-text-blue-400 tw-bg-transparent hover:tw-bg-gray-100 hover:tw-text-blue-900 tw-rounded-lg"
          @click="handleSuccess"
        >
          {{ modalProps.primaryButton }}
        </button>
      </div>
    </div>
  </div>
</template>