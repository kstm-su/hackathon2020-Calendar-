
function query(type, data){
  let tmp_data = {type: type, data: data}
  axios.post('./main.php', JSON.stringify(tmp_data)).then(function(response) {
    console.log(response.status)
    return response.data
  }.bind(this)).catch(function(e) {
    console.error(e)
  })
}


function registerUser(data) {
  //{userid:'a'}
  let ret = query('newUser', data)
  //{userid:'a', teamid:'b'}
  return ret
}

function loginUser(data){
  //{userid:'a'}
  let ret = query('loginUser', data)
  //{userid:'a'}
  return ret
}

function resisterTeam(data){
  //{userid:'a', teamid:'c'}
  let ret = query('newTeam', {userid:'change!', name:'change!'})
  //{userid:'a', teamid:'c'}
  return ret
}

function registerEvent(data){
  //{teamid:"kstm", eventname:"LT", starttime:'2020-11-14 11:00:00', endtime:'2020-11-15 16:00:00', priority:'3', memo:'hello', istodo:'true', istimetable:'true'}
  let ret = query('newEvent', {userid:'change!', name:'change!'})
  //{teamid:"kstm", eventid:, eventname:"LT", starttime:'2020-11-14 11:00:00', endtime:'2020-11-15 16:00:00', priority:'3', memo:'hello', istodo:'true', istimetable:'true'}
  return ret
}

function joinTeam(){
  // {userid:'a', teamid:'', teamname:'', ismyself:'', color:''}
  let data = query('joinTeam', {userid:'change!', name:'change!'})
  // {userid:'a', teamid:''or 'null', teamname:'', ismyself:'', color:''}
  return data
}

function leaveTeam(){
  // {userid:'a', teamid:'', teamname:'', ismyself:'', color:''}
  let data = query('leaveTeam', {userid:'change!', name:'change!'})
  // {userid:'a', teamid:'' or 'null', teamname:'', ismyself:'', color:''}
  return data
}

function deleteUser(){
  //{userid:'a'}
  let data = query('deleteUser', {userid:'change!', name:'change!'})
  //{userid:'a'}
  return data
}

// new_user
// user_login
// add_team
// add_event
// join_team
// leave_team
// del_event
// del_team
// del_user
// INSERT INTO Users (userid, teamid)
// INSERT INTO Teams (teamid, teamname, ismyself, color)
// INSERT INTO Events (teamid, eventid, eventname, starttime, endtime, priority, memo, istodo, istimetable)
