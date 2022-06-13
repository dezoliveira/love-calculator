function calculate(){
  let personA = document.getElementById('personA').value
  let personB = document.getElementById('personB').value

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

function showMessage(data){

  let printMessage = document.getElementById('printMessage')
  let message = data.message
  
  message = message.replace('and','e')

  if (message.match('you both are perfect couple.')){
    message = message.replace('you both are perfect couple.',
                    'vocês formam um casal perfeito!')
  }

  else if (message.match('your relationship will be awesome carry on.')){
    message = message.replace('your relationship will be awesome carry on.',
                    'o relacionamento de vocês vai ser demais, continuem!')
  }

  else if (message.match('trust and care for each other everythings is gonna be ok.')){
    message = message.replace('trust and care for each other everythings is gonna be ok.',
                    'confiem e cuidem um do outro que tudo ficará bem.')
  }

  else if (message.match(`this isn't going to greate relationship maybe find someone else.`)){
    message = message.replace(`this isn't going to greate relationship maybe find someone else.`,
                    'esse não vai ser um bom relacionamento, talvez devessem encontrar outra pessoa.')
  }

  printMessage.textContent = message
}

let btnCalculate = document.getElementById('btnCalculate')
btnCalculate.addEventListener('click', calculate)