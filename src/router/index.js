import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

//rutas de elementos del sidebar
const routes = [{
    path: '/',
    name: 'Login',
    component: () =>
        import('../views/iniciarSesion.vue')

},

{
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
        import('../views/dashboard'),
    children: [
        {
            name: 'DashboardWelcome',
            path: '/dashboard/welcome',
            component: () =>
                import('../views/welcome.vue'),
                
        },

        {
            name: 'Dashboarmanager',
            path: '/dashboard/manager',
            component: () =>
                import('../views/dispositivo/CrearEquipo.vue'),

        },

        {
            name: 'DashboardPrestamodispositivo',
            path: '/dashboard/prestamodispositivo',
            component: () =>
                import('../views/dispositivo/PrestamoDispositivo.vue'),
        },
        {
            name: 'DashboardEstadoEquipo',
            path: '/dashboard/estadoequipo',
            component: () =>
                import('../views/dispositivo/EstadoEquipo.vue'),
        },
        {
            name: 'DashboardTipoEquipo',
            path: '/dashboard/tipoequipo',
            component: () =>
                import('../views/dispositivo/TipoEquipo.vue'),
        },
        
       
        {
            name: 'DashboardUsuario',
            path: '/dashboard/usuario',
            component: () =>
                import('../views/dispositivo/ListarUsuario.vue'),
        },     {
            name: 'DashboardRol',
            path: '/dashboard/rol',
            component: () =>
                import('../views/dispositivo/Rol.vue'),
        },
        {
            name: 'DashboarUsuarioCrear',
            path: '/dashboard/usuariocrear',
            component: () =>
                import('../views/Usuario.vue')
        },
      
        {
            name: 'DashboardEstadoUsuario',
            path: '/dashboard/estadousuario',
            component: () =>
                import('../views/dispositivo/EstadoUsuario.vue'),
        },       
        {
            name: 'DashboardEstadoPrestamo',
            path: '/dashboard/estadoprestamo',
            component: () =>
                import('../views/dispositivo/EstadoPrestamo.vue'),
        },
        




    ],
},


]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router