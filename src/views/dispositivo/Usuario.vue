<template>
  <v-row justify="center" class="crearProducto">
    <v-card justify="center" max-width="600" style="background-color: #b2ddf3">
      <v-row>
        <v-col>
          <v-card-title class="text-center ti"> Registrar Usuario </v-card-title>
          <v-row class="d-flex justify-center align-center">
            <v-img class="image" src="https://sglchile.cl/wp-content/uploads/2022/01/login-usuario-3.png"></v-img>
          </v-row>
          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="paquete.cedula" :counter="10" :rules="campoRules" label="Cedula"
                required></v-text-field>

              <v-text-field v-model="paquete.nombre" :rules="campoRules" label="Nombre" required></v-text-field>

              <v-text-field v-model="paquete.apellido" :rules="campoRules" label="Apellido" required></v-text-field>

              <v-text-field v-model="paquete.correo" :rules="campoRules" label="Correo" required></v-text-field>

              <v-text-field v-model="paquete.telefono" :rules="campoRules" label="Telefono" required></v-text-field>

              <v-text-field v-model="paquete.usuario" :rules="campoRules" label="Usuario" required></v-text-field>

              <v-text-field v-model="paquete.contrasena" :rules="campoRules" label="Contrasena" required></v-text-field>

              <v-select v-model="paquete.id_rol" :items="rolDb" item-text="descripcion" item-value="id_rol"
                :rules="campoRules" label="Rol" required></v-select>

              <v-select v-model="paquete.id" :items="estadosDb" item-text="estado" item-value="id"
                :rules="campoRules" label="Estado" required></v-select>

              <v-btn color="success" class="mr-8 lighten-2" @click="guardar" small>
                Crear
              </v-btn>
            </v-form>
          </v-card-text>
        </v-col>
        <v-row>
          <v-toolbar height="90px" dark prominent color="#A9CCE3" elevation="16">
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
      id_rol: null,
      id: null

    },
    rolDb:[],
    estadosDb: [],


    headers: [
      { text: "Cedula", value: "Cedula" },

      { text: "Nombre", value: "Nombre" },

      { text: "Apellido", value: "Apellido" },

      { text: "Correo", value: "Correo" },

      { text: "Telefono", value: "Telefono" },

      { text: "Usuario", value: "Usuario" },

      { text: "Contrasena", value: "Contrasena" },

      { text: "Rol", value: "id_rol.descripcion" },

      { text: "Estado", value: "id.estado" },

      { text: 'Actions', value: 'actions', sortable: false },

    ],

    datos: [],
  }),

  methods: {
    guardar() {
      var vm = this;
      if (this.$refs.form.validate()) {
        axios
          .post(" http://localhost:3000/user/crear", this.paquete)
          .then(function (response) {
            console.log(response);
            alert("Guardado");
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
      await axios.get('http://localhost:3000/rol/').then(resp => {
        this.rolDb = resp.data;
      })
    },
    async obtenerEstado() {
      await axios.get('http://localhost:3000/estadousuario').then(resp => {
        this.estadosDb = resp.data;
      })
    },

    editItem(item) {
      console.log(item);
      this.dialogoEditar = true;

      this.paqueteEditar = {
        Cedula: item.Cedula,
        Nombre: item.Nombre,
        Apellido: item.Apellido,
        Correo: item.Correo,
        Usuario: item.Usuario,
        Contrasena: item.Contrasena,
        Rol: item.id_rol.rol
      }
    },

    async cargar() {
      var vm = this;
      await axios
      axios.get("http://localhost:3000/user/")
      axios.then(function (response) {
        vm.datos = response.data;
        console.log(vm.datos);
        vm.ObtenerRoles();
      })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });
    },

    async deleteItem(id) {
      alert(id);
      await axios.delete('http://localhost:3000/user/' + id).then(response => {
        console.log(response.data);
        this.cargar();

      })
    },
    async editarEquipo() {
      try {
        await axios.put('http://localhost:3000/user/actualizar', this.paqueteEditar).then(() => {
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
</style>