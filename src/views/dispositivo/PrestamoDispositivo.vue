<template>
  <v-bottom-navigation
   background-color="#8BC34A"
   v-model="value">
   
    <v-row>
      <v-col cols="2" class="pr-0">
        <v-select
          v-model="prestamo.name"
          :items="devices"
          item-text="name"
          filled
          label="Dispositivos"
          item-value="name"
        ></v-select>
      </v-col>

      <v-col cols="2" class="pl-1 pr-0">
        <v-select
          v-model="prestamo.cantidad"
          :items="cantidad"
          filled
          label="Cantidad"
          item-value="name"
        ></v-select>
      </v-col>

      <v-col cols="2" class="pl-1 pr-0">
        <v-menu
          v-model="prestamo.inicial"
          :close-on-content-click="true"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              filled
              v-model="date"
              label="Fecha Inicial"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @input="menu2 = false"
            color="orange lighten-1"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="2" class="pl-1 pr-0">
        <v-select
          v-model="prestamo.horaInicio"
          :items="hora"
          filled
          label="Hora Inicial"
        ></v-select>
      </v-col>

      <v-col cols="2" class="pl-1 pr-0">
        <v-menu
          v-model="prestamo.final"
          :close-on-content-click="true"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              filled
              v-model="date2"
              label="Fecha Final"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date2"
            @input="menu2 = false"
            color="orange lighten-1"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="2" class="pl-1">
        <v-select
          v-model="prestamo.HoraFinal"
          :items="hora"
          filled
          label="Hora Final"
        ></v-select>
      </v-col>
    </v-row>

            <v-fab-transition>
              <v-btn
                v-show="true"
                color="#43c329 "
                dark
                absolute
                bottom
                left
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      prestamo: {
        name: null,
        cantidad: null,
        inicial: null,
        final: null,
        horaInicio: null,
        HoraFinal: null,
      },
      devices: [
        { name: "Portatil" },
        { name: "VideoBeam" },
        { name: "Cable HDMI" },
      ],
      hora: [],
      cantidad: [],
    };
  },
  mounted() {
    for (let index = 1; index < 50; index++) {
      if (index >= 6 && index <= 21) {
        this.hora.push(index);
      }
      this.cantidad.push(index);
    }
    
    
  },
};
</script>
<style>
.btn-redondo {
  border-radius: 50% !important;
  min-width: auto !important;
  color: #fff !important;
}
.theme--light.v-bottom-navigation .v-btn {
  color: #fff !important;
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
  

}
</style>