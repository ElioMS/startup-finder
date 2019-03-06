<template>
    <Page class="page">
        <ScrollView orientation="vertical" isScrollEnabled="scrollEnabled">
        <StackLayout style="width: 100%;">
            <StackLayout>
                <Label class="filter-header" text="Filtrar por país"></Label>
                <CheckBox :text="country.name" id="myCheckbox"
                          v-for="(country, index) in countries"
                          :key="index"
                          :checked="$store.state.filters.country === country.name"
                          @checkedChange="selected(country.name) "/>
            </StackLayout>

            <StackLayout>
                <Label class="filter-header" text="Filtrar por industria"></Label>
                <CheckBox :text="sector.name" id="myCheckbox"
                          v-for="(sector, index) in sectors"
                          :key="index"
                          :checked="$store.state.filters.sector === sector.name"
                          @checkedChange="selectedSector(sector.name) "/>
            </StackLayout>

            <StackLayout v-if="$store.state.filters.country &&  $store.state.filters.sector">
                <Label class="filter-header" text="Filtrar por tipo de solución" v-if="$store.state.filters.country &&  $store.state.filters.sector"></Label>

                <CheckBox :text="solution.name" id="myCheckbox"
                          v-for="(solution, index) in solutions"
                          :key="index"
                          :checked="$store.state.filters.solution === solution.name"
                          @checkedChange="selectedSolution(solution.name) "/>
            </StackLayout>

            <GridLayout columns="140, 140" rows="70">
                <Button class="btn btn-sm btn-primary" @tap="$modal.close"  row="0" col="0" text="Volver"></Button>
                <Button class="btn btn-sm btn-primary" @tap="applyFilter" row="0" col="1" text="Filtrar"></Button>
            </GridLayout>

        </StackLayout>
        </ScrollView>
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
                    {id: 5, name: 'Peru'},
                ],
                sectors: [
                    {id: 1, name: 'Tecnología'},
                    {id: 2, name: 'Transporte'},
                    {id: 3, name: 'Pinturas'},
                    {id: 4, name: 'Cementos'},
                    {id: 5, name: 'Minería'},
                    {id: 6, name: 'Pesca'}
                ],
                solutions: [
                    {id: 1, name: 'BI'},
                    {id: 2, name: 'Producto'},
                    {id: 3, name: 'Plataforma'},
                    {id: 4, name: 'IoT'},
                    {id: 5, name: 'Drone'},
                ]
            }
        },
        methods: {
            selected(args) {
                if (args === this.$store.state.filters.country) {
                    args = ""
                }
                this.$store.commit('SET_FILTER_VALUE', {country: args, sector: this.$store.state.filters.sector, solution: ''})
            },
            selectedSector(args) {
                if (args === this.$store.state.filters.sector) {
                    args = ""
                }
                this.$store.commit('SET_FILTER_VALUE', {country: this.$store.state.filters.country, sector: args, solution: ''})
            },
            selectedSolution(args) {
                let country = this.$store.state.filters.country,
                    sector = this.$store.state.filters.sector;

                this.$store.commit('SET_FILTER_VALUE', {country: country, sector: sector, solution: args });
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
        text-align: center;
    }

    .btn-sm {
        width: 50%;
        height: 30%;
        font-size: 12;
        display: inline !important;
    }
</style>