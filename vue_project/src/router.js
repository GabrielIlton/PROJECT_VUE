import Vue from 'vue';
import Router from 'vue-router';
import Professor from './components/Professor/Professor.vue';
import Students from './components/Student/Students.vue';
import ShowStudent from './components/Student/ShowStudent.vue';
import About from './components/About/About.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/professores',
            name: 'Professores',
            component: Professor
        },
        {
            path: '/alunos/:professor_id',
            name: 'Alunos',
            component: Students
        },
        {
            path: '/alunos',
            name: 'Alunos',
            component: Students
        },
        {
            path: '/aluno/:id',
            name: 'Aluno Detalhe',
            component: ShowStudent
        },
        {
            path: '/sobre',
            name: 'Sobre',
            component: About
        }
    ]
})