<template>
  <v-container justify="center" max-width="1000" style="background-color: #a4d299">
    
    <v-card elevation="2">
      <v-card-title class="ti  green lighten-1">Formulario de Préstamo</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="paquete.cedula" label="Número de documento"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="paquete.nombre" label="Nombres"></v-text-field>
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
              <v-select v-model="paquete.equipos" :items="equipoDB" item-text="Equipo" item-value="id"
                        :rules="campoRules" label="Equipo" required>
                    </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="paquete.cantidad" label="Cantidad"></v-text-field>
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
            equipos:null
        
        },
        hora_prestamo: null,
        hora_devolucion: null,

        
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
            { text: "Serial", value: "serial" },
            {
                text: "Descripcion",
                align: "start",
                sortable: false,
                value: "descripcion",
            },
            { text: "Tipo", value: "id_tipo.tipo" },
            { text: "Estado", value: "id_estado.estado" },
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
            await axios.get('localhost:3000/equipo/estado').then(resp => {
                this.equipoDB = resp.data;
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
                .get("http://localhost:3000/equipo/")
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
            await axios.delete('http://localhost:3000/equipo/' + id).then(response => {
                console.log(response.data);
                this.cargar();
            
            })
        },
        async editarEquipo() {
            try {
                await axios.put('http://localhost:3000/equipo/actualizar',this.paqueteEditar).then(() => {
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
        this.listarTipos();
        var vm = this;
        axios
            .get("http://localhost:3000/equipo")
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


  </style>