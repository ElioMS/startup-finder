import Detail from "../components/Detail";

export default {
    name: "globals",
    methods: {
        navigateBack() {
            this.$navigateBack()
        },
        addNewFavorite(args) {
            this.$store.commit('SET_FAVORITE', {name: args.gsx$nombre.$t});
        },
        goToDetail: function(args) {
            this.$navigateTo(Detail, {
                props: {
                    entity: args.item
                }
            })
        }
    }
}