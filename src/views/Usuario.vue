<template>

  <v-row justify="center" class="crearProducto">
  
    <v-card justify="center" width="500" style="background-color: transparent;">
      <v-row>
        <v-col>
          
          <v-row class="d-flex justify-center align-center">
          </v-row>
          <v-img  class="image" src="../assets/registrar.jpeg"></v-img>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="paquete.cedula" type="number" :rules="campoRules" label="Cedula" required>
              </v-text-field>

              <v-text-field v-model="paquete.nombre" :rules="campoRules" label="Nombre" required>
              </v-text-field>

              <v-text-field v-model="paquete.apellido" :rules="campoRules" label="Apellido" required>
              </v-text-field>

              <v-text-field v-model="paquete.correo" :rules="campoRules" label="Correo" required>

              </v-text-field>

              <v-text-field v-model="paquete.telefono"  type="number" :rules="campoRules" label="Telefono" required>

              </v-text-field>

              <v-text-field v-model="paquete.usuario" :rules="campoRules" label="Usuario" required>

              </v-text-field>

              <v-text-field v-model="paquete.contrasena" :rules="campoRules" label="Contrasena" required>
                
              </v-text-field>

              <v-select v-model="paquete.id_rol" :items="rolDb" item-text="rol" item-value="id"
                :rules="campoRules" label="Rol" required></v-select>

              <v-select v-model="paquete.id_estado" :items="estadosDb" item-text="estado" item-value="id"
                :rules="campoRules" label="Estado" required></v-select>

                <div class="button">
                  <v-btn color="success" class="mr-8 lighten-2" @click="guardar" small>
                    Guardar
                  </v-btn>
                </div>
            </v-form>
          </v-card-text>
        </v-col>
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

    paquete:{
      cedula: null,
      nombre: null,
      apellido: null,
      correo: null,
      telefono: null,
      usuario: null,
      contrasena: null,
      id_rol: null,
      id_estado: null

    },
    rolDb:[],
    estadosDb: [],

    paqueteEditar:{ 
      cedula: null,
      nombre: null,
      apellido: null,
      correo: null,
      telefono: null,
      usuario: null,
      contrasena: null,
      id_rol: null,
      id_estado: null,

    },
   
    headers: [
      { text: "Cedula", value: "cedula" },

      { text: "Nombre", value: "nombre" },

      { text: "Apellido", value: "apellido" },

      { text: "Correo", value: "correo" },

      { text: "Telefono", value: "telefono" },

      { text: "Usuario", value: "usuario" },

      { text: "Contraseña", value: "contrasena" },

      { text: "Rol", value: "id_rol.descripcion" },

      { text: "Estado", value: "id_estado.estado" },

      { text: 'Actions', value: 'actions', sortable: false },

    ],
    datos: [],

   
  }),

  methods: {
    guardar() {
      var vm = this;
      if (this.$refs.form.validate()) {
        this.paquete.cedula = parseInt(this.paquete.cedula, 15)
        this.paquete.telefono = parseInt(this.paquete.telefono,20)
        axios
          .post("http://localhost:3000/user/crear",  this.paquete)
          .then(function (response) {
            
            alert("guardado");
            console.log(response);
            vm.cargar()
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            vm.$refs.form.reset();
          });
      }
    },
    async obtenerRol() {
      await axios.get('http://localhost:3000/rol').then(resp => {
        this.rolDb = resp.data;
      })
    },
    async obtenerEstado() {
      await axios.get('http://localhost:3000/estado-usuario').then(resp => {
        this.estadosDb = resp.data;
      })
    },
  

    async cargar() {
      var vm = this;
      await axios
      axios.get("http://localhost:3000/user")
      axios.then(function (response) {
        vm.datos = response.data;
        console.log(vm.datos);
      })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });
    },

   
  },
  mounted() {
        this.cargar();
        this.obtenerRol();
        this.obtenerEstado();
        var vm = this;
        axios
            .get("http://localhost:3000/user/")
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
.crearProducto {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
    url("../assets/fondo2.png");
}
.image{
  width: 2000px;
  height: 400px;
  margin-top: 10px;
}
.button {
  display: flex;
  justify-content: center;
}

</style>