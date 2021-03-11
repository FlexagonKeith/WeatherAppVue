<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 60 ? 'warm': ''">
    <main>
      <div class="search-box">
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search..."
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°F</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
var lib = require('../dist/js/vue-weather.min.js');

export default {
  name: 'App',
  data(){
    return {
      api_key: 'cf66cdc452b465b10e7b0a08c4f5bc8e',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather:{}
    }
  },

  methods: {
    fetchWeather (e) {
      if (e.key == "Enter"){
        fetch(`${this.url_base}weather?q=${this.query}&units=imperial&APPID=${this.api_key}`).then(res => {
          return res.json();
        }).then(this.setResults).then(this.logResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
    dateBuilder(){
      return lib.getDate();
    },
    logResults(){
      return lib.logResults(this.weather);
    }
  }
}
</script>

<style>
  @import '../dist/css/main.css';
</style>
