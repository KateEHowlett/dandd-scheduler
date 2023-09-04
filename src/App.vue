<script>
export default {
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
};
</script>

<template>
  <div id="app">
    <h1>D&D Scheduler</h1>
    <div id="scheduling">
      <div id="addAPlayer">
        <p>Put in your name below</p>
        <input
          id="inputPlayer"
          v-model="playerName"
          v-on:keydown.enter="createPlayer"
        /><button id="submitButton" v-on:click="createPlayer">
          Add Player
        </button>
      </div>
      <div id="choosePlayer">
        <p>Select your name from the list and update your availability</p>
        <p>
          <select v-model="selected">
            <option v-for="player in players">{{ player.name }}</option>
          </select>
        </p>
      </div>
      <div id="availability">
        <div id="submitDates">
          <div id="day" v-for="day in daysOfTheWeek">
            <table>
              <th>{{ day.name }}</th>
              <tr>
                <td>
                  <input
                    :name="day.name"
                    id="day.available"
                    v-model="day.available"
                    value="true"
                    :disabled="!selected"
                    type="radio"
                  />Available
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    :name="day.name"
                    id="day.tentative"
                    v-model="day.tentative"
                    value="true"
                    :disabled="!selected"
                    type="radio"
                  />Tentative
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    :name="day.name"
                    id="day.busy"
                    v-model="day.busy"
                    value="true"
                    :disabled="!selected"
                    type="radio"
                  />Busy
                </td>
              </tr>
            </table>
          </div>
        </div>
        <button id="submitButton" v-on:click="submitAvailability">
          Submit
        </button>
      </div>
      <div id="checkAvailability">
        <p>Click below to display all player availability</p>
        <button id="submitButton" v-on:click="checkAvailability">
          Check Availability
        </button>
        <div id="availability" v-show="checkSchedule">
          <div
            id="displayPlayers"
            v-for="(player, number) in players"
            ref="individuals"
          >
            <!-- Where 'availability' is the 'value' e.g. 'tentative' and 'day' is the 'key' e.g. 'Monday0' -->
            <div
              id="displayAvailability"
              v-for="(availability, day, index) in player"
              :key="player.name + index"
              ref="days"
            >
              <div
                :id="'listItem' + index + 1"
                :class="{
                  available: availability === 'available',
                  tentative: availability === 'tentative',
                  busy: availability === 'busy',
                  session: availability === 'session',
                  unknown: availability === 'Unknown',
                }"
                :key="index"
              >
                <select
                  id="availabilityOptions"
                  @change="updateColour($event, index, player, number)"
                >
                  <option>{{ availability }}</option>
                  <option v-model="selection">Available</option>
                  <option v-model="selection">Busy</option>
                  <option v-model="selection">Tentative</option>
                  <option v-model="selection">Session</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
