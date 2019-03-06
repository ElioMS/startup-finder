<template>
    <Page>
        <ActionBar :title="'Resultados ('+data.length+')'" class="action-bar">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>

        <StackLayout>
            <Label class="not-found" v-if="data.length === 0" text="No se encontraron resultados." textWrap="true"></Label>

            <ListView class="list-group" for="entity in data" @itemTap="goToDetail"
                      style="padding-top: 20">
                <v-template>
                    <FlexboxLayout flexDirection="row" class="list-group-item">
                        <Image src="~/assets/images/brain.png" class="thumb img-circle" />

                        <StackLayout style="width: 60%">
                            <Label class="block" :text="entity.gsx$nombre.$t"  textWrap="true"   />
                            <Label class="inline" :text="'Industria: '+entity.gsx$industria.$t"  textWrap="true" />
                            <Label class="inline" :text="'Ubicación: '+entity.gsx$país.$t"  textWrap="true" />
                        </StackLayout>

                        <Label class="fa" :class="{favorite: entity.favorite}" :text="'fa-star' | fonticon" @tap="addNewFavorite(entity)" />
                    </FlexboxLayout>
                </v-template>
            </ListView>


        </StackLayout>
    </Page>
</template>

<script>
    import globals from "../mixins/globals";

    export default {
        name: "Filtered",
        mixins: [ globals ],
        computed: {
            data() {
                return this.$store.getters.GET_FILTERED;
            },
            duplicate() {
                return this.$store.getters.GET_BY_SOLUTION
            }
        }
    }
</script>

<style scoped>
    .not-found {
        text-align: center;
        font-size: 25px;
        font-weight: bold;
    }
</style>