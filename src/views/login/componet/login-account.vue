<template>
  <div class="loginAccount">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
// import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '../../../unit/cache'
export default defineComponent({
  setup() {
    // const store = useStore()
    const router = useRouter()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ' '
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid: any) => {
        if (valid) {
          // 1. 是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          }
          // 2. 开始进行登录验证
          // store.dispatch('login/accountLoginAction', { ...account })
          console.log('xxxx')
          router.push('/main')
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>
<style lang="less" scoped>
.loginAccount {
  margin-bottom: 10px;
}
</style>
