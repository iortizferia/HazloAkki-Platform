
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const Dashboard = {
    text: 'Dashboard',
    link: '/dashboard',
    icon: 'icon-speedometer',
    submenu: [
        {
            text: 'Dashbord v1',
            link: '/dashboard/v1'
        },
        {
            text: 'Dashbord v2',
            link: '/dashboard/v2'
        },
        {
            text: 'Dashbord v3',
            link: '/dashboard/v3'
        }
    ]
};

const Register = {
    text: 'Locales',
    link: '/company',
    icon: 'icon-home',
    submenu: [
        {
            text: 'Mis locales',
            link: '/locales/local'
        }
    ]
};

const headingMain = {
    text: 'Navegación principal',
    heading: true
};

const admin = {
    text: 'Administración',
    heading: true
};

export const menu = [
    headingMain,
    Home,
    Dashboard,
    admin,
    Register
];
