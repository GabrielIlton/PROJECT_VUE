<template>
    <div>
        <titulo text="Professores" :btnComeBack="true"/>
        <table>
            <thead>
                <th>Código</th>
                <th>Nome</th>
                <th>Alunos</th>
            </thead>
            <tbody v-if="professors.length">
                <tr v-for="(professor, index) in professors" :key="index">
                    <td class="colSmall">{{professor.id}}</td>
                    <router-link :to="`/alunos/${professor.id}`" tag="td" style="cursor: pointer">
                        {{professor.name}} {{professor.surname}}
                    </router-link>  
                    <td class="colSmall">{{ professor.students }}</td>
                </tr>
            </tbody>
            <tfoot v-else>
                Nenhum aluno encontrado!
            </tfoot>
        </table>
    </div>
</template>

<script>
    import Titulo from '../Share/title.vue'
    export default {
        components: {
            Titulo
        },
        data () {
            return {
                professors: [],
                students: []
            }
        },
        created () {
            this.$http
      .get('http://localhost:3000/students')
      .then(response => response.json())
      .then(students => { 
          this.students = students
          this.getProfessors()
        })
        },
        props: {},
        methods: {
            getStudentesPerProfessor () {
                this.professors.forEach((professor, index) => {
                    professor = {
                        id: professor.id,
                        name: professor.name,
                        students: this.students.filter(student => student.professor.id === professor.id).length
                    }
                    this.professors[index] = professor
                })
            },
            getProfessors () {
                this.$http
                    .get('http://localhost:3000/professors')
                    .then(response => response.json())
                    .then(professors => {
                            this.professors = professors
                            this.getStudentesPerProfessor()
                        }
                    )
            }
        }
    }
</script>

<style scoped>
    .colSmall {
        width: 15%;
    }
</style>