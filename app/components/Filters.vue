<template>
    <Page class="page">
        <StackLayout style="width: 100%; height: 100%;">
            <Label class="filter-header" text="Filtrar por país"></Label>

            <StackLayout>
                <CheckBox :text="country.name" id="myCheckbox"
                          v-for="(country, index) in countries"
                          :key="index"
                          v-model="filters.sector"
                          @checkedChange="selected(country.name) "/>
            </StackLayout>

            <Label class="filter-header" text="Filtrar por industria"></Label>

            <StackLayout>
                <CheckBox :text="sector.name" id="myCheckbox"
                          v-for="(sector, index) in sectors"
                          :key="index"
                          @checkedChange="selectedSector(sector.name) "/>
            </StackLayout>

            <button class="btn btn-sm btn-primary" @tap="$modal.close" text="Volver"></button>
            <button class="btn btn-sm btn-primary" @tap="applyFilter" text="Aplicar filtros"></button>

        </StackLayout>
    </Page>
</template>

<script>

    import Filtered from "./Filtered";
    import Filters from './Filters';

    export default {
        name: "Filters",
        data() {
            return {
                filters: {
                    country: '',
                    sector: ''
                },
                countries: [
                    {id: 1, name: 'Brasil'},
                    {id: 2, name: 'Noruega'},
                    {id: 3, name: 'Estados Unidos'},
                    {id: 4, name: 'Chile'},
                ],
                sectors: [
                    {id: 1, name: 'Tecnología'},
                    {id: 2, name: 'Transporte'},
                    {id: 3, name: 'Pinturas'},
                    {id: 4, name: 'Cementos'}
                ]
            }
        },
        methods: {
            selected(args) {
                this.$store.commit('SET_FILTER_VALUE', {country: args, sector: this.$store.state.filters.sector})
            },
            selectedSector(args) {
                this.$store.commit('SET_FILTER_VALUE', {country: this.$store.state.filters.country, sector: args})
            },
            applyFilter() {
                // console.dir('filtros', this.$store.state.filters)
                this.$store.commit('SET_FILTERS', {country: this.$store.state.filters.country});
                this.$modal.close(Filters);
                this.$navigateTo(Filtered)
            }
        }
    }
</script>

<style scoped>
    .filter-header {
        background-color: #333333;
        color: white;
        padding-left: 10;
        font-size: 15;
    }
</style>