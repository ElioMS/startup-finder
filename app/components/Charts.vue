<template>
    <Page>
        <ActionBar class="action-bar" title="Gráficos">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>

        <TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
            <TabViewItem title="Por País">
                <GridLayout rows="*" height="1000px">
                    <RadCartesianChart>
                        <BarSeries v-tkCartesianSeries
                                   categoryProperty="Country"
                                   valueProperty="Amount"
                                   :items="countryValues" />
                        <CategoricalAxis v-tkCartesianHorizontalAxis />
                        <LinearAxis v-tkCartesianVerticalAxis />
                    </RadCartesianChart>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Por tipo solución">
                <RadPieChart height="300" allowAnimation="true" row="0">
                    <PieSeries v-tkPieSeries
                               selectionMode="DataPoint"
                               expandRadius="0.4"
                               outerRadiusFactor="0.7"
                               valueProperty="Amount"
                               legendLabel="Solution"
                               :items="solutionValues" />
                    <RadLegendView v-tkPieLegend position="Right" title="Soluciones" offsetOrigin="TopRight" width="110" enableSelection="true">
                        <Label text="A"></Label>
                    </RadLegendView>
                </RadPieChart>
            </TabViewItem>

            <!--<TabViewItem title="Por industria">-->
                <!--<RadCartesianChart>-->
                    <!--<ScatterSeries v-tkCartesianSeries :items="itemsScatter" xProperty="Age" yProperty="Salary" bubbleSizeProperty="Impact"></ScatterSeries>-->
                    <!--<ScatterSeries v-tkCartesianSeries :items="itemsScatter" xProperty="Age" yProperty="Spendings" bubbleSizeProperty="Impact"></ScatterSeries>-->
                    <!--<ScatterSeries v-tkCartesianSeries :items="itemsScatter" xProperty="Age" yProperty="Savings" bubbleSizeProperty="Impact"></ScatterSeries>-->
                    <!--<LinearAxis v-tkCartesianHorizontalAxis></LinearAxis>-->
                    <!--<LinearAxis v-tkCartesianVerticalAxis></LinearAxis>-->
                <!--</RadCartesianChart>-->
            <!--</TabViewItem>-->
        </TabView>


    </Page>
</template>

<script>
    import { ObservableArray } from 'tns-core-modules/data/observable-array'

    export default {
        name: "Charts",
        computed: {
            countryValues() {
                const values = this.$store.getters.GET_BY_COUNTRY;
                return new ObservableArray(values.data)
            },
            solutionValues() {
                const values = this.$store.getters.GET_BY_SOLUTION;
                return new ObservableArray(values);
            }
        }
    };
</script>

<style scoped>

</style>