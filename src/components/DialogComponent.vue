<template>
  <el-dialog v-model="localVisible" width="30vw" draggable align-center :title="title" @closed="close">
    <template #default>
      <div class="dialog-boyd">
        <slot></slot>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">{{ $t('other.cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm"> {{ $t('other.confirm') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps<{
  visible: boolean,
  title: string
}>();

const emits = defineEmits<{
  'update:visible': [value: boolean],
  'confirm': [],
}>();

const localVisible = ref(props.visible)
const handleVisible = (newValue: boolean) => {
  localVisible.value = newValue
  emits('update:visible', newValue)
}
watch(() => props.visible, (newValue) => {
  localVisible.value = newValue;
});

const handleConfirm = () => {
  console.log('handleConfirm')

  emits('confirm')
}

const close = () => {
  handleVisible(false)
}
</script>
<style scoped>
.dialog-footer {
  text-align: right;
}

.dialog-boyd {
  margin-top: 15px;
}
</style>
