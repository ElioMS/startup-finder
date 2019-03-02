<template>
    <Page class="page">
        <!--<ActivityIndicator busy="true" @busyChange="onBusyChanged" />-->
        <ActionBar class="action-bar">

            <!--<ActionItem android.systemIcon="ic_menu_edit" android.position="left" @tap="showFilters"/>-->
            <NavigationButton android.systemIcon="ic_menu_btn_add" android.position="left" @tap="toggleDrawer"/>
            <!--<NavigationButton android.systemIcon="ic_menu_edit" android.position="left" @tap="goToFavorites"/>-->
            <ActionItem @tap="onTapSearch" android.systemIcon="ic_menu_search" android.position="right" />
            <!--<StackLayout >-->
            <Label class="action-bar-title" text="StartUp Finder" />
            <!--<Label class="action-bar-title" text="StartUp Finder"  :visibility="isItemVisible ? 'collapsed' : 'visible'" />-->
            <!--</StackLayout>-->
        </ActionBar>

        <RadSideDrawer ref="drawer"  drawerLocation="Left" :showOverNavigation="true" gesturesEnabled="true">
            <StackLayout ~drawerContent backgroundColor="#ffffff">>
                <StackLayout >
                    <Label class="drawer-header" text="Menú"></Label>

                    <Label text="Mis Favoritos" class="drawer-item" @tap="goToFavorites"></Label>
                    <Label text="Filtros" class="drawer-item" @tap="showFilters"></Label>
                    <Label text="Data Management" class="drawer-item" @tap="goToCharts"></Label>
                    <Label text="Cerrar sesión" class="drawer-item" @tap="logout"></Label>
                    <Label text="Close Drawer" class="drawer-close-button" padding="10" style="horizontal-align: center" @tap="onCloseDrawerTap"></Label>
                </StackLayout>

            </StackLayout>
            <StackLayout ~mainContent>

                <SearchBar :visibility="isItemVisible ? 'visible' : 'collapsed'"
                           style="padding-bottom: 20px;" hint="Buscar Startup"
                           v-model="searchQuery"
                           @submit="onTextChanged"
                           @clear="loadData"/>

                <ListView class="list-group" for="entity in data" @itemTap="goToDetail"
                          style="height:1250px; padding-top: 20">
                    <v-template>
                        <FlexboxLayout flexDirection="row" class="list-group-item">
                            <Image src="~/assets/images/brain.png" class="thumb img-circle" />

                            <StackLayout style="width: 60%">
                                <Label class="block" :text="entity.gsx$nombre.$t"  textWrap="true"   />
                                <Label class="inline" :text="'Industria: '+entity.gsx$industria.$t"  textWrap="true" />
                                <Label class="inline" :text="'Ubicación: '+entity.gsx$país.$t"  textWrap="true" />
                            </StackLayout>

                            <Label class="fa" :class="{favorite: entity.favorite}" :text="'fa-star' | fonticon" @tap="addToFavorites(entity)" />
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </StackLayout>
        </RadSideDrawer>


    </Page>
</template>

<script>
    import Detail from "./Detail";
    import Charts from "./Charts";
    import Favorites from "./Favorites"
    import Filters from "./Filters"
    import Login from "./Login";

    export default {
        name: 'App',
        data() {
            return {
                isItemVisible: false,
                searchQuery: ''
            }
        },
        computed: {
            data() {
                return this.$store.getters.GET_ENTITIES;
            }
        },
        mounted() {
            this.$store.dispatch('LOAD_ENTITIES');
        },
        methods: {
            onCloseDrawerTap() {
                this.$refs.drawer.nativeView.closeDrawer();
            },
            toggleDrawer() {
                this.$refs.drawer.nativeView.toggleDrawerState();
            },
            goToDetail: function(args) {
                this.$navigateTo(Detail, {
                    props: {
                        entity: args.item
                    }
                })
            },
            showFilters() {
                this.$showModal(Filters)
            },
            goToFavorites () {
                this.$navigateTo(Favorites);
            },
            goToCharts () {
                this.$navigateTo(Charts);
            },
            addToFavorites (args) {
                this.$store.commit('SET_FAVORITE', {name: args.gsx$nombre.$t});
            },
            onTapSearch() {
                this.isItemVisible = !this.isItemVisible
            },
            onTextChanged(args) {
                this.$store.commit('SET_SEARCH', {query: args.object.text });
            },
            loadData() {
                this.$store.dispatch('LOAD_ENTITIES');
            },
            logout() {
                this.$navigateTo(Login)
            }
        }
    }
</script>

<style>
    ActionBar {
        /*background-color: #0f95ba;*/
        color: #ffffff;
    }

    .block {
        font-size: 20px;
        margin-right: 10px;
        display: block !important;
    }

    .inline {
        font-size: 10px;
        margin-right: 10px;
        display: inline-block !important;
    }

    .favorite {
        color: #ffd341;
    }

    .drawer-header {
        padding: 16 16 16 16;
        /*margin-bottom: 16;*/
        background-color: #333333;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        /*background-color: white;*/
        font-size: 16;
    }

    .drawer-close-button {
        margin-top: 20;
        padding: 10 10 10 10;
        /*background-color: #53ba82;*/
        color: #333;
    }
</style>
