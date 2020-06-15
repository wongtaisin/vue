<template>
  <div class="management">
    <management-heard></management-heard>
    <management-analysis></management-analysis>
    <management-attendance></management-attendance>
  </div>
</template>

<script>
import managementHeard from '@/views/management/head'
import managementAnalysis from '@/views/management/analysis/index'
import managementAttendance from '@/views/management/attendance/index'
export default {
  name: 'management',
  components: {
    managementHeard,
    managementAnalysis,
    managementAttendance
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.management {
  text-align: left;
}
</style>
