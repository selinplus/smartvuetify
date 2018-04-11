<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="用户名" v-model="editedItem.username"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="用户ID" v-model="editedItem.userid"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="密码" v-model="editedItem.password"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="电话" v-model="editedItem.phone"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="所在部门" v-model="editedItem.department"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">取消</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>
        <b style="font-size: 18px">用户管理</b>
        <v-btn icon @click="addUser">
            <v-icon>add</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
                append-icon="search"
                label="搜索"
                single-line
                hide-details
                v-model="search">
        </v-text-field>
      </v-card-title>
        <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :rows-per-page-text="pageText"
        :rows-per-page-items="pageItems"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.username }}</td>
          <td class="text-xs-center">{{ props.item.userid }}</td>
          <td class="text-xs-center">{{ props.item.password }}</td>
          <td class="text-xs-center">{{ props.item.phone }}</td>
          <td class="text-xs-center">{{ props.item.department }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          没有查询到{{ search }}
        </v-alert>
      </v-data-table>
    </v-card>
    
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    search: '',
    pageText: '每页显示行数',
    pageItems: [15, 25, 35, { "text": "所有", "value": -1 }],
    headers: [
      { text: "用户名", value: "username", align: "center" },
      { text: "用户ID", value: "userid", align: "center" },
      { text: "密码", value: "password", align: "center" },
      { text: "电话", value: "phone", align: "center" },
      { text: "所在部门", value: "department", align: "center" },
      { text: "操作", value: "operation", sortable: false, align: "center" }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      username: "",
      userid: "",
      password: "",
      phone: "",
      department: ""
    },
    defaultItem: {
      username: "",
      userid: "",
      password: "",
      phone: "",
      department: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "新建用户" : "编辑用户";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.featchData();
  },
  methods: {
    featchData() {
      this.$http.get('static/data/users.data.json')
        .then(res => {
          // console.log(res);
          this.items = res.data.users;
        })
        .catch(err => {
          console.log("getUsersDataError: ", err);
        })
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      if (confirm("确定要删除此用户吗？") && this.items.splice(index, 1)) {
        this.$http.post("main/users/deleteUser", item)
          .then(res => {

          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 30000);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
        this.$http.post("/main/users/updateUser", this.editedItem)
          .then(res => {

          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.items.push(this.editedItem);
        this.$http.post("/main/users/addUsers", this.editItem)
          .then(res => {

          })
          .catch(err => {
            console.log(err);
          });
      }
      this.close();
    },
    addUser() {
        this.dialog = true;
    }
  }
};
</script>
