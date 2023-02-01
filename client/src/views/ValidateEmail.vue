<template>
  <main class="login-body">
    <div class="login-box">
      <h2>Login</h2>
      <p>
        Please verify your email, you should have received a verification code
      </p>
      <form @submit.prevent>
        <div class="user-box">
          <input v-model="email" type="text" name="email" required />
          <label>Email</label>
        </div>
        <div class="user-box">
          <input
            v-model="validationKey"
            type="text"
            name="validationKey"
            required
          />
          <label>Verification Code</label>
        </div>
        <button @click="validateEmail">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "ValidateEmail",
  data() {
    return {
      email: "",
      validationKey: "",
    };
  },
  methods: {
    async validateEmail() {
      try {
        await Auth.confirmSignUp(this.email, this.validationKey);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.login-body > .login-box > p {
  padding-bottom: 15px;
}
</style>
