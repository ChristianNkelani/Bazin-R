import { defineStore } from "pinia";

export const QcmStore = defineStore("qcms", {
  state: () => ({
    etat: "un",
    currentPage: 0,
    card: 1,
    score1: 0,
  }),
  actions: {
    cliquer() {
      this.etat = this.etat === "un" ? "deux" : "un";
    },
  },
});
