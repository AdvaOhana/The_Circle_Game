#include <Keyboard.h>

#define MAX_BTNS 4

#define blueBtn 4
#define pinkBtn 2
#define greenBtn 3
#define yellowBtn 5

int btnsArray [MAX_BTNS]= {blueBtn, pinkBtn, greenBtn, yellowBtn};
char letters [MAX_BTNS]= {'a','b','c','d'};

unsigned long lastPressTime[MAX_BTNS];
int val[MAX_BTNS];
int lastVal[MAX_BTNS];
int GetPressedBtn() {
  int BtnPressed = -1;
  for (int i = 0; i < MAX_BTNS; i++) {
    val[i] = digitalRead(btnsArray[i]);
    if ((val[i] == LOW) && (lastVal[i] == HIGH) && (millis() - lastPressTime[i] > 150)) {
      lastPressTime[i] = millis();
      BtnPressed = i;
    }
    lastVal[i] = val[i];
  }
  return BtnPressed;
}

void setup() {
  Serial.begin(9600);
  Keyboard.begin();
  for(int i= 0; i<MAX_BTNS;i++){
    pinMode(btnsArray[i], INPUT_PULLUP);
}
}

void loop() {
  int btn= GetPressedBtn();
  if(btn != -1){
    Keyboard.press(letters[btn]);
    Keyboard.releaseAll();
  }
  
}
