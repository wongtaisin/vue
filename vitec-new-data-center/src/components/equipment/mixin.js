import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["is_set_belong"])
  },
  watch: {
    is_set_belong(val) {
      console.log('is_set_belong', val)
      this.init();
    }
  },
}
