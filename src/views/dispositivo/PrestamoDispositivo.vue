<template>
  <v-container justify="center" max-width="1000" style="background-color: #a4d299">
    
    <v-card elevation="2">
      <v-card-title class="ti  green lighten-1">Formulario de Préstamo</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="nombre" label="Nombres"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="cedula" label="Número de documento"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="fechaInicial" label="Fecha Inicial" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="fechaInicial" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
                  <v-btn text color="primary" @click="menu = false; $refs.form.validate()">Aceptar</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="picker" ampm-in-title label="Hora Inicial" readonly v-on="on"></v-text-field>
                </template>
                <v-time-picker v-model="picker" ampm-in-title full-width>
                  <v-btn text color="primary" @click="menu2 = false; $refs.form.validate()">Aceptar</v-btn>
                </v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu v-model="menu3" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="fechaFinal" label="Fecha Final" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="fechaFinal" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu3 = false; $refs.form.validate()">Cancelar</v-btn>
                  <v-btn text color="primary" @click="menu3 = false">Aceptar</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu v-model="menu4" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="horaFinal" ampm-in-title label="Hora Final" readonly v-on="on"></v-text-field>
                </template>
                <v-time-picker v-model="horaFinal" ampm-in-title full-width>
                  <v-btn text color="primary" @click="menu4 = false">Aceptar</v-btn>
                </v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="equipo" label="Equipo" :items="equipos"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="cedula" label="Cantidad"></v-text-field>
            </v-col>


          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="guardarCambios" color="primary">Guardar Cambios</v-btn>
      </v-card-actions>
    </v-card>
  
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      cedula: '',
      fechaInicial: null,
      picker: null,
      fechaFinal: null,
      horaFinal: null,
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false
    }
  },
        devices: [
          { name: "Portatil" },
          { name: "VideoBeam" },
          { name: "Teclado" },
          { name: "Extension" },
          { name: "Mouse" },
          { name: "Cable HDMI" },
        ],
        hora: [],
        cantidad: [],
      };

  
  </script>

  <style>
  .ti {
    color: rgb(8, 4, 4);
    font-size: 36px;
    font-family: "times new roman", cursive;
    text-align: center;
    float: center;
    
}


  </style>