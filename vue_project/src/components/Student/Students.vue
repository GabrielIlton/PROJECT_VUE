<template>
  <div>
    <titulo text="Aluno"/>
    <div>
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
          <td>{{student.id}}</td>
          <td>{{student.name}} {{student.surname}}</td>
          <td><button class="btn btnDanger" @click="remove(student)">Remover</button></td>
        </tr>
      </tbody>
      <tfoot v-else>
        Nenhum aluno encontrado!
      </tfoot>
    </table>
  </div>
</template>

<script>
import titulo from '../Share/title.vue'

export default {
  components: {
    titulo
  },
  data() {
    return {
      name: '',
      students: []
    }
  },
  created() {
    this.$http
      .get('http://localhost:3000/students')
      .then(response => response.json())
      .then(students => this.students = students)
  },
methods: {
  add() {
    const student = {
      name: this.name,
      surname: '',
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
  }
},
  props: {
  }
}
</script>

<style scoped>
  input {
    border: 0px;
    padding: 20px;
    font-size: 1.3em;
    color: rgb(76, 85, 85);
    display: inline;
  }
  .btnInput {
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
</style>
