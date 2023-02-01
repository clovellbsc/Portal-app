<template>
  <header>
    <nav class="navbar">
      <router-link @click="closeMenu" to="/" class="nav-branding"
        >Portal</router-link
      >
      <ul :class="[menuIsOpen ? 'active' : '', 'nav-menu']" v-show="isSignedIn">
        <li @click="toggleMenu" class="nav-item">
          <router-link to="/pensions" class="nav-link">Pensions</router-link>
        </li>
        <li @click="toggleMenu" class="nav-item">
          <router-link to="/benefits" class="nav-link">Benefits</router-link>
        </li>
        <li @click="toggleMenu" class="nav-item">
          <router-link to="/annual-leave" class="nav-link"
            >Annual Leave</router-link
          >
        </li>
        <li @click="signOut" class="nav-item">
          <router-link to="/" class="nav-link">Sign Out</router-link>
        </li>
      </ul>
      <div
        @click="toggleMenu"
        :class="[menuIsOpen ? 'active' : '', 'hamburger']"
        v-show="isSignedIn"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
  </header>
  <div :class="[menuIsOpen ? 'pushed' : 'static']"></div>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  name: "NavBar",
  data() {
    return {
      menuIsOpen: false,
      isSignedIn: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    closeMenu() {
      this.menuIsOpen = false;
    },
    async signOut() {
      try {
        await Auth.signOut();
        // navigate to the login page or another route
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    async isAuthenticated() {
      try {
        await Auth.currentAuthenticatedUser();

        this.isSignedIn = true;
      } catch {
        this.isSignedIn = false;
      }
    },
  },
  async mounted() {
    await this.isAuthenticated();
  },
};
</script>

<style>
header {
  height: auto;
  background-color: #0d1520;
}

li {
  list-style: none;
}

a {
  color: white;
  text-decoration: none;
}

.navbar {
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.nav-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 60px;
}

.nav-branding {
  font-size: 2rem;
  color: #03e9f4;
}

.nav-branding:hover {
  text-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.nav-link {
  transition: 0.7s ease;
  color: #03e9f4;
}

.nav-link:hover {
  text-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.hamburger {
  display: none;
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  transition: all 0.3s ease-in-out;
  background-color: #03e9f4;
}

.hamburger:hover .bar {
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

@media (max-width: 768px) {
  .static {
    transition: all 0.5s ease-in-out;
    padding-top: 0;
    z-index: 0;
    background-color: #151f31;
  }

  .pushed {
    padding-top: 168px;
    transition: padding 0.3s ease-in-out;
    transition-delay: 0.2;
    z-index: 0;
    background-color: #151f31;
  }
  .hamburger {
    display: block;
  }

  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .nav-menu {
    position: fixed;
    left: 100%;
    top: 70px;
    gap: 0;
    flex-direction: column;
    background-color: #0d1520;
    width: 100%;
    text-align: center;
    transition: 0.5s;
  }

  .nav-item {
    margin: 16px 0;
  }

  .nav-menu.active {
    z-index: 1;
    left: 0;
  }
}
</style>
