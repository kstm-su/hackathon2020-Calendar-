document.querySelector('.input').addEventListener('keyup', function() {

  // 結果表示の要素を取得
  const result = document.querySelector('.result');

  // 入力が空だったら結果表示を空にして処理を止める
  if(!this.value) return result.textContent = '';

  // パラメータの指定
  let params = new URLSearchParams();
  params.append('input_val', this.value);

  axios.post('./main.php', t_data).then(function(response) {
    console.log(response.data)
    console.log(response.data.name)
  }.bind(this)).catch(function(e) {
    console.error(e)
  })

