const colors = ["green", "yellow", "palevioletred", "blue", "red"];
let selectedColor;
let scoreArray = [0, 0];
let isGameActive = false;
let lightInterval;
let easy = 500;
let medium = 400;
let hard = 300;
let level = easy;

const gameInstructions = `
THE CIRCLE GAME

1. בתחילת המשחק, יש לבחור צבע מ-4 האפשרויות: ירוק, צהוב, ורוד וכחול.
2. לאחר בחירת הצבע, יופיע עיגול שבו מנורה אחת נדלקת בכל פעם בצבעים משתנים .
3. המטרה היא ללחוץ על הכפתור המתאים כאשר המנורה נדלקת בצבע שבחרת.
4. אם הצלחת ללחוץ בדיוק כשהמנורה בצבע שבחרת נדלקת, את/ה מקבל נקודת ניצחון. אם לא, את/ה מקבל פסילה.
5. המשחק נמשך עד שמגיעים ל-5 ניצחונות או 5 פסילות.
6. אם הצלחת להגיע ל-5 ניצחונות, השלב עולה בדרגת קושי.
7. אם הגעת ל-5 פסילות, המשחק מתאפס ומתחיל שוב מהרמה ההתחלתית.
`;
document.getElementById("startmessage").innerHTML = gameInstructions;


function startGame() {
  isGameActive = true;
  const lightsElements = document.querySelectorAll(".light");
  resetScore();
  if (lightInterval) clearInterval(lightInterval);
  lights(lightsElements, level);

}

function resetScore() {
  scoreArray = [0, 0];
  updateScoreboard();
}

function lights(light, delay) {
  let currentLightIndex = 0;
  let showRandomLight = false;

  lightInterval = setInterval(() => {
    light.forEach((element) => (element.style.backgroundColor = "darkred"));


    if (showRandomLight && Math.random() < 0.30) {
      light[currentLightIndex].style.backgroundColor = selectedColor;
      showRandomLight = false;
    } else {
      let cnt = 0
      for (let i = 0; i <= colors.length; i++) {

        let index = Math.floor(Math.random() * 5)
        if (colors[index] === 'red') {
          light[currentLightIndex].style.backgroundColor = 'red';
          cnt++;
        }
        if (cnt % 3 === 2) {
          light[currentLightIndex].style.backgroundColor = colors[index];
        } else {
          light[currentLightIndex].style.backgroundColor = 'red';
        }
        showRandomLight = true;
      }

    }

    currentLightIndex = (currentLightIndex + 1) % light.length;
  }, delay);
}

let first = true

document.addEventListener("keydown", visible = () => {
  document.getElementById("startmessage").style.display = "none";
  document.removeEventListener("keydown", visible)
  document.addEventListener("keydown", handlePress);
})


function endKeyPress() {
  document.getElementById("gameOverScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("circle").style.display = "none";
  document.getElementById("colorSelectionScreen").style.display = "block";
  document.removeEventListener('keydown', endKeyPress)
  isGameActive = false;
  first = true;
  selectedColor = "";
  document.addEventListener("keydown", handlePress);
}

function handlePress(event) {

  if (event.key.toLowerCase() === "a" || event.key === 'ש') {
    if (isGameActive && selectedColor === 'blue') {
      keyPress();
    }
    if (!first) return
    selectedColor = 'blue';
    document.getElementById("colorSelectionScreen").style.display = "none";
    document.getElementById("circle").style.display = "flex";
    document.getElementById("gameScreen").style.display = "block";
    first = false
    startGame();

  }
  if (event.key.toLowerCase() === "b" || event.key === 'נ') {
    if (isGameActive && selectedColor === 'palevioletred') {
      keyPress();
    }
    if (!first) return
    selectedColor = 'palevioletred';
    document.getElementById("colorSelectionScreen").style.display = "none";
    document.getElementById("circle").style.display = "flex";
    document.getElementById("gameScreen").style.display = "block";
    first = false
    startGame();
  }
  if (event.key.toLowerCase() === "c" || event.key === 'ב') {
    if (isGameActive && selectedColor === 'green') {
      keyPress();
    }
    if (!first) return
    selectedColor = 'green';
    document.getElementById("colorSelectionScreen").style.display = "none";
    document.getElementById("circle").style.display = "flex";
    document.getElementById("gameScreen").style.display = "block";
    first = false
    startGame();
  }
  if (event.key.toLowerCase() === "d" || event.key === 'ג') {
    if (isGameActive && selectedColor === 'yellow') {
      keyPress();
    }
    if (!first) return
    selectedColor = 'yellow';
    document.getElementById("colorSelectionScreen").style.display = "none";
    document.getElementById("circle").style.display = "flex";
    document.getElementById("gameScreen").style.display = "block";
    first = false
    startGame();
  }
}

function keyPress() {
  const lightsElements = document.querySelectorAll(".light");
  let correctPress = false;
  for (let i = 0; i < lightsElements.length; i++) {
    if (lightsElements[i].style.backgroundColor === selectedColor) {
      scoreArray[0]++;
      updateScoreboard();
      correctPress = true;
      break;
    }
  }

  if (!correctPress) {
    scoreArray[1]++;
    updateScoreboard();
  }

  checkGameOver();
}

function updateScoreboard() {
  document.getElementById("successes").innerText = `ניצחונות: ${scoreArray[0]}`;
  document.getElementById("failures").innerText = `הפסדים: ${scoreArray[1]}`;

  updateVisualScore("successCircles", scoreArray[0], "success");
  updateVisualScore("failureCircles", scoreArray[1], "failure");
}

function updateVisualScore(elementId, count, className) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle", className);
    container.appendChild(circle);
  }
}

function checkGameOver() {
  if (scoreArray[0] === 5 || scoreArray[1] === 5) {
    document.removeEventListener('keydown', handlePress)

    clearInterval(lightInterval);
    document.addEventListener("keydown", endKeyPress)
    if (scoreArray[0] === 5) {
      document.getElementById("endMessage").innerText = "!כל הכבוד";
      levelUp();
    } else {
      document.getElementById("endMessage").innerText = "!לא נורא";
      levelDown();
    }
    document.getElementById("gameOverScreen").style.display = "block";
  }
};

function levelUp() {
  if (level === easy) {
    level = medium;
  } else if (level === medium) {
    level = hard;
  } else {
    level = easy;
  }
}

function levelDown() {
  if (level === hard || level === medium) {
    level = easy;
  }
}

function createLights() {
  let txt = "";
  for (let i = 0; i < 16; i++) {
    txt += `<div class="light"></div>`;
  }
  document.getElementById("circle").innerHTML = txt;
}

createLights();