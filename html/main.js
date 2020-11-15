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

Vue.component("task-view", {
    props: ['view'],
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

Vue.component("modal", {
    props:['viewData'],
    data: function () {
        return {
            name: "",
            startDay:"",
            startTime: "",
            endDay:"",
            endTime: "",
            yClick: false,
            nClick: false,
            team: '',
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
        },
        regEvent: function(){
          async function temp(data){ return registerEvent(data)}
          //{userid:'a', teamid:"kstm", eventname:"LT", starttime:'2020-11-14 11:00:00', endtime:'2020-11-15 16:00:00', priority:'3', memo:'hello', istodo:'true', istimetable:'true'}
          let t = 0;
          for(let i = 0; i < this.$parent.taskViews.length; i++) if(this.$parent.taskViews[i].name == this.team) t = i
          console.log({userid:this.$parent.userid, teamid:this.$parent.taskViews[t].teamid, eventname:this.name, starttime:this.startDay + ' ' + this.startTime + ':00', endtime:this.endDay + ' ' + this.endTime + ':00', memo:this.memo, priority:this.priority, istodo:0, istimetable:0})
          registerEvent({userid:this.$parent.userid, teamid:this.$parent.taskViews[t].teamid, eventname:this.name, starttime:this.startDay + ' ' + this.startTime + ':00', endtime:this.endDay + ' ' + this.endTime + ':00', memo:this.memo, priority:this.priority, istodo:0, istimetable:0}).then((res) =>{
            if(res[res.length-1]['eventid']==null) console.log('not registered!')
            else{
              console.log('registered!')
              this.$parent.taskViews[t].tasks = res
            }
          }).then(this.$emit('close'))
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
                      <input v-model="team">
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
                <button class="modal-default-button" @click="regEvent">
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
        userid: '1',
        showIconbox: false,
        showModal: false,
        taskViews: [
            {
                name: 'me',
                teamid: 'a',
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
                teamid: 'a',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team2',
                teamid: 'a',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team3',
                teamid: 'a',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team4',
                teamid: 'a',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team5',
                teamid: 'a',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team6',
                teamid: 'a',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team7',
                teamid: 'a',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'team8',
                teamid: 'a',
                tasks: [
                    { name: 'study' }
                ]
            },
            {
                name: 'kstm',
                teamid: 'clubroom-imbibe-compost',
                tasks: [
                    { name: 'study' }
                ]
            },
        ],
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
