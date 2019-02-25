<template>
    <Page class="page">
        <!--<ActivityIndicator busy="true" @busyChange="onBusyChanged" />-->
        <ActionBar class="action-bar">

            <ActionItem android.systemIcon="ic_menu_edit" android.position="left" @tap="showFilters"/>
            <NavigationButton android.systemIcon="ic_menu_edit" android.position="left" @tap="goToFavorites"/>
            <ActionItem @tap="onTapSearch" android.systemIcon="ic_menu_search" android.position="right" />
            <!--<StackLayout >-->
                <Label class="action-bar-title" text="StartUp Finder" />
                <!--<Label class="action-bar-title" text="StartUp Finder"  :visibility="isItemVisible ? 'collapsed' : 'visible'" />-->
            <!--</StackLayout>-->
        </ActionBar>

        <StackLayout>

            <SearchBar :visibility="isItemVisible ? 'visible' : 'collapsed'"
                       style="padding-bottom: 20px;" hint="Buscar Startup"
                       v-model="searchQuery"
                       @submit="onTextChanged"/>

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
                            <!--<FormattedString>-->
                                <!--<Span class="block"  />-->
                                <!--<StackLayout class="hr-light m-10"></StackLayout>-->
                                <!--<Span style="display: block;" :text="entity.gsx$industria.$t" />-->
                                <!--<Span style="display: block;" :text="entity.gsx$país.$t" />-->
                            <!--</FormattedString>-->

                        <Label class="fa" :class="{favorite: entity.favorite}" :text="'fa-star' | fonticon" @tap="addToFavorites(entity)" />
                    </FlexboxLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
    import Detail from "./Detail";
    import Favorites from "./Favorites"
    import Filters from "./Filters"

    export default {
        data() {
            return {
                isItemVisible: false,
                searchQuery: '',
                // data: []
            }
        },
        computed: {
            data() {
                return this.$store.getters.GET_ENTITIES;
            }
        },
        mounted() {
            this.$store.dispatch('LOAD_ENTITIES');
            // axios.get('https://spreadsheets.google.com/feeds/list/1s8yMnY-Ks6SG-agOWSpd5wnlZyXdENWW2xZ3ABCowho/1/public/values?alt=json')
            //     .then(response => {
            //         this.data = response.data.feed.entry;
            //     });
        },
        methods: {
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
            addToFavorites (args) {
                this.$store.commit('SET_FAVORITE', {name: args.gsx$nombre.$t});
            },
            onTapSearch() {
                this.isItemVisible = !this.isItemVisible
            },
            onTextChanged(args) {
                alert(args.object.text)
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

</style>
