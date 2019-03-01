<template>
    <Page actionBarHidden="true">
        <StackLayout style="margin: 20px 10px 0 10px;">
            <Label class="login-title" horizontalAlignment="center" height="100" text="Bienvenido a StartUp Finder" textWrap="true"></Label>

            <StackLayout class="input-field">
                <TextField hint="Ingresar email" autocorrect="false" class="input input-border" v-model="form.email"></TextField>
                <Label class="h3 text-center" text="Username"></Label>
            </StackLayout>

            <StackLayout class="input-field">
                <TextField hint="Ingresar contraseña" autocorrect="false" class="input input-border" v-model="form.password"></TextField>
                <Label class="h3 text-center" text="Password"></Label>
            </StackLayout>

            <Button class="btn btn-primary btn-rounded-lg " text="INGRESAR"  @tap="login"/>
        </StackLayout>
    </Page>
</template>

<script>
    import Home from './App'
    import axios from 'axios'

    export default {
        name: "Login",
        data() {
            return {
                errors: [],
                form: {
                    email: 'elio@mail.com',
                    password: '123123'
                }
            }
        },
        methods: {
            login() {
                // axios.post('https://lacalera.pappstest.com/api/v1/login',{
                axios.post('https://lacalera.pappstest.com/api/v1/login',{
                    document_number: this.form.email,
                    password: this.form.password
                },
                    {
                        headers: { "Content-Type": "application/json" }
                    })
                    .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                            this.$navigateTo(Home)
                        }
                    }).catch((err)=>{
                        alert({
                            title: "Ops!",
                            message: "Credenciales incorrectas",
                            okButtonText: "Volver"
                        })
                    })

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