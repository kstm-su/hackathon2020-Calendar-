
function query(type, data){
  let tmp_data = {type: type, data: data}
  axios.post('./upload.php', JSON.stringify(tmp_data)).then(function(response) {
    return response.data
  }.bind(this)).catch(function(e) {
    console.error(e)
  })
}


function registerUser() {
  let data = query('newUser', usesrData:{userid:'change!', name:'change!'})
  
}

function loginUser(){
  let data = query('loginUser', usesrData:{userid:'change!', name:'change!'})

}

function resisterTeam(){
  let data = query('newTeam', usesrData:{userid:'change!', name:'change!'})

}

function registerEvent(){
  let data = query('newEvent', usesrData:{userid:'change!', name:'change!'})

}

function joinTeam(){
  let data = query('joinTeam', usesrData:{userid:'change!', name:'change!'})

}

function leaveTeam(){
  let data = query('leaveTeam', usesrData:{userid:'change!', name:'change!'})

}

function deleteTeam(){
  let data = query('deleteTeam', usesrData:{userid:'change!', name:'change!'})

}

function deleteUser(){
  let data = query('deleteUser', usesrData:{userid:'change!', name:'change!'})

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
