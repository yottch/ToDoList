<template>
  <div class="account">
    <button class="accountButton" @click="showAccount = !showAccount">
      Login<i class="fas fa-caret-down" aria-hidden="true"></i>
    </button>
    <form class="dropAccount" v-show="showAccount" ref="formLogin">
      <div class="dropAccount_name" v-show="user">
        Welcome, You signed as:<span> {{ user }}</span>
      </div>
      <div class="dropAccount_message" v-show="message">
        {{ message }}
      </div>
      <label class="dropAccount_label" for="login">login</label>
      <input name="login" type="text" v-model="login" />
      <label class="dropAccount_label" for="password">password</label>
      <input name="password" type="text" v-model="password" />
      <div class="dropAccount_buttons">
        <button
          class="accountButton"
          name="login"
          @click.prevent="loginRequest($event)"
        >
          Sign in
        </button>
        <button
          class="accountButton"
          name="register"
          @click.prevent="loginRequest($event)"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAccount: false,
      login: "",
      password: "",
      user: "",
      message: "",
    };
  },
  async mounted() {
    this.message = "";
    this.user = "";
    try {
      const response = await this.$store.dispatch("getUser");
      if (response.result) {
        this.user = response.result.login;
      } else {
        this.message = response.message;
      }
    } catch (err) {
      this.message = "Error occurred while logging in";
      console.log(err);
    }
  },
  methods: {
    async loginRequest(event) {
      this.message = "";
      try {
        if (this.login && this.password) {
          const data = {
            login: this.login,
            password: this.password,
            action: event.target.name,
          };
          const result = await this.$store.dispatch("login", data);
          if (result.user) {
            this.user = result.user.login;
            this.$refs.formLogin.submit();
          }
          if (result.message) {
            this.message = result.message;
          }
        } else {
          this.message = "Please enter login and password";
        }
      } catch (err) {
        this.message = "Error occurred while logging in";
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="scss">
$mainColor: rgb(0, 172, 163);
.account {
  display: flex;
  justify-content: flex-end;
}
.accountButton {
  width: 130px;
  height: 38px;
  background-color: $mainColor;
  font-size: 15px;
  line-height: 32px;
  font-weight: 700;
  letter-spacing: 0.025em;
  color: #ffffff;
  border: 1px solid;
  outline: none !important;
  cursor: pointer;
  &:hover {
    color: $mainColor;
    background-color: #ffffff;
  }
  i {
    margin-left: 8px;
  }
}
.dropAccount {
  width: 20rem;
  border: 0.1rem solid #e9e9e9;
  background-color: #ffffff;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5rem;
  right: 10px;
  z-index: 10001;
  padding: 2rem 1.5rem;
  transition: 0.6s;
  transition-delay: 0.2s;
  box-shadow: 0.1rem 0.2rem 0.3rem 0 rgba(0, 0, 0, 0.16);
  &::after {
    content: "";
    position: absolute;
    left: 80%;
    top: -0.7rem;
    border-right: 0.8rem solid transparent;
    border-left: 0.8rem solid transparent;
    border-bottom: 0.8rem solid #ffffff;
  }
  &::before {
    content: "";
    position: absolute;
    left: 80%;
    top: -0.8rem;
    border-right: 0.8rem solid transparent;
    border-left: 0.8rem solid transparent;
    border-bottom: 0.8rem solid #e9e9e9;
  }
  .dropAccount_label {
    width: 8rem;
  }
  input {
    margin-bottom: 20px;
  }
  .dropAccount_buttons {
    display: flex;
    justify-content: space-between;
  }
  .dropAccount_message {
    margin-bottom: 10px;
    color: $mainColor;
    font-weight: 700;
  }
  .dropAccount_name {
    margin-bottom: 10px;
    span {
      margin-left: 5px;
      color: $mainColor;
      font-weight: 700;
    }
  }
}
</style>
