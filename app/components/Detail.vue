<template>

    <Page class="page">
        <ActionBar :title="this.entity.gsx$nombre.$t" class="action-bar">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="navigateBack" />
        </ActionBar>

        <StackLayout style="margin: 0 20px 0 20px;">
            <FlexboxLayout flexWrap="wrap">
                <Label width="60%" alignSelf="center" :text="this.entity.gsx$nombre.$t" class="entity-title"  />
                <Label  alignSelf="center" class="fa" @tap="addNewFavorite(entity)" :class="{favorite: entity.favorite}" :text="'fa-star' | fonticon" />
            </FlexboxLayout>
                <Label :text="'Industria: '+this.entity.gsx$industria.$t" height="20"/>
                <Label :text="'Tipo de solución: '+this.entity.gsx$tipodesolución.$t" height="20"/>
                <Label :text="'Ubicación: '+this.entity.gsx$país.$t" height="20"/>
                <Label :text="'Fecha de contacto: '+this.entity.gsx$fechadecontacto.$t" height="20"/>
                <Label :visibility="this.entity.gsx$universidadincubadora.$t ? 'visible' : 'collapsed'" :text="'Universidad incubadora: '+this.entity.gsx$universidadincubadora.$t" height="20"/>

            <Button class="btn btn-primary btn-rounded-lg" text="Descubre más" @tap="goToWebPage" />
        </StackLayout>
    </Page>

</template>

<script>
    import * as utils from "utils/utils";
    import globals from "../mixins/globals";

    export default {
        name: "Detail",
        mixins: [ globals ],
        props: {
            entity: {
                type: Object,
                required: true,
            }
        },
        methods: {
            goToWebPage() {
                utils.openUrl(this.entity.gsx$páginaweb.$t)
            }
        }
    }
</script>

<style scoped>
    .entity-title {
        font-size: 25;
        color: black;
    }
</style>