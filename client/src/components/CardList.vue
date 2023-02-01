<template>
  <div class="cards-container">
    <Card
      v-for="item in items"
      class="card-container"
      :key="item"
      :title="item.title"
      :points="item.points"
      :url="item.url"
    />
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "CardList",
  components: { Card },
  data() {
    return {
      items: [
        {
          title: "Annual Leave",
          points: [
            "9 days left to take",
            "4 sick days taken",
            "8 days of upcoming annual leave",
          ],
          url: "/annual-leave",
        },
        {
          title: "Benefits",
          points: ["Gym memberhip", "Health Insurance", "Wellbeing centre"],
          url: "/benefits",
        },
        {
          title: "Payroll",
          points: ["Payslips", "Tax", "Contact Payroll"],
          url: "/payroll",
        },
        {
          title: "Pension",
          points: ["Pension paid so far", "Change Pension Contribution"],
          url: "/pension",
        },
      ],
    };
  },
};
</script>

<style>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  background: linear-gradient(#141e30, #243b55);
  column-gap: 100px;
  min-height: 95vh;
  align-items: start;
}

.cards-container:hover .card {
  opacity: 0.5;
}

@media (max-width: 500px) {
  .cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
