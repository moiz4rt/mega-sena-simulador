const circlesDiv = document.querySelector(".circles");
const circles = document.querySelectorAll(".circle");
const sortear = document.querySelector("#sortear");
const sorted_circles = document.querySelector(".sorted-circles");
const your_choices = document.querySelector(".your-choices");

let num = new Set();
let numArr = [];
let already_sorted = false;

circles.forEach((circle) => circle.addEventListener("click", clicked));
sortear.addEventListener("click", sorteio);

function clicked() {
    if (already_sorted) return;
  numArr = [...num]; // Atualiza numArr a partir do Set num
  const numberText = this.firstChild.innerText; // Pega o número exibido no círculo

  // Se o número já foi adicionado e não ultrapassou 6 números
  if (numArr.length < 6 && !num.has(numberText)) {
    this.classList.add("clicked");
    num.add(numberText); // Adiciona o número ao Set
  }
  // Caso contrário, se o número já estiver no Set, removemos
  else if (num.has(numberText)) {
    this.classList.remove("clicked");
    num.delete(numberText); // Remove o número do Set
  }

  // Atualiza numArr após a alteração no Set
  numArr = [...num];
}

function sorteio() {
  if (already_sorted) {
    reset();
    return;
  }
  if (numArr.length < 6) return; // Verifica se 6 números foram selecionados

  numArr = numArr.sort((a, b) => a - b); // Ordena numArr corretamente
  already_sorted = true;
  circlesDiv.style.display = "none";

  // Cria um array com os números de 01 a 60
  let nums = [];
  for (let i = 1; i <= 60; i++) {
    nums.push(i < 10 ? "0" + i : i.toString());
  }

  // Sorteia 6 números aleatórios
  let numsSorted = [];
  for (let i = 0; i < 6; i++) {
    let idx = Math.floor(Math.random() * nums.length); // Alterado para Math.floor
    numsSorted.push(nums[idx]);
    nums.splice(idx, 1); // Remove o número sorteado
  }

  // Ordena os números sorteados
  numsSorted = numsSorted.sort((a, b) => a - b);

  // Preenche os números sorteados e as suas escolhas
  for (let i = 0; i < 6; i++) {
    sorted_circles.children[i + 1].firstChild.innerText = numsSorted[i];
    your_choices.children[i + 1].firstChild.innerText = numArr[i];
  }

  // Marca as escolhas corretas
  for (let i = 0; i < 6; i++) {
    let n = numArr.indexOf(numsSorted[i]); // Verifica o índice de cada número sorteado em numArr
    if (n > -1) {
      sorted_circles.children[i + 1].classList.add("clicked");
      your_choices.children[n + 1].classList.add("clicked");
    }
  }

  sorted_circles.style.display = "grid";
  your_choices.style.display = "grid";
  sortear.innerText = "Tentar de novo";
}

function reset() {
  num = new Set();
  numArr = [];
  circlesDiv.style.display = "grid";
  sorted_circles.style.display = "none";
  your_choices.style.display = "none";
  // Remove a classe "clicked" de todos os círculos
  document.querySelectorAll(".clicked").forEach((circle) => {
    circle.classList.remove("clicked");
  });
  sortear.innerText = "Tentar a sorte";
  already_sorted = false;
}
