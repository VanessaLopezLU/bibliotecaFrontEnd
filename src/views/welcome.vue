<template>
  <v-container>
    <v-row  v-for="(card, index) in cards" :key="index" :class="index % 2 === 0 ? 'justify-start' : 'justify-end'">
      <v-col  cols="12">
        <v-card  max-width="1000">
          <v-row >
            <v-col class="tarjeta"  cols="4">
              <v-card-text>
                <h2>{{ card.title }}</h2>
                <p>{{ card.description }}</p>
              </v-card-text>
            </v-col>
            <v-col  cols="4"></v-col>
            <v-col cols="4">
              <v-img
                class="white--text align-end"
                width="500"
                height="500"
                :src="card.imageSrc"
              ></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      cards: [
        
        {
          imageSrc:
            "https://tecnologiaaudiovisualuah.files.wordpress.com/2018/04/tecno.jpg",
          title:
            "¡Descubre el mundo a través de nuestros préstamos audiovisuales en el SENA!",
          description:
            "Amplía tus conocimientos y sumérgete en experiencias audiovisuales únicas con nuestros préstamos del SENA. Desde películas inspiradoras hasta documentales educativos, nuestra amplia selección de medios te permitirá aprender, entretener y explorar diferentes perspectivas. ",
        },
        
      ],
    };
  },
};
</script>

    
  <style scoped>
.row {
  align-items: center;
  justify-content: center;
}
.img {
  height: 500px;
  width: 500px;
}
.t {
  font-style: italic;
  font-family: Times, sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  letter-spacing: 2px;
  margin-bottom: 20px;
}
.logo {
  height: 200px;
  width: 350px;
  margin: 4px;
  padding: 0;
}
.tarjeta{
background-color:#ABEBC6  ;
}
.card{
  background-color:#D6EAF8 ;
}
</style>