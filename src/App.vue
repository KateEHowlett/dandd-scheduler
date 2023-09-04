<script>
import { nanoid } from "nanoid";

export default {
  data() {
    return {
      players: [],
      playerName: "",
      checkSchedule: false,
      selected: "",
    };
  },

  computed: {
    activePlayer() {
      return this.players.find((player) => player.name === this.selected);
    },
  },

  methods: {
    createPlayer() {
      if (!this.playerName.trim()) return;
      console.log("Create Player");

      let newPlayer = {
        id: nanoid(),
        name: this.playerName.trim(),
        availability: {
          monday: "unknown",
          tuesday: "unknown",
          wednesday: "unknown",
          thursday: "unknown",
          friday: "unknown",
          saturday: "unknown",
          sunday: "unknown",
        },
      };

      this.players.push(newPlayer);
      this.playerName = "";
    },
  },
};
</script>

<template>
  <div id="app">
    <h1>D&amp;D Scheduler</h1>

    <form id="addAPlayer" v-on:submit.prevent="createPlayer">
      <p><label for="inputPlayer">Name</label></p>
      <input id="inputPlayer" v-model="playerName" />
      <button class="submitButton">Add Player</button>
    </form>

    <div v-if="players.length">
      <p>Select your name from the list and update your availability</p>
      <select v-model="selected">
        <option></option>
        <option v-for="player in players" :key="player.id">
          {{ player.name }}
        </option>
      </select>
    </div>

    <table v-if="activePlayer">
      <thead>
        <tr>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="(_availability, day) in activePlayer.availability"
            :key="day"
          >
            <label>
              <input
                type="radio"
                value="available"
                v-model="activePlayer.availability[day]"
              />
              Available
            </label>
          </td>
        </tr>
        <tr>
          <td
            v-for="(_availability, day) in activePlayer.availability"
            :key="day"
          >
            <label>
              <input
                type="radio"
                value="tentative"
                v-model="activePlayer.availability[day]"
              />
              Tentative
            </label>
          </td>
        </tr>
        <tr>
          <td
            v-for="(_availability, day) in activePlayer.availability"
            :key="day"
          >
            <label>
              <input
                type="radio"
                value="busy"
                v-model="activePlayer.availability[day]"
              />
              Busy
            </label>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="players.length">
      <p>Click below to display all player availability</p>

      <button
        class="submitButton"
        aria-controls="availability"
        :aria-expanded="checkSchedule ? 'true' : 'false'"
        v-on:click="checkSchedule = true"
      >
        Check Availability
      </button>

      <div id="availability" v-show="checkSchedule">
        <div class="displayPlayers" v-for="player in players" :key="player.id">
          <div style="text-align: center">{{ player.name }}</div>
          <div
            class="displayAvailability"
            v-for="(availability, day) in player.availability"
            :key="day"
          >
            <div :class="{ [availability]: true }">
              <select
                class="availabilityOptions"
                v-model="player.availability[day]"
              >
                <option value="unknown">Unknown</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="tentative">Tentative</option>
                <option value="session">Session</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
