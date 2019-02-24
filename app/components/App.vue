<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <ActionItem @tap="onTapSearch"
                        ios.systemIcon="9" ios.position="left"
                        android.systemIcon="ic_menu_search" android.position="actionBar" />

            <StackLayout >
                <Label class="action-bar-title" text="StartUp Finder"  :visibility="isItemVisible ? 'collapsed' : 'visible'" />
                <SearchBar :visibility="isItemVisible ? 'visible' : 'collapsed'"
                            style="padding-bottom: 20px; color: white"  hint="Buscar Startup"
                           v-model="searchQuery"
                           @submit="onTextChanged"/>
            </StackLayout>
        </ActionBar>

        <StackLayout>

            <ListView class="list-group" for="entity in data" @itemTap="goToDetail"
                      style="height:1250px; padding-top: 20">
                <v-template>
                    <FlexboxLayout flexDirection="row" class="list-group-item">
                        <Image src="~/assets/images/brain.png" class="thumb img-circle" />

                        <StackLayout style="width: 60%">
                            <Label class="block" :text="entity.gsx$nombre.$t"  textWrap="true"   />
                            <Label class="inline" :text="'Sector: '+entity.gsx$industria.$t"  textWrap="true" />
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
    import axios from "axios";

    export default {
        data() {
            return {
                isItemVisible: false,
                search: '',
                data: [],
                entities: [
                    { name: 'Entity 1' , country: 'Peru', sector: 'Minero', favorite: true},
                    { name: 'Entity 2' , country: 'Peru', sector: 'Minero', favorite: true},
                    { name: 'Entity 3' , country: 'Peru', sector: 'Minero', favorite: false},
                    { name: 'Entity 4' , country: 'Peru', sector: 'Minero', favorite: false},
                    { name: 'Entity 5' , country: 'Peru', sector: 'Minero', favorite: false},
                    { name: 'Entity 6' , country: 'Peru', sector: 'Minero', favorite: true},
                ]
            }
        },
        mounted() {
            axios.get('https://spreadsheets.google.com/feeds/list/1s8yMnY-Ks6SG-agOWSpd5wnlZyXdENWW2xZ3ABCowho/1/public/values?alt=json')
                .then(response => {
                    this.data = response.data.feed.entry;

                    console.log(this.data)
                })
        },
        methods: {
            goToDetail: function(args) {
                this.$navigateTo(Detail, {
                    props: {
                        entity: args.item
                    }
                })
            },
            addToFavorites (args) {
                alert(args.name)
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

<style scoped>
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
