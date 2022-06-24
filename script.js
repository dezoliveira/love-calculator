function calculate(){
  let personA = document.getElementById('personA').value
  let personB = document.getElementById('personB').value

  if(personA != "" || personB != ""){

    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      redirect: 'follow'    
    };

    fetch(`https://loverapi.herokuapp.com/api/v1/calculate?personA=${personA}&personB=${personB}`, requestOptions)

      .then((result) => result.text())
      .then(result => JSON.parse(result))
      .then(data => {
        showMessage(data)
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  else{

    Swal.fire({
      icon: 'error',
      title: 'Opa!',
      text: 'Você esqueceu de digitar os nomes! 😅😅😅',
      confirmButtonText: 'Foi mal!'
    })

  }
  
}

function showMessage(data){

  let printMessage = document.getElementById('printMessage')
  let message = data.message
  
  message = message.replace('and','e')

  if (message.match('you both are perfect couple.')){
    message = message.replace('you both are perfect couple.',
                    'vocês formam um casal perfeito! 💘')
  }

  if (message.match('your relationship will be awesome carry on.')){
    message = message.replace('your relationship will be awesome carry on.',
                    'o relacionamento de vocês vai ser demais, continuem! 💕')
  }

  if (message.match('trust and care for each other everythings is gonna be ok.')){
    message = message.replace('trust and care for each other everythings is gonna be ok.',
                    'confiem e cuidem um do outro que tudo ficará bem. 💗')
  }

  if (message.match(`this isn't going to greate relationship maybe find someone else.`)){
    message = message.replace(`this isn't going to greate relationship maybe find someone else.`,
                    'esse não vai ser um bom relacionamento, talvez devessem encontrar outra pessoa. 💔')
  }
  
  printMessage.innerHTML = `<p>${message}</p>`

  clearPersons()
}

function clearPersons(){
  
    let personA = document.getElementById("personA")
    personA.value = ""

    let personB = document.getElementById("personB")
    personB.value = ""

    personA.focus()
}

let btnCalculate = document.getElementById('btnCalculate')
btnCalculate.addEventListener('click', calculate)