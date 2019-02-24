<template>

    <Page class="page">
        <ActionBar :title="this.entity.gsx$nombre.$t" class="action-bar">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
        </ActionBar>
        <StackLayout>
            <Label :text="this.entity.gsx$nombre.$t" class="entity-title"
                   style="width: 60%" />

            <Label class="fa" :text="'fa-eye' | fonticon" />
        </StackLayout>
    </Page>

</template>

<script>
    export default {
        name: "Detail",
        props: {
            entity: {
                type: String,
                required: true,
            }
        },
        methods: {
            goBack() {
                this.$navigateBack()
            }
        }
    }
</script>

<style scoped>
    .entity-title {
        font-size: 25;
    }
</style>