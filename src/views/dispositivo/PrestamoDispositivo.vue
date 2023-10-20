<template>
  <v-row  justify="center" class="crearProducto">
  <v-container justify="center" max-width="50%" >
    
    <v-card justify="center"  class="card"  style="background-color: rgba(255, 255, 255, 0.5);">
      <br>
      <v-row max-width="50%" class=" justify-center">
      <v-card-title style="font-size: 50px; font-family:'Times New Roman', Times, cursive">Formulario de Préstamo</v-card-title>
    </v-row>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field v-model="paquete.cedula" label="Número de documento"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="paquete.fecha_prestamo" label="Fecha Prestamos" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="paquete.fecha_prestamo" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
                  <v-btn text color="primary" @click="menu = false; $refs.form.validate()">Aceptar</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="hora_prestamo" ampm-in-title label="Hora Prestamos" readonly v-on="on"></v-text-field>
                </template>
                <v-time-picker v-model="hora_prestamo" ampm-in-title full-width>
                  <v-btn text color="primary" @click="menu2 = false; $refs.form.validate()">Aceptar</v-btn>
                </v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu v-model="menu3" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="paquete.fecha_devolucion" label="Fecha Devolucion" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="paquete.fecha_devolucion" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu3 = false; $refs.form.validate()">Cancelar</v-btn>
                  <v-btn text color="primary" @click="menu3 = false">Aceptar</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu v-model="menu4" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="hora_devolucion" ampm-in-title label="Hora Devolucion" readonly v-on="on"></v-text-field>
                </template>
                <v-time-picker v-model="hora_devolucion" ampm-in-title full-width>
                  <v-btn text color="primary" @click="menu4 = false">Aceptar</v-btn>
                </v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">

            <v-col cols="12" md="9">
              <v-select v-model="paquete.id_tipo"  :items="tipoequipo" item-text="tipo" item-value="id" label="Tipo de equipo"> </v-select>
            </v-col>
              
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="paquete.cantidad" label="Cantidad"></v-text-field>
            </v-col>


          </v-row>
        </v-form>
      </v-card-text>
      
      <v-row class="d-flex justify-center">
        <v-btn  height="35px" width="120px" justify="center" color=" aliceblue" style="color: #508d42 ;font-size: 18px"  class="mr-12 lighten-2" @click="guardar" small>
          Guardar
        </v-btn>
      </v-row>
      <br>
      <br>
      <div>
      <v-toolbar  height="90px" dark prominent style="background-color: #6cd255" elevation="16">
        <v-row style="margin-top: 10px; font-size: 39px;"   class="d-flex justify-center">
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
    dialogoEditar:false,
        valid: true,

        campoRules: [(v) => !!v || "Campo Requerido"],

        paquete: {
            id: null,
            fecha_prestamo: null,
            fecha_devolucion: null,
            cantidad: null,
            cedula: null,
            id_estadoprestamo:null,
            id_equipo:null
        
        },
        hora_prestamo: null,
        hora_devolucion: null,


        tipoequipo:[],



        
        equipoDB: [],

        paqueteEditar:{
            id: null,
            serial: null,
            descripcion: null,
            id_estado: null,
            id_tipo: null,
        },
        headers: [
            { text: "Id", value: "id" },
            { text: "Cedula", value: "cedula" },
            { text: "Fecha Prestamo", value: "fecha_devolucion" },
            { text: "Fecha Devolucion", value: "fecha_devolucion" },
            { text: "Tipo Equipo", value: "id_equipo.equipo"},
            { text: "Cantidad", value: "cantidad"},
            { text: "Estado Prestamo", value: "id_estadoprestamo.estado"},
            { text: 'Actions', value: 'actions', sortable: false},
            
        
        ],
        datos: [],
    }),
    computed: {
    fechaHoraPrestamo() {
      
      return `${this.paquete.fecha_prestamo}T${this.hora_prestamo}:00`;
    },
    fechaHoraDevolucion() {
      
      return `${this.paquete.fecha_devolucion}T${this.hora_devolucion}:00`;
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
            await axios.get( 'http://localhost:3000/tipo-equipo').then(resp => {
                this.tipoequipo = resp.data;
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
                id : item.id
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
                await axios.put('http://localhost:3000/prestamo/actualizar',this.paqueteEditar).then(() => {
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
        this.listarEquipo();
        this.listartipoequipo();
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
.crearProducto{
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
    url("../../assets/fondo2.png");
     width: 110%;
     height: 300%;

}




  </style>