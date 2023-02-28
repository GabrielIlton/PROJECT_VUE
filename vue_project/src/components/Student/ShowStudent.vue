<template>
    <div>
        <titulo :text="`Aluno: ${student.name}`" :btnComeBack="!view">
            <button v-show="view" class="btn btnUpdate" @click="update()">Editar</button>
        </titulo>    
        <table>
            <tbody>
                <tr>
                    <td class="colSmall">Matrícula:</td>
                    <td>
                        <label>{{ student.id }}</label>
                    </td>
                </tr>
                <tr>
                    <td class="colSmall">Nome:</td>
                    <td>
                        <label v-if="view">{{ student.name }}</label>
                        <input v-else v-model="student.name" type="text" />
                    </td>
                </tr>
                <tr>
                    <td class="colSmall">Sobrenome:</td>
                    <td>
                        <label v-if="view">{{ student.surname }}</label>
                        <input v-else v-model="student.surname" type="text" />
                    </td>
                </tr>
                <tr>
                    <td class="colSmall">Data de nascimento:</td>
                    <td>
                        <label v-if="view">{{ student.birth_date }}</label>
                        <input v-else v-model="student.birth_date" type="text" />
                    </td>
                </tr>
                <tr>
                    <td class="colSmall">Professor:</td>
                    <td>
                        <label v-if="view">{{ student.professor.name }}</label>
                        <select v-else v-model="student.professor">
                            <option v-for="(professor, index) in professors" :key="index" :value="professor">
                                {{ professor.name }}
                            </option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 10px;">
            <div v-if="!view">
                <button class="btn btnSave" @click="save()">Salvar</button>
                <button class="btn btnCancel" @click="cancel()">Cancelar</button>
            </div>
        </div>
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
                professors: [],
                student: {},
                studentId: this.$route.params.id,
                view: true
            }
        },
        created() {
            this.$http
                .get(`http://localhost:3000/students/${this.studentId}`)
                .then(response => response.json())
                .then(student => this.student = student)

            this.$http
                .get('http://localhost:3000/professors')
                .then(response => response.json())
                .then(professors => this.professors = professors)
        },
        methods: {
            update () {
                this.view = !this.view
            },
            save () {
                let studentUpdate = {
                    id: this.student.id,
                    name: this.student.name,
                    surname: this.student.surname,
                    birth_date: this.student.birth_date,
                    professor: this.student.professor
                }
                this.$http
                    .put(`http://localhost:3000/students/${this.studentId}`, studentUpdate)

                this.view = !this.view
            },
            cancel () {
                this.view = !this.view
            }
        }
    }
</script>

<style scoped>
    .colSmall {
        width: 20%; 
    }
    input, select {
        margin: 0px;
        padding: 5px 10px;
        font-size: 0.9em;
        border-radius: 5px;
        border: 1px solid silver;
        background-color: rgb(245, 245, 245);
        width: 95%;
    }
    select {
        height: 38px;
        width: 100%;
    }
    .btnUpdate {
        float: right;
        background-color: rgb(76, 286, 249);
    }
    .btnSave {
        float: right;
        background-color: rgb(79, 196, 68);
    }
    .btnCancel {
        float: left;
        background-color: rgb(249, 286, 92);
    }
</style>