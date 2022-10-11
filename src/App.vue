<template>
  <div class="todo">
    <Account />
    <h1>
      ToDo list <span>of {{ userLogin }}</span>
    </h1>
    <form class="todoInput">
      <input type="text" placeholder="print title" v-model="newToDo" />
      <button @click="addItem($event)"><b>+ Add</b></button>
    </form>
    <div class="todoList">
      <Item
        v-for="(item, index) of items"
        :key="item.id"
        :item="item"
        :idx="index"
        @del="delItem"
        @done="doneItem"
      />
    </div>
  </div>
</template>

<script>
import Item from "./components/Item.vue";
import Account from "./components/Account.vue";
import { mapGetters } from "vuex";
import api from "@api";

export default {
  name: "App",
  components: { Account, Item },
  data() {
    return {
      items: [],
      newToDo: ""
    };
  },
  async mounted() {
    try {
      const res = await api.get("/todo");
      const { result } = res.data;
      if (result) {
        this.items = result;
      }
    } catch (err) {
      console.log(`==> get "todo" failure ` + err);
    }
  },
  methods: {
    async addItem(event) {
      if (this.userLogin == "unknown") {
        event.preventDefault();
      }
      try {
        if (this.newToDo) {
          const newItem = { name: this.newToDo, done: 0 };
          await api.post("/todo/", newItem);
          if (this.userLogin == "unknown") {
            this.items.push({ ...newItem, id: this.items.length });
          }
        }
      } catch (err) {
        console.log('==> add "todo" failure ' + err);
      }
    },
    async delItem(id) {
      try {
        const result = await api.delete("/todo/" + id);
        const { status } = result.data;
        if (status == "ok" || this.userLogin == "unknown") {
          const idx = this.items.findIndex(el => el.id === id);
          if (idx !== -1) {
            this.items.splice(idx, 1);
          }
        }
      } catch (err) {
        console.log('==> delete "todo" failure ' + err);
      }
    },
    async doneItem(id, done) {
      try {
        const result = await api.put("/todo/" + id, { done });
        const { status } = result.data;
        if (status == "ok" || this.userLogin == "unknown") {
          this.items.forEach(el => {
            if (el.id === id) {
              el.done = done;
            }
          });
        }
      } catch (err) {
        console.log('==> change "todo" failure ' + err);
      }
    }
  },
  computed: {
    ...mapGetters({ userLogin: "userLogin_getter" })
  }
};
</script>

<style lang="scss">
$mainColor: rgb(0, 172, 163);
body {
  background: radial-gradient(
      circle,
      rgba(rgb(255, 255, 255), 0.6) 0%,
      rgba(rgb(0, 63, 82), 0.7) 100%
    ),
    url("./assets/bg1.jpeg") center center / 18% repeat;
}
.todo {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 30px;
  h1 {
    text-align: center;
  }
}
.todoInput {
  margin: 0 auto;
  height: 50px;
  width: 60%;
  margin-top: 30px;
  display: flex;
  input {
    width: 100%;
    border: 1px solid;
    border-right: none;
    padding: 0 10px;
    outline: none;
  }
  button {
    width: 100px;
    color: white;
    background-color: $mainColor;
    border: 1px solid black;
    outline: none;
    &:hover {
      background-color: white;
      color: $mainColor;
      cursor: pointer;
    }
  }
}
.todoList {
  margin: 0 auto;
  width: 60%;
  margin-top: 60px;
}
</style>
