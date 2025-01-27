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
    reinitialiser(){
      location.reload();
      this.etat = 'un';
      this.currentPage = 0;
      this.card = 1;
      this.score1 = 0;
    }
  },

});
