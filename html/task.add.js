// register modal component
function getToday() { //今日の日付を取得
    this.start = new Date();
    today.setDate(today.getDate());
    var yyyy = today.getFullYear();
    var mm = ("0"+(today.getMonth()+1)).slice(-2);
    var dd = ("0"+today.getDate()).slice(-2);
    document.getElementById("today").value=yyyy+'-'+mm+'-'+dd;
}

Vue.component("modal", {
    template: "#modal-template",
    data: function data() {
        return {
            myThema: "",
            startSchedule: "",
            endSchedule: "",
            deadline: "",
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
        },
    }
});

// start app
let app = new Vue({
    el: "#app",
    data: {
        showModal: false,
    },
});
