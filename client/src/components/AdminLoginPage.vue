<template>
     <div>
          <div class="container">
                <h3>Admin Login</h3>
                <div class="account-box">
                    <div class="account-wrapper ">
                       
                        <form @submit.prevent="login">
                            <div class="form-group form-focus">
                                <label class="control-label">Email</label>
                                <input class="form-control floating" type="text" v-model="email">
                            </div>
                            <div class="form-group form-focus">
                                <label class="control-label">Password</label>
                                <input class="form-control floating" type="password" v-model="password">
                            </div>
                            <div class="form-group text-center mt-2">
                                <button class="btn btn-primary btn-block account-btn" type="submit"><router-link to="/AdminHome" style="text-decoration: none; color: white;">Login</router-link> <i v-if="loading" class="fa fa-refresh fa-spin fa-fw"></i></button>
                            </div>
                            <div class="text-center">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  
</template>
<script>

    export default{
        data () {
            return {
                email : "",
                password : "",
                loading : false
            }
        },
       
        methods : {
            login() {
                this.loading = true;
                // var data = {
                //     email : this.email,
                //     password : this.password
                // }
            }
        },
        components: {
        // LoginPage,
       
        } 
}

                
//                        
</script>
<style>
    div.form
{
    display: block;
    text-align: center;
}
form
{
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    width: 500px;
}
</style>