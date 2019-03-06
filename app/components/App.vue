<template>
    <Page  >
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

        <RadSideDrawer ref="drawer"  drawerLocation="Left">
            <StackLayout ~drawerContent backgroundColor="#ffffff">>
                <StackLayout >
                    <Label class="drawer-header" text="Menú"></Label>

                    <Label text="Mis Favoritos" class="drawer-item ripple" backgroundColor="lightgray" @tap="goToFavorites"></Label>
                    <Label text="Filtros" class="drawer-item ripple" @tap="showFilters"></Label>
                    <Label text="Gráficos" class="drawer-item ripple" @tap="goToCharts"></Label>
                    <Label text="Cerrar sesión" class="drawer-item" @tap="logout"></Label>
                    <Label text="Cerrar" class="drawer-close-button" padding="100" style="horizontal-align: center" @tap="onCloseDrawerTap"></Label>
                </StackLayout>

            </StackLayout>
            <StackLayout ~mainContent>
                <!--<Frame defaultPage="main-content-page">-->


                    <SearchBar :visibility="isItemVisible ? 'visible' : 'collapsed'"
                               style="padding-bottom: 20px;" hint="Buscar Startup"
                               v-model="searchQuery"
                               @submit="onTextChanged"
                               @clear="loadData"/>

                    <ListView class="list-group" for="entity in data" @itemTap="goToDetail"
                              style="height: 100%; padding-top: 20">
                        <v-template>
                            <FlexboxLayout flexDirection="row" class="list-group-item">
                                <Image src="~/assets/images/brain.png" class="thumb img-circle" />

                                <StackLayout style="width: 60%">
                                    <Label class="block" :text="entity.gsx$nombre.$t"  textWrap="true"   />
                                    <Label class="inline" :text="'Industria: '+entity.gsx$industria.$t"  textWrap="true" />
                                    <Label class="inline" :text="'Ubicación: '+entity.gsx$país.$t"  textWrap="true" />
                                </StackLayout>

                                <StackLayout style="float: right;">
                                    <Label class="fa" :class="{favorite: entity.favorite}" :text="'fa-star' | fonticon" @tap="addToFavorites(entity)" />
                                </StackLayout>
                            </FlexboxLayout>
                        </v-template>
                    </ListView>
                <!--</Frame>-->

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

    .ripple {
        background-position: center;
        transition: background 0.8s;
    }
    .ripple:hover {
        background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
    }
    .ripple:active {
        background-color: #6eb9f7;
        background-size: 100%;
        transition: background 0s;
    }

    .fa {
        font-size: 25;
    }
</style>
