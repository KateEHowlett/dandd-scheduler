var scheduler = new Vue({
  el: "#scheduling",
  data() {
    return {
      players: [],
      week: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      playerName: "",
      daysOfTheWeek: [
        { name: "Monday", Available: false, Tentative: false, Busy: false },
        { name: "Tuesday", Available: false, Tentative: false, Busy: false },
        { name: "Wednesday", Available: false, Tentative: false, Busy: false },
        { name: "Thursday", Available: false, Tentative: false, Busy: false },
        { name: "Friday", Available: false, Tentative: false, Busy: false },
        { name: "Saturday", Available: false, Tentative: false, Busy: false },
        { name: "Sunday", Available: false, Tentative: false, Busy: false },
      ],
      selected: "",
      available: false,
      tentative: false,
      busy: false,
      playerAvailability: {},
      checkSchedule: false,
      selection: "",
      updateDay: "",
    };
  },
  methods: {
    createPlayer() {
      console.log("Create Player");
      if (this.playerName != "") {
        let newPlayer = { name: this.playerName };
        this.players.push(newPlayer);
        for (let i = 0; i <= 2; i++) {
          for (let j = 0; j < this.daysOfTheWeek.length; j++) {
            newPlayer[this.daysOfTheWeek[j].name + [i + j]] = "Unknown";
          }
        }
      }
      this.playerName = "";
    },
    submitAvailability() {
      console.log("submitAvailability");
      if (this.selected != "") {
        for (let player of this.players) {
          if (player.name === this.selected) {
            console.log(player.name);
            for (let j = 0; j <= 2; j++) {
              console.log("Round " + j);
              for (let i = 0; i < this.daysOfTheWeek.length; i++) {
                //Monday, Tuesday, Wednesday etc.
                for (let key in this.daysOfTheWeek[i]) {
                  if (this.daysOfTheWeek[i][key] == "true") {
                    console.log(
                      "wtf " + this.daysOfTheWeek[i].name + " " + key
                    );
                    player[this.daysOfTheWeek[i].name + [i + j]] = key;
                  }
                }
              }
            }
          }
        }
        this.checkSchedule = false;
        this.selection = "";
      } else {
        alert("Please select a player!");
      }
    },
    checkAvailability() {
      console.log("Check Availability");
      if (this.players.length != 0) {
        for (let player of this.players) {
          if (player.name === this.selected) {
            console.log(player);
            for (let key in player) {
              console.log(player[key]);
            }
          }
        }
        this.checkSchedule = true;
      }
    },
    updateColour(event, index, player, number) {
      let availabilityType = event.target.value;
      for (let i = 0; i < this.$refs.individuals.length; i++) {
        if (i === number) {
          if (availabilityType == "Available") {
            console.log("I is: " + i + " and Index is: " + index);
            console.log("Individuals: " + this.$refs.individuals[i]);
            console.log("Index: " + this.$refs.days[index]);
            console.log(
              "Individuals/Index: " +
                this.$refs.individuals[i].$refs.days[index]
            );
            this.$refs.individuals[i].$refs.days[index].classList.remove(
              "unknown",
              "busy",
              "tentative",
              "session"
            );
            this.$refs.days[index].classList.add("available");
          } else if (availabilityType == "Busy") {
            this.$refs.days[index].classList.remove(
              "unknown",
              "available",
              "tentative",
              "session"
            );
            this.$refs.days[index].classList.add("busy");
          } else if (availabilityType == "Tentative") {
            this.$refs.days[index].classList.remove(
              "unknown",
              "busy",
              "available",
              "session"
            );
            this.$refs.days[index].classList.add("tentative");
          } else if (availabilityType == "Session") {
            this.$refs.days[index].classList.remove(
              "unknown",
              "busy",
              "tentative",
              "available"
            );
            this.$refs.days[index].classList.add("session");
          } else if (availabilityType == "Unknown") {
            this.$refs.days[index].classList.remove(
              "available",
              "busy",
              "tentative",
              "session"
            );
            this.$refs.days[index].classList.add("unknown");
          } else {
            this.$refs.days[index].classList.remove(
              "available",
              "busy",
              "tentative",
              "session",
              "unknown"
            );
          }
        }
      }
      console.log(index);
      console.log(player.name);
      console.log(number);
    },
  },
});
