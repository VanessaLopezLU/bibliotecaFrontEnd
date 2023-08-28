<template>
    <v-card class="c" max-width="500" style="background-color: #82E0AA">
        <v-row>
            <v-col>
                <row  class="text-center ti">
                    <v-card-title> Roles </v-card-title>
                </row>
                
                <v-row class="d-flex justify-center align-center">
                    <v-img class="image" src="https://impulso06.com/wp-content/uploads/2023/02/Roles-en-un-equipo-de-trabajo-1024x1024.png"></v-img>
                </v-row>
                <v-divider></v-divider>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="paquete.descripcion" :counter="10" :rules="campoRules" label="descripcion"
                            required></v-text-field>

                            <v-row class="d-flex justify-center">
                                <v-btn color="#85C1E9" class="w-33" @click="guardar" small>
                                    Guardar
                                </v-btn>
                            </v-row>

                    </v-form>
                </v-card-text>
            </v-col>

        </v-row>

        <v-row>
        <v-toolbar  height="90px" dark prominent color="#ABEBC6" elevation="16">
            <v-toolbar-title class=" text-center color-text">Listado de Roles</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table :headers="headers" :items="datos" :items-per-page="5" class="elevation-1">
            
            
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(Object.assign({}, item))">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item.id_rol)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

        <v-dialog  height="700px" width="500px" v-model="dialogoEditar">
            <v-card>
            <v-card-text>
                <v-form ref="formEditar"  lazy-validation>
                    <v-text-field v-model="paqueteEditar.descripcion" :counter="10" :rules="campoRules" label="descripcion"
                        required></v-text-field>

                    <v-btn color="info" class="mr-8 lighten-2" @click="editarRol()" small>
                        Editar
                    </v-btn>

                </v-form>
            </v-card-text>
        </v-card>
        </v-dialog>
    </v-row>
    </v-card>
   
</template>
  
<script>
import axios from "axios";
export default {
    data: () => ({
        dialogoEditar: false,
        valid: true,

        campoRules: [(v) => !!v || "Campo Requerido"],

        paquete: {
            descripcion: null,

        },
        paqueteEditar: {
            id_rol:null,
            descripcion: null,

        },
        headers: [
            { text: "Id", value: "id_rol" },

            { text: "Descripcion", value: "descripcion" },

            { text: 'Actions', value: 'actions', sortable: false },

        ],
        datos: [],


    }),

    methods: {
        guardar() {
            var vm = this;
            if (this.$refs.form.validate()) {
                axios
                    .post("http://localhost:3000/rol/crear", this.paquete)
                    .then(function (response) {

                        alert("guardado");
                        console.log(response)
                        vm.cargar()
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
        async cargar() {
            var vm = this
            await axios
                .get("http://localhost:3000/rol/")
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
        editItem(item) {
            console.log(item);
            this.dialogoEditar = true;
            this.paqueteEditar = {
                id_rol: item.id_rol,
                descripcion: item.descripcion
            }

            

            },
                        
         async deleteItem(id) {
            alert(id);
            await axios.delete('http://localhost:3000/rol/' + id).then(response => {
                console.log(response.data);
                this.cargar();
            
            })
        },
        async editarRol() {
            try {
                await axios.put('http://localhost:3000/rol/actualizar',this.paqueteEditar).then(() => {
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
        this.cargar()




    },
};
</script>
  
<style>
.c {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.ti {
    font-size: 48px;
    font-weight: 180px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serifS;
    text-align: center;
}

.image {
    max-width: 300px;
    height: 200px;
}

.color-text {
    color: #04080cd5;
  }


</style>
  