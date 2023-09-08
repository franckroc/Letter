var liste= document.getElementById("list");
var score= document.getElementById("score");
var dragzone= document.getElementById("dragzone")
var result= document.getElementById("result");        
var btn= document.getElementById("btn");
var essais= [];
var point= 0;
var interval;
var seconds;
var sec= 90;
var bestW= "";
var bestS= 0;

/* fonction tirage des lettres et affichage - appel= bouton démarrez */
function getLetters() {
    let alphabet= "AAABCDEEEFGHIIIJKLMNOOOPQRSTUUUVWXYZ";
    /* init */
    eraseDropZone();
    eraseTimeResults();
    eraseOther();
    eraseTime();
    btn.disabled= false;

    /* tirage au sort et affichage */
    for( let i=0; i<9; i++) {
        const randomIndex= Math.floor(Math.random() * alphabet.length);
        const randomLetter= alphabet[randomIndex];
        let drag= document.createElement('div');

        drag.className="draggable";
        drag.setAttribute("draggable", "true");
        drag.id= `drag${i+1}`;
        drag.textContent= randomLetter;
        drag.style.fontWeight= "bold";
        dragzone.appendChild(drag);
    }
    /* drag et click des éléments */
    drag();
    /* lancement compte à rebours */
    start(seconds= sec);
}

/* fonction drag des éléments */
function drag() {
    const draggables= document.querySelectorAll('.draggable');
    const dropzone= document.getElementById('dropzone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });

    draggables.forEach(draggable => {
        draggable.addEventListener('click', (e) => {
            dropzone.appendChild(draggable);
        });
    });
    
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); });
    dragzone.addEventListener("dragover", function(e) { e.preventDefault(); })

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(data);
        dropzone.appendChild(draggableElement);
    });

    dragzone.addEventListener("drop", function(e) {
        e.preventDefault();
        const data= e.dataTransfer.getData('text/plain');
        const droppableElement= document.getElementById(data);
        dragzone.appendChild(droppableElement);
    });
}

/* fonction compte à rebours */
function start(seconds) {
    interval= setInterval( () => {
        let tps= document.getElementById("tps");

        tps.textContent= seconds;
        seconds-=1;
        if (seconds <= 0) {  
            clearInterval(interval);  
            tps.textContent= "Terminé !";
            /* init si fin compte à rebours */
            eraseTime();
            eraseDropZone();
            btn.disabled= true;
        }
    }, 1000);
}

/* fonction vérification du mot */
function verifyElements() {
    let tabDropElement= [];
    let elts= dropzone.querySelectorAll(".draggable");

    elts.forEach(elt => {
        tabDropElement.push(elt.textContent);
    });

    let word= tabDropElement.join("").toLowerCase();

    fetch("newdico.txt")
    .then(response => response.text())
    .then(data => {
          // Divisez le contenu du fichier en mots
        const wordsInFile = data.split("\n");

        // Vérifiez si le mot est présent dans le tableau de mots
        if (wordsInFile.includes(word+'\r')) {
            if(!essais.includes(word)) {
                point+= 1;
                result.textContent= " Bonne réponse" ;
                result.style.color= "green";
                score.textContent= point;
                essais.push(word);
                var newLi= document.createElement('li');
                newLi.textContent= word;
                liste.appendChild(newLi);
                bestWord(word);
                bestScore(point);
                if (essais.length == 4) {
                    console.log(essais);
                    drag();
                }
            } else { result.textContent= " Déjà proposé";  } 
        } else { 
            result.textContent= "Mot inconnu";
            result.style.color= "red";
        }
    })
    .catch(error => {
        console.error(error);
        result.textContent = "Erreur !";
    });
    /* suite au click vérifiez */
    eraseDropZone();
    setTimeout( () => { result.textContent= "" }, 800);
}

/* fonction détermine le meilleur mot */
function bestWord(word) {
    var bestWord= document.getElementById("bestword");
    if (word.length > bestW.length) {
        bestW= word;
        bestWord.textContent= word;
    }
}

/* fonction détermine le meilleur score */
function bestScore(score) {
    var bestScore= document.getElementById("bestscore");
    if (score > bestS) {
        bestS= score;
        bestScore.textContent= score;
    }
}

/* fonctions initialisation */
function eraseTimeResults() {
    result.textContent= "";    
    score.textContent= 0;
}

function eraseTime() {  clearInterval(interval);  }

function eraseDropZone() {
    let elts= dropzone.querySelectorAll(".draggable");    
    elts.forEach(elt => { dragzone.appendChild(elt);   })   
}

function eraseOther() {
    point= 0;
    seconds= sec;    
    dragzone.textContent= ""; 
    liste.textContent= "";
    essais= [];  
}