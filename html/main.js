function initCalendar (data) {
    //本日、カレンダーの開始日、終了日と、曜日のテキストを用意します
    let date_now = new Date();
    let date_start = new Date(date_now.getFullYear(), date_now.getMonth(), 1);
    let date_end = new Date(date_now.getFullYear(), date_now.getMonth(), 1);
    let days = ["日", "月", "火", "水", "木", "金", "土"];
    date_end.setMonth(date_end.getMonth() + 12);

    document.addEventListener("DOMContentLoaded", function () {

        //FullCalendarを生成します
        let calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {

            //プラグインを読み込みます
            plugins: ["dayGrid"],

            //ヘッダー内の配置を、左に前月ボタン、中央にタイトル、右に次月ボタンに設定します
            header: {
                left: "prev",
                center: "title",
                right: " next"
            },

            //ボタンのテキストを書き換えます
            buttonText: {
                prev: "前の月",
                next: "次の月"
            },

            //デフォルト日を本日に設定します
            defaultDate: date_now,

            //有効期間を当月1日から12ヶ月後（1年後）に設定します。
            validRange: {
                start: date_start,
                end: date_end
            },

            //イベント情報をJSONファイルから読み込みます
            events: "events.json",

            //タイトルを書き換えます（2019年8月）
            titleFormat: function (obj) {
                return obj.date.year + "年" + (obj.date.month + 1) + "月";
            },

            //曜日のテキストを書き換えます（日〜土）
            columnHeaderText: function (obj) {
                return days[obj.getDay()];
            },

            //イベントのクリック時の処理を加えます
            eventClick: function (obj) {
                alert(obj.event.title);
            }
        });
        calendar.render();
    });
}

Vue.component("task-filter", {
    props: ['filter'],
    data: function () {
        return {
            isActive: true,
        }
    },
    methods: {
        filterClick: function () {
            this.isActive = !(this.isActive); //反転
        }

    },
    template: `
    <button v-bind:class="{ active: isActive }" @click="filterClick">
        {{filter.name}}
    </button>
  `
})

// Vue.component("task-calendar", {
//     props: ['tasks'],
//     created: ,
//     template: `
//         <p></p>
//         <div id="calendar"></div>
//     `
// })

Vue.component("iconbox", {
    data: function () {
        return {
            name: "",
        }
    },
    methods: {
    },
    template: `
    <transition name="iconbox" id="iconbox-template">
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
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
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

Vue.component("task", {
    props: ['task'],
    template: `
    <div class="task">
        <p>{{task.name}}</p>
        <p>期限:{{task.end}}</p>
        <p>優先度:{{task.priority}}</p>
        <p>メモ:{{task.memo}}</p>
    </div>
  `
})

Vue.component("task-view", { //コンポーネントの命名はケバブケースで
    props: ['view'],
    // data: function(){
    //   return{
    //     tasks: []
    //   }
    // },
    methods: {
        addTask: function() {}
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
            if (a.end > b.end) return -1;
            if (a.end < b.end) return 1;
            if (a.priority > b.priority) return -1;
            if (a.priority < b.priority) return 1;
        }
    );
    return task;
}

// start app
new Vue({
    el: "#app",
    data: {
        showIconbox: false,
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
                        memo: "aaaaaaa",
                        priority: '1'
                    },

                    {
                        name: "b",
                        start:"2020-01-01 00:00:00",
                        end:"2020-01-02 00:00:03",
                        yClick: false,
                        nClick: false,
                        memo: "bbbbbbbbbb",
                        priority: '0'
                    },

                    {
                        name: "c",
                        start:"2020-01-01 00:00:00",
                        end:"2020-01-02 00:00:04",
                        yClick: false,
                        nClick: false,
                        memo: "ccccccccccccc",
                        priority: '1'
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
      clickEvent: function () {//押せばタスクがソートされる(テスト用)
          for (let n = 0; n < this.taskViews.length; n++) {
              let t = sortend(this.taskViews[n].tasks)
              this.taskViews[n].tasks = t
              console.log(t)
          }
      }
  },
  created:function(){
    initCalendar(this.taskViews)
  }
})
