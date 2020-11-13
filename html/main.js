
Vue.component("task",{
  props: ['task'],
  template: `
    <div class="task">
        <p>{{task.name}}</p>
    </div>
  `
})

Vue.component("task-view",{ //コンポーネントの命名はケバブケースで
  props: ['view'],
  // data: function(){
  //   return{
  //     tasks: []
  //   }
  // },
  methods: {
    addTask: function(){}
  },
  template: `
    <div class="task_view">
        <div class="task_name">
        <p>{{view.name}}</p>
        </div>
        <div class="task">
          <task v-for="task in view.tasks" v-bind:key="task.name" v-bind:task="task"></task>
        </div>
    </div>
  `
})

// register modal component
Vue.component("modal", {
  data: function () {
    return {
      myThema:"",
      startSchedule:"",
      endSchedule:"",
      deadline:"",
      yClick: false,
      nClick: false,
      memo:"",
      priority: ''
    }
  },
  methods: {
    yesClick: function(){
      this.yClick = true;
      this.nClick = false;
      console.log(this.yClick);
      console.log(this.nClick);
    },

    noClick: function(){
      this.nClick = true;
      this.yClick = false;
      console.log(this.yClick);
      console.log(this.nClick);
    }
  },
  template: `
    <transition name="modal" id="modal-template">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">

                  <div class="flex">
                      <p>テーマ</p>
                      <input v-model="myThema">
                  </div>

                  <div class="flex">
                      <p>日程の始まり</p>
                      <input v-model="startSchedule">
                  </div>

                  <div class="flex">
                      <p>日程の終わり</p>
                      <input v-model="endSchedule">
                  </div>

                  <div class="flex">
                      <p>期限</p>
                      <input v-model="deadline">
                  </div>

                  <div class="flex">
                      <p>繰り返し(曜日、毎週、隔週)</p>
                  </div>

                  <div class="flex">
                          <p>属するタスク郡</p>
                  </div>

                  <div class="flex">
                      <p>優先度(0~9)</p>
                      <input v-model="priority">
                  </div>

                  <div class="flex">
                      <p>重複の許容(Yes/No)</p>
                      <button value="yes" v-bind:disabled="yClick"
                       v-on:click="yesClick">Yes</button><br>

                      <button value="no" v-bind:disabled="nClick"
                      v-on:click="noClick">no</button><br>
                  </div>

                  <div class="flex">
                          <p>メモ</p>
                          <input v-model="memo">
                  </div>

              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                default footer
                <button class="modal-default-button" @click="$emit('close')">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  `,
})

// start app
new Vue({
  el: "#app",
  data: {
    showModal: false,
    taskViews: [
      {
        name: 'me',
        tasks:[
          {name:'study'},
          {name:'hard study'}
        ]
      },
      {
        name: 'team1',
        tasks:[
          {name:'study'}
        ]
      },
      {
        name: 'team2',
        tasks:[
          {name:'study'}
        ]
      },
      {
        name: 'team3',
        tasks:[
          {name:'study'}
        ]
      },
      {
        name: 'team4',
        tasks:[
          {name:'study'}
        ]
      },
      {
        name: 'team5',
        tasks:[
          {name:'study'}
        ]
      },
      {
        name: 'team6',
        tasks:[
          {name:'study'}
        ]
      },
      {
        name: 'team7',
        tasks:[
          {name:'study'}
        ]
      },
      {
        name: 'team8',
        tasks:[
          {name:'study'}
        ]
      },
      {
        name: 'team9',
        tasks:[
          {name:'study'}
        ]
      },
    ]
  },
})
