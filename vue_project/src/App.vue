<template>
  <div id="app">
    <Students/>
  </div>
</template>

<script>
import Students from './components/Student/Students.vue'

export default {
  name: 'app',
  components: {
    Students
  }
}
</script>

<style>
.btnDanger{
  background-color: red;
}
.btn{
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid black;
  color: #e0edf4;
  font-weight: bold;
  border-radius: 5px;
  border-bottom: 3px solid black;
}
.btn:hover{
  text-shadow: 1px 1px 1px black;
  margin-top: 3px;
  border-bottom: 1px solid black;
}
body{
  background-color: #eee;
  display: grid;
  justify-items: center;
}
body, html{
  margin: 0;
  height: 100%;
}
table{
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  width: 100%;
}
table tr td{
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  margin-bottom: 2px;
  color: #3e5252;
  text-align: center;
}
table thead{
  background-color: rgb(102, 175, 217);
  font-size: 1.2em;
  padding: 10px 0px;
  text-align: center !important;
}
#app {
  
}
</style>
