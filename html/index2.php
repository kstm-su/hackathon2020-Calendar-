<?php
session_start();
if(!$_SESSION['login']){
    header('Location: login.html');
}
?>>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="design2.css">
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script src="https://unpkg.com/vue"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/core/main.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/daygrid/main.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/locale/ja.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/core/main.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/daygrid/main.min.js"></script>

    <!--main.jsのtask-filter用のcss-->
    <style>
        .active {
            color: rgb(28, 24, 255);
        }
    </style>


    <title>PC用カレンダーアプリデザイン</title>
</head>

<body>
    <div id="app">
        <div id="display">

            <div id="calendar_box">
                <div class="flex" id="date">
                    <div class="month">
                        <p>month</p>
                    </div>

                    <div class="week">
                        <p>week</p>
                    </div>

                    <div class="day">
                        <p>day</p>
                    </div>

                </div>

                <div id="task_filter">
                    <p>タスク表示フィルタリング用チェックボックス</p>
                    <task-filter v-for="view in taskViews" v-bind:key="view.name" v-bind:filter="view"></task-filter>
                </div>

                <div class="calendar">
                    <p style="text-align: center;">カレンダー</p>
                    <!-- <task-calendar></task-calendar> -->
                    <div id="calendar"></div>
                </div>


            </div>

            <div id="icon_box">
                <p>アイコンボックス</p>
                <button type="submit" class="icon" @click="showIconbox = true">
                    <img src = "icon.png" alt="アイコン" class="icon" />
                </button>
                <iconbox v-if="showIconbox" @close="showIconbox = false">
                    <p>アイコンボックス</p>
                </iconbox>
            </div>

            <div id="scroll_box">
                <task-view v-for="view in taskViews" v-bind:key="view.name" v-bind:view="view">
                    </taskView>
            </div>

            <div id="task_add">
                <button id="show-modal" @click="showModal = true">タスクの追加</button>
                <modal v-if="showModal" @close="showModal = false">
                    <h3 slot="header">タスクの追加</h3>
                </modal>
            </div>

            <div id="task_add">
                <button id="show-modal" @click="showModal = true">タスクの追加</button>
                <button @click="clickEvent">タスクの更新</button>
                <!--テスト用-->
                <modal v-if="showModal" @close="showModal = false">
                    <h3 slot="header">タスクの追加</h3>
                </modal>
            </div>
        </div>
        <div id="display2">
            <div id="date_box">
                <div id="month_display">
                    <p>Dec</p>
                </div>

                <div class="flex" id="date2">
                    <div class="month">
                        <p>month</p>
                    </div>

                    <div class="week">
                        <p>week</p>
                    </div>

                    <div class="day">
                        <p>day</p>
                    </div>
                </div>

                <img class="icon2" src="icon.png">
            </div>

            <div id="s_calendar">
                <div class="calendar">
                    <p style="text-align: center;">カレンダー</p>
                </div>
            </div>

            <div id="task_box">
                <div id="scroll_display">
                    <p>〇. 〇〇</p>
                </div>

                <div id="todo_box">
                    <div class="todo">
                        <div class="month_view">
                            <p>11月</p>
                        </div>
                        <div class="check_box">
                            <div class="day_view">
                                <p>14</p>
                            </div>
                            <div class="check_view">
                                <div class="check"></div>
                            </div>
                        </div>
                        <div class="time_view">
                            <p>13:45<br>～14:30</p>
                        </div>
                        <div class="todo_view">
                            <p>月3 郵便局</p>
                        </div>
                    </div>

                    <div class="todo">
                        <div class="month_view">
                            <p>11月</p>
                        </div>
                        <div class="check_box">
                            <div class="day_view">
                                <p>14</p>
                            </div>
                            <div class="check_view">
                                <div class="check"></div>
                            </div>
                        </div>
                        <div class="time_view">
                            <p>13:45<br>～14:30</p>
                        </div>
                        <div class="todo_view">
                            <p>月3 郵便局</p>
                        </div>
                    </div>

                    <div class="todo">
                        <div class="month_view">
                            <p>11月</p>
                        </div>
                        <div class="check_box">
                            <div class="day_view">
                                <p>14</p>
                            </div>
                            <div class="check_view">
                                <div class="check"></div>
                            </div>
                        </div>
                        <div class="time_view">
                            <p>13:45<br>～14:30</p>
                        </div>
                        <div class="todo_view">
                            <p>月3 郵便局</p>
                        </div>
                    </div>

                    <div class="todo">
                        <div class="month_view">
                            <p>11月</p>
                        </div>
                        <div class="check_box">
                            <div class="day_view">
                                <p>14</p>
                            </div>
                            <div class="check_view">
                                <div class="check"></div>
                            </div>
                        </div>
                        <div class="time_view">
                            <p>13:45<br>～14:30</p>
                        </div>
                        <div class="todo_view">
                            <p>月3 郵便局</p>
                        </div>
                    </div>

                    <div class="todo">
                        <div class="month_view">
                            <p>11月</p>
                        </div>
                        <div class="check_box">
                            <div class="day_view">
                                <p>14</p>
                            </div>
                            <div class="check_view">
                                <div class="check"></div>
                            </div>
                        </div>
                        <div class="time_view">
                            <p>13:45<br>～14:30</p>
                        </div>
                        <div class="todo_view">
                            <p>月3 郵便局</p>
                        </div>
                    </div>


                </div>

                <div id="task_setting">
                    <div id="todo_filter">
                        <div class="setting_button">
                            <div class="button">
                            </div>
                        </div>
                    </div>
                    <div id="todo_add">
                        <div class="setting_button2">
                            <div class="button">

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>

    <script src="./app.js"></script>
    <script src="./main.js"></script>
</body>

</html>
