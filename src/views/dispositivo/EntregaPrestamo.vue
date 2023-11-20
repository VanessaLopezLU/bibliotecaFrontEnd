<template>
    <v-card justify="center" class="crearProducto">
        <v-row max-width="50%" class=" justify-center">
            <v-card-title style="font-size: 40px; font-family:'Times New Roman', Times, cursive">
                Entrega De Dispositivos
            </v-card-title>
        </v-row>
        <hr>
        <div class="input">
            <h5>Cedula
                <input class="mi-input" placeholder="" />
                    <v-btn height="30px" color=" aliceblue" style="color: #508d42 ;font-size: 18px"
                      class="button" @click="guardar" small>
                      Guardar
                    </v-btn>
                
            </h5>
            <hr>
        </div>
        <br>
        <h5>Prestamos</h5>
        <v-container>
            <v-data-table :headers="headers" :items="data" class="tbl">
                <template v-slot:item.serial="{ item }">
                    {{ item.serial }}
                </template>
                <template v-slot:item.fecha_prestamo="{ item }">
                    {{ item.fecha_prestamo }}
                </template>
                <template v-slot:item.fecha_devolucion="{ item }">
                    {{ item.fecha_devolucion }}
                </template>
                <template v-slot:item.accion="{ item }">
                    <v-icon @click="editarItem(item)">mdi-pencil</v-icon>
                </template>
            </v-data-table>
        </v-container>
        <br>
        <hr>
        <h5>Detalle Prestamos</h5>
        <v-container>
            <v-data-table :headers="headers" :items="data" class="tbl">
                <template v-slot:item.serial="{ item }">
                    {{ item.serial }}
                </template>
                <template v-slot:item.fecha_prestamo="{ item }">
                    {{ item.fecha_prestamo }}
                </template>
                <template v-slot:item.fecha_devolucion="{ item }">
                    {{ item.fecha_devolucion }}
                </template>
                <template v-slot:item.accion="{ item }">
                    <v-icon @click="eliminarItem(item)">mdi-delete</v-icon>
                </template>
            </v-data-table>
        </v-container>
        <br>
        <v-btn height="30px" color=" aliceblue" style="color: #508d42 ;font-size: 18px"
        class="button2" @click="procesar" small>
        Procesar
      </v-btn>
        <br>
        <br>
    </v-card>
</template>
  
<script>
export default {
    data() {
        return {
            headers: [
                { text: 'Serial', value: 'serial' },
                { text: 'Fecha Prestamo', value: 'fecha_prestamo' },
                { text: 'Fecha Devolucion', value: 'fecha_devolucion' },
                { text: 'Acción', value: 'accion' },
            ],
            data: [],
        };
    },
    methods: {



        realizarAccion(item) {
            console.log('Realizando acción para el código:', item.serial);
        },
        eliminarItem(item) {
            const index = this.data.indexOf(item);
            if (index !== -1) {
                this.data.splice(index, 1);
            }
        },





    },
};
</script>
  
<style scoped>
.mi-input {
    padding: 6px;
    font-size: 16px;
    border: 1px solid #508d42;
    border-radius: 5px;
    margin-right: 10px;
  }

  .tbl {
    background-color: rgba(234, 234, 234, 0.5); 
  }  


.crearProducto {
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
        url("../../assets/fondo2.png");
    height: 300%;
}

.button{
    padding: 5px 20px;
    cursor: pointer;
    border-radius: 10px;
    margin-left: 75px;
    
}

.button2 {

  color: #ffffff;
  padding: 5px 20px;
  cursor: pointer;
  border-radius: 10px;
  margin-left: 500px; 
  font-size: 20px;

}

h5 {
    padding: 0px 20px;
}

</style>