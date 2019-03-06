<template>
    <Page actionBarHidden="true" class="page">
        <StackLayout class="form">
            <Label class="login-title" horizontalAlignment="center" height="100" text="Bienvenido a StartUp Finder" textWrap="true"></Label>

            <StackLayout class="input-field">
                <TextField hint="Ingresar número de documento" keyboardType="number" autocorrect="false"  v-model="form.email"></TextField>
                <!--<Label class="h3 text-center" text=""></Label>-->
            </StackLayout>

            <StackLayout class="input-field">
                <TextField secure="true" hint="Ingresar contraseña" autocorrect="false" autocapitalizationType="none" v-model="form.password"></TextField>
                <!--<Label class="h3 text-center" text="Password"></Label>-->
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
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                axios.post('https://lacalera.pappstest.com/api/v1/login',{
                    document_number: this.form.email,
                    password: this.form.password
                },
                    {
                        headers: { "Content-Type": "application/json" }
                    })
                    .then((response) => {
                        // console.log(response.status);
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
    .page {
        align-items: center;
        flex-direction: column;
        background-color: beige;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .btn-primary {
        background-color: indianred;
        font-weight: bold;
    }

    .login-title {
        text-align: center;
        font-size: 35px;
        font-weight: bold;
    }
</style>