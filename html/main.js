Vue.component("task-calendar", {
  props: ['tasks'],

  template: `
  <div class="calendar">
  <p>aaaa</p>
  </div>
  `
})

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
            name: "",
            startDay:"",
            startTime: "",
            endDay:"",
            endTime: "",
            yClick: false,
            nClick: false,
            memo: "",
            priority: ''
        }
    },
    methods: {
        yesClick: function () {
            this.yClick = true;
            this.nClick = false;
            console.log(this.name);
            console.log(this.startDay);
            console.log(this.startTime);
        },

        noClick: function () {
            this.nClick = true;
            this.yClick = false;
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
                      <input v-model="name">
                  </div>

                  <div class="flex">
                      <p>日程の開始日</p>
                      <input id="startDay" type="date" v-model="startDay">
                      <p>日程の開始時間</p>
                      <input id="startTime" type="time" v-model="startTime">
                      </input>

                  </div>

                  <div class="flex">
                      <p>日程の終了日</p>
                          <input v-model="endDay" type="date" name="today" id="today">
                      <p>日程の終了時間</p>
                          <input v-model="endTime" type="time" name="today" id="today">
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

//期限と優先度によりn番目のチームごとのtaskをソートする
function sortend(task) {
    task.sort(
        function (a, b) {
            if (a.end < b.end) return -1;
            if (a.end > b.end) return 1;
            if (a.priority < b.priority) return -1;
            if (a.priority > b.priority) return 1;
        }
    );
    return task;
}

// start app
new Vue({
    el: "#app",
    data: {
        showModal: false,
        taskViews: [
            {
                name: 'me',
                tasks: [
                    {
                        name: "a",
                        start:"2020-01-01 00:00:00",
                        end:"2020-01-02 00:00:03",
                        yClick: false,
                        nClick: false,
                        memo: "",
                        priority: '1'
                    },

                    {
                        name: "b",
                        start:"2020-01-01 00:00:00",
                        end:"2020-01-02 00:00:03",
                        yClick: false,
                        nClick: false,
                        memo: "",
                        priority: '0'
                    },

                    {
                        name: "c",
                        start:"2020-01-01 00:00:00",
                        end:"2020-01-01 00:00:01",
                        yClick: false,
                        nClick: false,
                        memo: "",
                        priority: ''
                    }
                ]
            },
            {
                name: 'team1',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team2',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team3',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team4',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team5',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team6',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team7',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team8',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team9',
                tasks: [
                    { name: 'study' }
                ]
            },
        ],
        cpu: [],
    },
  methods: {
      clickEvent: function () {
          let n;
          let t;
          for (let n = 0; n < this.taskViews.length; n++) {
              t = sortend(this.taskViews[n].tasks);
              this.taskViews[n].tasks = t;
              console.log(t);
          }
    }
  }
})
