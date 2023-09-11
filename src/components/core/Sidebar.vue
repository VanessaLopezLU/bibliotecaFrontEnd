<template>
  <v-navigation-drawer v-model="drawer" app class="fon" width="320px">
    <vuescroll :ops="ops">
      <v-img
        src="../../assets/logos/fondo1.png"
        cover
        class="margen"
        max-height="250"
        aspect-ratio="1.7"
      >
      </v-img>

      <v-divider> </v-divider>

      <sidebar-menu class="tipo" showOneChild :menu="menu" />
    </vuescroll>
  </v-navigation-drawer>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import vuescroll from "vuescroll";

export default {
  components: {
    SidebarMenu,
    vuescroll,
  },

  props: ["drawer"],
  data: () => ({
    ops: {
      scrollPanel: {
        initialScrollY: false,
        initialScrollX: false,
        scrollingX: false,
        scrollingY: true,
        speed: 300,
        easing: undefined,
        verticalNativeBarPos: "right",
      },
      rail: {
        background: "rgba(0, 0, 0, 0.158)",
        opacity: 1,
        size: "10px",
        specifyBorderRadius: false,
        gutterOfEnds: null,
        gutterOfSide: "2px",
        keepShow: false,
      },
      bar: {
        showDelay: 500,
        onlyShowBarOnScroll: true,
        keepShow: false,
        background: "#0378a677",
        opacity: 1,
        hoverStyle: false,
        specifyBorderRadius: false,
        minSize: 0,
        size: "9px",
        disable: false,
      },
    },

    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],

    menu: [
      {
        header: "Main Navigation",
        title: "Menú Principal",
        hiddenOnCollapse: true,
      },
      {
        title: "Usuario",
        icon: "fas fa-user",
        child: [
          {
            href:  '/dashboard/usuario',
            title: "Registro Usuario",
          },
          {
            href: '/dashboard/estadousuario',
            title: "Estado Usuario",
          },
        ],
      },
      {
        title: "Registro Dispositivo",
        icon: "far fa-address-book",
        child: [
          {
            href: "/dashboard/manager",
            title: "Crear",
          },
          {
            href: "",
            title: "Listar",
          },
        ],
      },
      {
        title: "Prestamos Dispositivos",
        icon: "far fa-id-card",
        child: [
          {
            href: "/dashboard/prestamodispositivo",
            title: "Registro",
          },
          {
            href: "/dashboard/EstadoPrestamo",
            title: "Estado Prestamo",
          },
          {
            href: "",
            title: "Cancelacion",
          },
    
        ],
      },
      {
        title: "Mantenimiento",
        icon: "fas fa-user-cog",
        child: [
          {
            href: "/dashboard/estadoequipo",
            title: "Estado Equipo",
          },
          {
            href: "/dashboard/tipoequipo",
            title: "Tipo Equipo",
          },
          {
            href: "/dashboard/rol",
            title: "Rol",
          },
        ],
      },
    ],
  }),
  /*  mounted(){
        this.menu=this.$store.state.userData.item
   }, */
};
</script>
<style scoped>
.fon {
  background-image: url("../../assets/fon.png");
  background-size: 100% 100%;
  width: 100%;
  height: auto;
  margin: 0;
}
.letra {
  color: #17202a;
  font-size: 18px;
  font-family: "time new roman ", cursive;
  font-weight: bold;
}
.margen {
  margin-top: 45px;
}
.tipo {
  font-family: "time new roman ", cursive;
}
</style>