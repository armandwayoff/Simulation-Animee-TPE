//Molécules de l'algue 2

let texte2 = 'O2';//Initialisation du texte

class molecule2 {

  constructor() {
    this.x2 = xAlgue[1] + lAlgue / 2;
    this.y2 = height - (hSol + hAlgue / 2);
    this.vl2 = random(-1, -0.5);
    this.nx2 = random(-0.5, 0.5);
    this.c21 = 255;
    this.c22 = 0;
    this.c23 = 0;
    this.alpha2 = 255;
  }

  update() {
    this.x2 += this.nx2;
    this.y2 += this.vl2;
    this.alpha2 -= 1.8;
    if(sliderOmbre.value() < this.x2 - lAlgue || cJN1 == 15){
      //Changement de la couleur des molécules 
      //Expirées
      this.c21 = 0;
      this.c22 = 0;
      this.c23 = 255;
      //Inspirées
      CmolInsp21 = 255;
      CmolInsp22 = 0;
      CmolInsp23 = 0;
      //Changement des textes
      texte2 = 'CO2';
      texteInsp2 = 'O2';
      debitMolecules2 = 100;
    }else{
      texte2 = 'O2';
      texteInsp2 = 'CO2';
      this.c21 = 255;
      this.c22 = 0;
      this.c23 = 0;
      CmolInsp21 = 0;
      CmolInsp22 = 0;
      CmolInsp23 = 255;
      debitMolecules2 = 50;
    }
  }

  show() {
    noStroke();
    fill(this.c21, this.c22, this.c23, this.alpha2);
    ellipse(this.x2, this.y2, rMol);
    textAlign(CENTER, CENTER);
    fill(couleurTexteMolecule, this.alpha2);
    textSize(tailleTexteMol);
    text(texte2, this.x2, this.y2);
  }
  
  effacer() {
    return this.alpha2 < 0;
  }
}
