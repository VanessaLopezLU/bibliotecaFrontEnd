<template>
    <v-row  justify="center" class="crearProducto">
    <v-card justify="center" max-width="600" style="background-color: #b2ddf3">
        <v-row>
            <v-col>
            <v-card-title class="text-center ti" > Registrar Usuario </v-card-title>
                <v-row class="d-flex justify-center align-center">
                    <v-img class="image" src="https://sglchile.cl/wp-content/uploads/2022/01/login-usuario-3.png"></v-img>
                </v-row>
            <v-divider></v-divider>
    
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="paquete.cedula"
                  :counter="10"
                  :rules="campoRules"
                  label="Cedula"
                  required
                ></v-text-field>
    
                <v-text-field
                  v-model="paquete.nombre"
                  :rules="campoRules"
                  label="Nombre"
                  required
                ></v-text-field>
    
                <v-text-field
                  v-model="paquete.apellido"
                  :rules="campoRules"
                  label="Apellido"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="paquete.correo"
                  :rules="campoRules"
                  label="Correo"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="paquete.telefono"
                  :rules="campoRules"
                  label="Telefono"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="paquete.usuario"
                  :rules="campoRules"
                  label="Usuario"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="paquete.contrasena"
                  :rules="campoRules"
                  label="Contrasena"
                  required
                ></v-text-field>
    
                <v-select
                  v-model="paquete.rol"
                  :items="items"
                  :rules="campoRules"
                  label="Rol"
                  required
                ></v-select>
    
                <v-btn
                  color="success"
                  class="mr-8 lighten-2"
                  @click="guardar"
                  small
                >
                 Crear
                </v-btn>
              </v-form>
            </v-card-text>
        </v-col>
        <v-row>
        <v-toolbar  height="90px" dark prominent color="#A9CCE3" elevation="16">
            <v-toolbar-title class=" text-center color-text">Listar Usuario</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table :headers="headers" :items="datos" :items-per-page="5" class="elevation-1">
            
            <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="editItem(Object.assign({}, item))">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item.cedula)">
                            mdi-delete
                        </v-icon>
                    </template>
        
        </v-data-table>

        
    </v-row>
    
        </v-row>
        
      </v-card>
    </v-row>
    </template>
    
    
    <script>
    import axios from "axios";
    export default {
      data: () => ({
        valid: true,
    
        campoRules: [(v) => !!v || "Campo Requerido"],
    
        paquete: {
          Cedula: null,
          Nombre: null,
          Apellido: null,
          Correo: null,
          Telefono: null,
          Usuario: null,
          Contrasena: null,
          Rol: null
          
        },
        headers: [
            { text: "Cedula", value: "Cedula" },

            { text: "Nombre", value: "Nombre" },

            { text: "Apellido", value: "Apellido" },

            { text: "Correo", value: "Correo" },

            { text: "Telefono", value: "Telefono" },

            { text: "Usuario", value: "Usuario" },

            { text: "Contrasena", value: "Contrasena" },

            { text: "Rol", value: "id_rol.descripcion" },

            { text: 'Actions', value: 'actions', sortable: false },

        ],
    
        datos: [],
      }),
      methods: {
        guardar() {
          var vm = this;
          if (this.$refs.form.validate()) {
            axios
              .post(" http://localhost:3000/", this.paquete)
              .then(function (response) {
                // handle success
                console.log(response);
                alert("guardado");
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .finally(function () {
                vm.$refs.form.reset();
              });
          }
          
        },
        async listarEstados() {
            await axios.get('http://localhost:3000/estado-equipo/obtenerEstado').then(resp => {
                this.estadosDb = resp.data;
            })
        },
        async listarTipos() {
            await axios.get('http://localhost:3000/tipoequipo/obtenerTipo').then(resp => {
                this.tipoDB = resp.data;
            })

        },
        editItem(item) {
            console.log(item);
            this.dialogoEditar = true;
            
            this.paqueteEditar = {
                id_estado: item.id_estado.id,
                id_tipo: item.id_tipo.id_tipo,
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
    };
    </script>
    <style>
    .ti {
      color: rgb(8, 4, 4);
      font-size: 26px;
      font-family: "times new roman", cursive;
      text-align: center;
    }
    .c {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}
    </style>