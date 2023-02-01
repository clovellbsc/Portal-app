<template>
  <main class="login-body">
    <transition name="flip">
      <div class="login-box" v-if="currentForm === 'login'">
        <h2>Login</h2>
        <form @submit.prevent>
          <div class="user-box">
            <input v-model="email" type="text" name="username" required />
            <label>Email</label>
          </div>
          <div class="user-box">
            <input
              v-model="password"
              type="password"
              name="password"
              required
            />
            <label>Password</label>
          </div>
          <button @click="signIn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
        <p>Not Signed Up? <span @click="toggleForm">Sign Up</span></p>
      </div>
      <div class="login-box" v-else>
        <h2>Sign Up</h2>
        <form @submit.prevent>
          <div class="user-box">
            <input v-model="email" type="text" name="email" />
            <label>Email</label>
          </div>
          <div class="user-box">
            <input v-model="password" type="password" name="password" />
            <label>Password</label>
          </div>
          <div class="user-box">
            <input
              v-model="confirmPassword"
              type="password"
              name="confirm password"
            />
            <label>Confirm Password</label>
          </div>
          <button @click="signUp">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
        <p>Already Signed Up? <span @click="toggleForm">Sign In</span></p>
      </div></transition
    >
  </main>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "HomeView",
  data() {
    return {
      currentForm: "login",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    toggleForm() {
      this.currentForm = this.currentForm === "login" ? "register" : "login";
    },
    checkRequiredFields() {
      if (
        this.email === "" ||
        this.password === "" ||
        this.confirmPassword === ""
      ) {
        alert("You must fill in all required fields");
        return false;
      }
      return true;
    },
    checkPasswordMatch() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return false;
      }
      return true;
    },
    checkPasswordStrength() {
      if (
        !this.password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
      ) {
        alert(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
        );
        return false;
      }
      return true;
    },
    async signUp() {
      // Check if all required fields are filled
      this.checkRequiredFields();

      // Check if passwords match
      this.checkPasswordMatch();

      // Check if password meets requirements
      this.checkPasswordStrength();

      try {
        // AWS signUp method to attempt to sign up
        await Auth.signUp({
          username: this.email,
          password: this.password,
          attributes: {
            email: this.email,
          },
        });

        // reset field values
        this.email = "";
        this.password = "";
        this.confirmPassword = "";

        // navigate to validateEmail route
        this.$router.push({ name: "validateEmail" });
      } catch (err) {
        // If the email address is already in use raise an alert
        if (err.code === "UsernameExistsException") {
          alert("Username already exists");
        }
        console.log(err);
      }
    },
    async signIn() {
      if (this.email === "" || this.password === "") {
        alert("You must fill in all required fields");
        return;
      }
      try {
        await Auth.signIn({ username: this.email, password: this.password });
        this.email = "";
        this.password = "";
        this.$router.push({ name: "dashboard" });
      } catch (err) {
        if (err.code === "UserNotConfirmedException") {
          alert("Please confirm your email before signing in");
          this.$router.push({ name: "validateEmail" });
        } else if (err.code === "UserNotFoundException") {
          alert("This user does not exist");
        } else if (err.code === "NotAuthorizedException") {
          alert("Incorrect email or password");
        }
        console.log(err);
      }
    },
  },
};
</script>

<style>
main > .login-body {
  position: relative;
  height: 90vh;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: #0d1520;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 15px 25px #0f1824;
  text-align: center;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #03e9f4;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-body form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.login-box form button {
  background: #0d1520;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  border: none;
}

.login-box form button:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box button span {
  position: absolute;
  display: block;
}

.login-box p span:hover {
  cursor: pointer;
}

.login-box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 2s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 2s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 2s linear infinite;
  animation-delay: 1s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 2s linear infinite;
  animation-delay: 1.5s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}

.login-box p {
  color: #03e8f481;
  margin-top: 15px;
}

.login-box p span {
  color: #03e9f4;
}

.flip-enter-active,
.flip-leave-active {
  transition: all 0.5s;
}
.flip-enter-from,
.flip-leave-from {
  transform: translate(-50%, -50%) rotateY(-90deg);
}
</style>
