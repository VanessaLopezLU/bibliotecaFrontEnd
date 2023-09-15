<template>
  <div>
    <!-- Sección 1: Identificación y Nombre y Apellido -->
    <div class="div1 row mx-auto">
      <!-- Identificación -->
      <div class="col-6">
        <v-text-field class="titulos" label="Identificación" outlined v-model="identificacion"></v-text-field>
      </div>
      
      <!-- Nombre y Apellido -->
      <div class="col-6">
        <v-text-field class="titulos" label="Nombre y Apellido" outlined v-model="nombreApellido"></v-text-field>
      </div>
      
      <!-- Fecha Inicial -->
      <div class="col-6">
        <div class="input-group">
          <v-text-field class="titulos" label="Fecha Inicial" outlined v-model="fechaInicial" @click="toggleDatePicker('fechaInicial')">
            <template v-slot:append>
              <v-icon @click="toggleDatePicker('fechaInicial')">mdi-calendar</v-icon>
            </template>
          </v-text-field>
          <v-date-picker v-model="fechaInicial" @input="hideDatePicker" v-if="showDatePickerFor === 'fechaInicial'" color="orange"></v-date-picker>
        </div>
      </div>
      
      <!-- Hora Inicial -->
      <div class="col-6">
        <div class="input-group">
          <v-text-field class="titulos" label="Hora Inicial" outlined v-model="horaInicial" @click="toggleTimePicker('horaInicial')">
            <template v-slot:append>
              <v-icon @click="toggleTimePicker('horaInicial')">mdi-clock-time-four-outline</v-icon>
            </template>
          </v-text-field>
          <v-time-picker v-model="horaInicial" format="24hr" @input="hideTimePicker" v-if="showTimePickerFor === 'horaInicial'" color="orange"></v-time-picker>
        </div>
      </div>
    </div>

    <!-- Sección 2: Tipo de Equipo, Cantidad y Botón de Búsqueda -->
    <div class="div2 row mx-auto">
      <!-- Tipo de Equipo -->
      <div class="col-5">
        <v-select class="titulos" label="Tipo de Equipo" outlined v-model="tipoEquipo" :items="tiposEquipo"></v-select>
      </div>

      <!-- Cantidad -->
      <div class="col-5">
        <v-select class="titulos" label="Cantidad" outlined v-model="cantidad" :items="cantidades"></v-select>
      </div>
      
      <!-- Botón de Búsqueda -->
      <div class="col-2">
        <v-btn class="boton">Buscar</v-btn>
      </div>
    </div>

    <!-- Sección de Tabla -->
    <div class="tabla">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="texttabla">Tipo de Equipo</th>
              <th class="texttabla">Serial</th>
              <!-- Agrega más encabezados de columna si es necesario -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td class="texttabla">{{ item.tipo }}</td>
              <td class="texttabla">{{ item.serial }}</td>
              <!-- Agrega más celdas de datos si es necesario -->
              <td class="texttabla">
                <v-btn class="mx-2" fab dark small color="red">
                  <v-icon dark>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      identificacion: '',
      nombreApellido: '',
      fechaInicial: null,
      horaInicial: null,
      tipoEquipo: null,
      cantidad: null,
      tiposEquipo: [], // Rellenar con datos reales
      cantidades: [], // Rellenar con datos reales
      showDatePickerFor: '',
      showTimePickerFor: '',
      desserts: [] // Rellenar con datos reales
    };
  },
  methods: {
    toggleDatePicker(field) {
      this.showDatePickerFor = field;
    },
    toggleTimePicker(field) {
      this.showTimePickerFor = field;
    },
    hideDatePicker() {
      this.showDatePickerFor = '';
    },
    hideTimePicker() {
      this.showTimePickerFor = '';
    },
    // Agrega más métodos según sea necesario
  }
};
</script>

<style scoped>
/* Agrega tus estilos CSS personalizados aquí */
</style>
