//Molécules de l'algue 3

let texte3 = 'O2';//Initialisation du texte

class molecule3 {

  constructor() {
    this.x3 = xAlgue[2] + lAlgue / 2;
    this.y3 = height - (hSol + hAlgue / 2);
    this.vl3 = random(-1, -0.5);
    this.nx3 = random(-0.5, 0.5);
    this.c21 = 255;
    this.c32 = 0;
    this.c33 = 0;
    this.alpha3 = 255;
  }

  update() {
    this.x3 += this.nx3;
    this.y3 += this.vl3;
    this.alpha3 -= 1.8;
    if(sliderOmbre.value() < this.x3 - lAlgue || cJN1 == 15){
      //Changement de la couleur des molécules
      //Expirées
      this.c31 = 0;
      this.c32 = 0;
      this.c33 = 255;
      //Inspirées
      CmolInsp31 = 255;
      CmolInsp32 = 0;
      CmolInsp33 = 0;
      //Changment des textes
      texte3 = 'CO2';
      texteInsp3 = 'O2';
      debitMolecules3 = 100;
    }else{
      texte3 = 'O2';
      texteInsp3 = 'CO2';
      this.c31 = 255;
      this.c32 = 0;
      this.c33 = 0;
      CmolInsp31 = 0;
      CmolInsp32 = 0;
      CmolInsp33 = 255;
      debitMolecules3 = 50;
    }
  }

  show() {
    noStroke();
    fill(this.c31, this.c32, this.c33, this.alpha3);
    ellipse(this.x3, this.y3, rMol);
    textAlign(CENTER, CENTER);
    fill(couleurTexteMolecule, this.alpha3);
    textSize(tailleTexteMol);
    text(texte3, this.x3, this.y3);
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  
  effacer() {
    return this.alpha3 < 0;
  }
}
