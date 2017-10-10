<template>
    <div class="login-container" :style="containerStyle">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
            <h3 class="title">管理系统</h3>
            <div class="triangle-up"></div>
            <div class="login-bar">
                <el-form-item prop="username">
                    <span class="svg-container">
                        <icon-svg icon-class="yonghudenglu"></icon-svg>
                    </span>
                    <i class="line"></i>
                    <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <icon-svg icon-class="mimadenglu"></icon-svg>
                    </span>
                    <i class="line"></i>
                    <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" :loading="loading" @click.native.prevent="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
    import loginBg from '@/assets/images/loginBg.png'

    export default {
        name: 'login',

        data() {
            return {
                containerStyle: {
                    'background-image': 'url(' + loginBg + ')',
                    'background-size': 'cover'
                },
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                loading: false
            }
        },

        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('Login', this.loginForm).then(() => {
                            this.loading = false
                            this.$router.push({ path: '/' })
                        }).catch(err => {
                            this.loading = false
                        });
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "src/styles/mixin.scss";
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 5px;
    }

    .login-container {
        @include relative;
        height: 100vh;
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
            -webkit-text-fill-color: #666 !important;
        }
        input::-webkit-input-placeholder {
            color: #999;
        }
        input::-moz-placeholder {
            color: #999;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 10px;
            color: #666;
            height: 48px;
        }
        .el-input {
            display: inline-block;
            height: 48px;
            width: 85%;
            font-size: 20px;
        }
        .svg-container {
            padding: 6px 10px 6px 15px;
            color: #999;
            font-size: 20px;
            display: inline-block;
            float: left;
            .svg-icon {
                margin: 0;
                width: 20px;
                height: 20px;
                margin-top: 8px
            }
        }
        .title {
            font-size: 40px;
            font-weight: 500;
            color: #fff;
            margin: 0px auto 40px auto;
            text-align: center;
        }
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 500px;
            margin: 220px auto 0;
        }
        .triangle-up {
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-bottom: 30px solid rgba(255, 255, 255, 0.1);
            margin: 0 auto;
        }
        .login-bar {
            padding: 40px 50px 18px 50px;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.1);
        }
        .el-form-item {
            background: #fff;
            border-radius: 5px;
            color: #999;
        }
        .line {
            width: 1px;
            background: #999;
            display: inline-block;
            height: 13px;
        }
        .login-btn {
            width: 100%;
            height: 48px;
            font-size: 20px;
            background: linear-gradient(to right, #34bceb, #2179e4);
            border: none;
        }
        .forget-pwd {
            color: #fff;
        }
    }
</style>