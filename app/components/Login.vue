<template>
    <Page actionBarHidden="true">
        <StackLayout style="margin: 20px 10px 0 10px;">
            <Label class="login-title" horizontalAlignment="center" height="100" text="Bienvenido a StartUp Finder" textWrap="true"></Label>

            <StackLayout class="input-field">
                <TextField hint="Ingresar usuario" autocorrect="false" class="input input-border"></TextField>
                <Label class="h3 text-center" text="Username"></Label>
            </StackLayout>

            <StackLayout class="input-field">
                <TextField hint="Ingresar contraseña" autocorrect="false" class="input input-border"></TextField>
                <Label class="h3 text-center" text="Password"></Label>
            </StackLayout>

            <Button class="btn btn-primary btn-rounded-lg " text="INGRESAR"  @tap="login"/>
        </StackLayout>
    </Page>
</template>

<script>
    import Home from './App'

    export default {
        name: "Login",
        data() {
            return {
                errors: []
            }
        },
        methods: {
            login() {
                this.$navigateTo(Home)
            }
        }
    }
</script>

<style scoped>
    .login-title {
        font-size: 20px;
        font-weight: bold;
    }
</style>