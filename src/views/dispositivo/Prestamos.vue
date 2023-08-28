<template>
  <v-row>
    <v-col md="2"></v-col>
    <v-col md="8">
      <v-bottom-navigation
        width="1500"
        height="100"
        v-model="value"
        background-color="#8BC34A"
      >
        <v-row>
          <v-col cols="2">
            <v-select :items="items" filled label="Dispositivos"></v-select>
          </v-col>

          <v-col cols="2">
            <v-text-field width="10" label="Cantidad"></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              max-width="270"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="computedDateFormattedMomentjs"
                  clearable
                  label="Salida"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="date = null"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @change="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col md="2">
            <v-select
              v-model="selectedHourSalida"
              :items="Hourssalida"
              label="Hora Salida"
            ></v-select>
          </v-col>

          <v-col md="2">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              max-width="270"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="computedDateFormattedDatefns"
                  clearable
                  label="Entrada"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="date = null"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @change="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col md="2">
            <v-select
              v-model="selectedHourEntrada"
              :items="Hoursentrada"
              label="Hora Entrada"
            ></v-select>
          </v-col>
        </v-row>

       <v-fab-transition>
              <v-btn
                v-show="true"
                color="#ffa726"
                dark
                absolute
                bottom
                left
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
      </v-bottom-navigation>
    </v-col>

    <v-col md="2"></v-col>
  </v-row>
</template>

<script>

export default {
  data: () => ({
    items: [
      "Portatil",
      "VideoBeam",
      "Cargadores",
      "CableHDMI",
      "Extensiones",
      "Mouse",
      "Teclados",
    ],
    selectedHourSalida: null,
    selectedHourEntrada: null,
    Hourssalida: [],
    Hoursentrada: [],
  }),

  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
  },
  mounted() {
    this.generateHoursSalida();
    this.generateHoursEntrada();
  },
  methods: {
    generateHoursSalida() {
      for (let i = 6; i <= 21; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        this.Hourssalida.push(`${hour}:00`);
      }
    },
    generateHoursEntrada() {
      for (let i = 6; i <= 21; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        this.Hoursentrada.push(`${hour}:00`);
      }
    },
  },
};
</script>
<style>
.btn-redondo {
  border-radius: 80% !important;
  min-width: auto !important;
  color: #ffffff !important;
}
.theme--light.v-bottom-navigation .v-btn {
  color: #ffffff !important;
   position: absolute!important;
    left: 0!important;
    bottom: -57px!important;
    min-width: auto!important;
    border-radius: 50%!important;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)!important;
}
.v-item-group.v-bottom-navigation .v-btn.v-btn--active{
    position: absolute!important;
    left: 0!important;
    bottom: 57px!important;

}
</style>
