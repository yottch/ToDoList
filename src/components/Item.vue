<template>
  <div class="todoItem" :class="{ doneItem: item.done }">
    <div class="todoId">{{ idx + 1 }}</div>
    <div class="todoName">{{ item.name }}</div>
    <div class="todoIcon">
      <font-awesome-icon
        :icon="doneIcon"
        class="doneIcon"
        @click.prevent="$emit('done', item.id, !item.done)"
      />
      <font-awesome-icon
        :icon="delIcon"
        class="delIcon"
        @click.prevent="$emit('del', item.id)"
      />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "Item",
  data() {
    return {
      doneIcon: faCheckCircle,
      delIcon: faTimesCircle,
    };
  },
  components: { FontAwesomeIcon },
  props: {
    item: { type: Object, default: () => ({}) },
    idx: { type: Number },
  },
};
</script>

<style scoped lang="scss">
$mainColor: rgb(0, 172, 163);
.todoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;
  height: 50px;
  padding: 0 20px;
  margin: 5px;
  background-color: rgba(255, 255, 255, 0.7);
  .todoName {
    width: 100%;
    padding: 0 10px;
  }
  .todoIcon {
    width: 50px;
    display: flex;
    justify-content: space-between;
    .doneIcon {
      color: $mainColor;
      opacity: 0.9;
      &:hover {
        opacity: 1;
        cursor: pointer;
        transform: scale(1.2);
      }
    }
    .delIcon {
      color: red;
      opacity: 0.5;
      &:hover {
        opacity: 1;
        cursor: pointer;
        transform: scale(1.2);
      }
    }
  }
}
.doneItem {
  background-color: rgba($mainColor, 0.5);
}
</style>
