import HomeView from '../views/HomeView.vue';
import RepositoryDetails from '../views/RepositoryDetails.vue';

export default [{
    path: '',
    name: 'home',
    component: HomeView
}, {
    path: '/details/:organization/:name',
    name: 'details',
    component: RepositoryDetails
}]