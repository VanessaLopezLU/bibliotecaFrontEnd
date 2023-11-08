<template>
  <v-row justify="center" class="crearProducto">
    <v-container justify="center" max-width="70%">

      <v-card justify="center" class="card" style="background-color: rgba(255, 255, 255, 0.5);">
        <br>
        <v-row max-width="50%" class=" justify-center">
          <v-card-title style="font-size: 50px; font-family:'Times New Roman', Times, cursive">Formulario de
            Préstamo</v-card-title>
        </v-row>
        <v-card-text>
          {{ paquete }}
          <v-form ref="form">
            <v-row>
              <v-col cols="12" md="12">
                <v-select v-model="paquete.cedula" :items="usuarioDB" item-text="cedula" item-value="cedula"
                  :rules="campoRules" label="Número de documento"></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-select v-model="paquete.id_estadoprestamo" :items="estadodB" item-text="estado" item-value="id"
                  :rules="campoRules" label="Estado Prestamo"></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="dateRangeText" :rules="nameRules" label="Fecha del Préstamo"
                  prepend-icon="mdi-calendar" readonly @click="showDatePickerDialog = true">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="horaInicio"
                  :rules="nameRules"
                  label="Hora de Inicio"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  @click="showHoraInicioDialog = true"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                v-model="horaFinal"
                :rules="nameRules"
                label="Hora de Entrega"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                @click="showHoraFinalDialog = true"
              ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">

                <v-col cols="12" md="9">
                  <v-select v-model="detalle.id_tipo" :items="tipoequipo" item-text="tipo" item-value="id"
                    label="Tipo de equipo"> </v-select>
                </v-col>

              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="detalle.cantidad"  type="number" label="Cantidad de equipo"></v-text-field>
              </v-col>


            </v-row>
          </v-form>
        </v-card-text>

        <v-row class="d-flex justify-center">
          <v-btn height="35px" width="120px" justify="center" color=" aliceblue" style="color: #508d42 ;font-size: 18px"
            class="mr-12 lighten-2" @click="guardar" small>
            Guardar
          </v-btn>
        </v-row>
        <br>
        <br>
        <v-dialog v-model="showHoraInicioDialog">
          <v-card class="modal">
            <v-card-title class="text-uppercase">Hora de inicio</v-card-title>
            <v-time-picker v-model="horaInicio" full-width></v-time-picker>
            <v-card-actions>
              <v-btn color="green" small @click="saveHoraInicio">Guardar</v-btn>
              <v-btn color="red" small @click="cancelHoraInicio">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    
        <!-- Modal de la hora de entrega -->
        <v-dialog v-model="showHoraFinalDialog">
          <v-card class="modal">
            <v-card-title class="text-uppercase">Hora de entrega</v-card-title>
            <v-time-picker v-model="horaFinal" full-width></v-time-picker>
            <v-card-actions>
              <v-btn color="green " small @click="saveHoraFinal">Guardar</v-btn>
              <v-btn color="red" small @click="cancelHoraFinal">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    
        <!-- Modal del calendario -->
        <v-dialog v-model="showDatePickerDialog" max-width="500">
          <v-card class="modal2">
            <v-card-title class="text-uppercase">Fecha del Préstamo</v-card-title>
            <v-card-text>
              <v-date-picker v-model="dates" range></v-date-picker>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green" small @click="saveDateRange">Guardar</v-btn>
              <v-btn color="#fff" small @click="cancelDateRange">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Modal del confirmacion -->
        <v-dialog v-model="confirmacion">
          <v-card class="modal">
            <v-card-title class="text-uppercase"
              >la contidad de dispositivos disponibles es:{{
                objConfimacion.numero
              }}
              ¿quiere prestarlos?
            </v-card-title>
            <v-card-actions>
              <v-btn color="blue lighten-2" text @click="confirmacion = false">
                Confirmar
              </v-btn>
              <v-btn
                color="indigo"
                text
                @click="(confirmacion = false), eliminarDetalle()"
                >Cancelar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <br>
        <template>
          <!--tabla de prestamos-->
          <center>
            <v-simple-table class="tabla">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Tipo de equipo</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-right">
                      <v-btn class="mr-4" @click="Prestar">Prestar</v-btn>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paquete.detalle" :key="index">
                    <td class="text-center">
                      {{ getDescripcionTipo(item.tipo) }}
                    </td>
                    <td class="text-center">
                      {{ item.cantidad }}
                    </td>
                    <td class="text-right">
                      <v-icon small @click="borrar(index)"> mdi-delete </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </center>
        </template>
        <br>
        <br>
        <div>

          <v-toolbar height="90px" dark prominent style="background-color: #6cd255" elevation="16">
            <v-row style="margin-top: 10px; font-size: 39px;" class="d-flex justify-center">
              <v-toolbar-title class=" text-center color-text">Lista de estados prestamo</v-toolbar-title>
            </v-row>
          </v-toolbar>
          <v-data-table :headers="headers" :items="datos" :items-per-page="5" class="elevation-1">


            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(Object.assign({}, item))">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item.id)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </div>
      </v-card>

    </v-container>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    rules: [
      (value) => !!value || "Requerido.",
      (value) => (value && value.length >= 3) || "Mínimo 3 caracteres",
    ],
    tipo_equipo: null,
    api: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_PORT}`,
    valid: true,
    sheet: false,
    dates: ["", ""],
    objConfimacion: { numero: null, id: null },
    horaInicio: "",
    horaFinal: "",
    confirmacion: false,
    showDatePickerDialog: false,
    showHoraInicioDialog: false,
    showHoraFinalDialog: false,
    detalle: { tipo: null, cantidad: null },

    paquete: {
      fecha_prestamo: null,
      fecha_devolucion: null,
      cedula: null,
      id_estado: null,
      detalleprestamo: [

      ],

    },
    nameRules: [(v) => !!v || "Campo requerido"],


    tipoequipo: [],
    estadodB: [],
    usuarioDB: [],
    equipoDB: [],

    paqueteEditar: {
      id: null,
      serial: null,
      descripcion: null,
      id_estado: null,
     
    },
    headers: [
      { text: "Id", value: "id" },
      { text: "Cedula", value: "cedula" },
      { text: "Fecha Prestamo", value: "fecha_devolucion" },
      { text: "Fecha Devolucion", value: "fecha_devolucion" },
      { text: "Tipo Equipo", value: "id_equipo.equipo" },
      { text: "Cantidad", value: "cantidad" },
      { text: "Estado Prestamo", value: "id_estadoprestamo.estado" },
      { text: 'Actions', value: 'actions', sortable: false },


    ],
    datos: [],
  }),

  watch: {
    horaInicio: {
      handler() {
        this.paquete.fechaInicio = this.dates[0] + " " + this.horaInicio;
      },
      deep: true,
    },
    horaFinal: {
      handler() {
        this.paquete.fechaFinal = this.dates[1] + " " + this.horaFinal;
      },
      deep: true,
    },
    dates: {
      handler() {
        this.paquete.fechaInicio = this.dates[0] + " " + this.horaInicio;
        this.paquete.fechaFinal = this.dates[1] + " " + this.horaFinal;
      },
      deep: true,
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ");
    },
  },

  methods: {
    guardar() {
      var vm = this;
      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:3000/prestamo/crear", this.paquete)
          .then(function (response) {

            alert("guardado");
            console.log(response)
            vm.cargar()

          })
          .catch(function (error) {
            // handle error
            alert(error);
            console.log(error);
          })
          .finally(function () {
            vm.$refs.form.reset();
          });
      }

    },


    async listarEquipo() {
      await axios.get('localhost:3000/equipo/Estado').then(resp => {
        this.equipoDB = resp.data;
      })
    },

    async listartipoequipo() {
      await axios.get('http://localhost:3000/tipo-equipo').then(resp => {
        this.tipoequipo = resp.data;
      })
    },
    async listarusuario() {
      await axios.get('http://localhost:3000/user').then(resp => {
        this.usuarioDB = resp.data;
      })
    },
    async listarestado() {
      await axios.get('http://localhost:3000/estado-prestamo').then(resp => {
        this.estadodB = resp.data;
      })
    },

    editItem(item) {
      console.log(item);
      this.dialogoEditar = true;

      this.paqueteEditar = {
        id_estado: item.id_estado.id,
        id_tipo: item.id_tipo.id,
        descripcion: item.descripcion,
        serial: item.serial,
        id: item.id
      }
    },

    async cargar() {
      var vm = this
      await axios
        .get("http://localhost:3000/prestamo/")
        .then(function (response) {
          // handle success
          vm.datos = response.data;
          console.log(vm.datos);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });


    },

    async deleteItem(id) {
      alert(id);
      await axios.delete('http://localhost:3000/prestamo/' + id).then(response => {
        console.log(response.data);
        this.cargar();

      })
    },
    async editarEquipo() {
      try {
        await axios.put('http://localhost:3000/prestamo/actualizar', this.paqueteEditar).then(() => {
          this.dialogoEditar = false;
          this.cargar()
            ;
        });

      }
      catch (error) {
        this.dialogoEditar = false;
        alert(error);
      }

    }
  },
  mounted() {
    this.cargar();
    this.listartipoequipo();
    this.listarusuario();
    this.listarestado();
    var vm = this;
    axios
      .get("http://localhost:3000/prestamo")
      .then(function (response) {
        // handle success
        vm.datos = response.data;
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
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

.button {
  display: flex;
  justify-content: center;
}

.container {
  max-width: 85% !important;
}

.crearProducto {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
    url("../../assets/fondo2.png");
  width: 110%;
  height: 300%;

}
</style>