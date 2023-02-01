<template>
  <div class="body">
    <div class="container">
      <div class="dark">
        <div class="face face1">
          <h3>{{ title }}</h3>
        </div>
        <div class="face face2">
          <div class="content">
            <p v-for="point in points" :key="point" class="points">
              {{ point }}
            </p>
            <button @click="redirect">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardVue",
  props: {
    title: {
      type: String,
      required: true,
    },
    points: {
      type: Array,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  methods: {
    redirect() {
      this.$router.push(this.url);
    },
  },
};
</script>

<style>
.body {
  display: flex;
  margin: 50px;
  padding: 0;
  background: transparent;
  justify-content: center;
  align-items: center;
  font-family: arial;
}
.body > .container {
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.dark:hover .face {
  transform: translateY(0);
}
.dark:hover .face h3 {
  text-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}
.face {
  width: 300px;
  height: 200px;
  transition: 0.7s;
}
.face1 {
  font-family: Blanka;
  color: #03e9f4;
  position: relative;
  background: #0d1520;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  z-index: 1;
  transform: translateY(100px);
}

.face1 > img {
  width: 100%;
  height: 100%;
}

.face.face1 .content {
  transition: 0.5s;
  text-align: center;
}
.face.face1 .content .h3 {
  font-size: 1em;
  text-align: center;
}
.face.face1 .content .a {
  transition: 0.5s;
}
.face.face2 {
  position: relative;
  background: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  transform: translateY(-100px);
}
.face2 button {
  background: #0d1520;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 10px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 1px;
  border: none;
}

.face2 > .content > .points {
  color: #0d1520;
  font-family: Blanka;
}

.face2 button:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 2px #03e9f4, 0 0 10px #03e9f4, 0 0 20px #03e9f4,
    0 0 100px #03e9f4;
  cursor: pointer;
}

.face2 button span {
  position: absolute;
  display: block;
}

.face2 button span:nth-child(1) {
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

.face2 button span:nth-child(2) {
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

.face2 button span:nth-child(3) {
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

.face2 button span:nth-child(4) {
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
</style>
