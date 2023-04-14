function calculate(){
  let personA = document.getElementById('personA').value
  let personB = document.getElementById('personB').value
  let printMessage = document.getElementById('printMessage')

  if(personA != "" & personB != ""){

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6213ceb808msh5dc70b83ebce583p152098jsn891b5a6ce6c3',
        'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
      }
    };

    fetch(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${personA}&sname=${personB}`, options)

      .then((result) => result.json())
      .then(data => {
        console.log(data)
        showMessage(data)
      })
      .catch(error => console.log('error', error));
  }

  else{
    callSwal(0)
  }
}

function showMessage(data){
  if(data){
    let message = data.result
    let personA = data.fname.toUpperCase()
    let personB = data.sname.toUpperCase()
    let percentage = data.percentage

    printMessage.classList.remove('hidden')

    if (message.match('Congratulations! Good choice.')){
      message = message.replace(
        'Congratulations! Good choice.',
        'Parabéns! Boa escolha! 💕'
      )
    }

    if (message.match('All the best!')){
      message = message.replace(
        'All the best!',
        'O melhor casal💘'
      )
    }

    if (message.match('Can choose someone better.')){
      message = message.replace(
        'Can choose someone better.',
        'Vocês devem escolher alguém melhor. 💔'
      )
    }

    if (message.match('May be better next time.')){
      message = message.replace(
        'May be better next time.',
        'Talvez na próxima reencarnação 😆'
      )
    }

    printMessage.innerHTML = `
      <div>
        <h2>${personA} e ${personB}: </h4>
        <span>
          <p>${message}</p>
          <p>Taxa de combinação: <strong>${percentage}%</strong></p>
        </span>
      </div>
    `
  } else {
    callSwal(1)
  }
                            
  clearPersons()
}

function callSwal(messageType){
  let swalText = ''
  if(messageType === 0){
    swalText = 'Você esqueceu de digitar os nomes! 😅😅😅'
  }
  else if(messageType === 1){
    swalText = 'Ocorreu um erro com a API! 😅😅😅'
  }

  Swal.fire({
    icon: 'error',
    title: 'Opa!',
    text: swalText,
    confirmButtonText: 'Foi mal!'
  })
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