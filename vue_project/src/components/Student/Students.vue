<template>
  <div>
    <titulo :text="professorId ? `Professor: ${professor.name}` : 'Todos os Alunos'" :btnComeBack="true"/>
    <div v-if="professorId">
      <input type="text" placeholder="Nome do Aluno" v-model="name" @keyup.enter="add()">
      <button class="btn btnInput" @click="add()">Adicionar</button>
    </div>

    <table>
      <thead>
        <th>Matrícula</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="students.length">
        <tr v-for="(student, index) in students" :key="index">
          <td class="colSmall">{{student.id}}</td>
          <router-link :to="`/aluno/${student.id}`" tag="td" style="cursor: pointer;">
            {{student.name}} {{student.surname}}
          </router-link>
          <td class="colSmall"><button class="btn btnDanger" @click="remove(student)">Remover</button></td>
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
  data() {
    return {
      professorId: this.$route.params.professor_id,
      name: '',
      professor: {

      },
      students: []
    }
  },
  created() {
    if (this.professorId) {
      this.getProfessors()
      this.$http
        .get(`http://localhost:3000/students?professor.id=${this.professorId}`)
        .then(response => response.json())
        .then(students => this.students = students)
    } else {
      this.$http
        .get('http://localhost:3000/students')
        .then(response => response.json())
        .then(students => this.students = students)
    }
  },
  methods: {
    add() {
      const student = {
        name: this.name,
        surname: '',
        professor: {
          id: this.professor.id,
          name: this.professor.name
        }
      }

      this.$http
        .post('http://localhost:3000/students', student)
        .then(response => response.json())
        .then(student => {
          this.students.push(student);
          this.name = '';
        })
    },
    remove(student) {
      this.$http
        .delete(`http://localhost:3000/students/${student.id}`)
        .then(() => {
          const index = this.students.indexOf(student);
          this.students.splice(index, 1);
        })
    },
    getProfessors() {
      this.$http
        .get(`http://localhost:3000/professors/${this.professorId}`)
        .then(response => response.json())
        .then(professor => this.professor = professor)
    }
  },
  props: {
  }
}
</script>

<style scoped>
  input {
    width: calc(100% - 195px);
    border: 0px;
    padding: 20px;
    font-size: 1.3em;
    color: rgb(76, 85, 85);
    display: inline;
  }
  .btnInput {
    width: 150px;
    display: inline;
    border: 0px;
    padding: 20px;
    font-size: 1.3em;
    background-color: rgb(103, 113, 113);
  }
  .btnInput:hover {
    padding: 20px;
    margin: 0px;
    border: 0px;
  }
  .colSmall {
    width: 15%;
  }
</style>
