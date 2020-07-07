//Molécules de l'algue 1

let texte1 = 'O2'; //Initialisation du texte

class molecule1 {

  constructor() {
    this.x1 = xAlgue[0] + lAlgue / 2;
    this.y1 = height - (hSol + hAlgue / 2);
    this.vl1 = random(-1, -0.5);
    this.nx1 = random(-0.5, 0.5);
    this.c11 = 255;
    this.c12 = 0;
    this.c13 = 0;
    this.alpha1 = 255;
  }

  update() {
    this.x1 += this.nx1;
    this.y1 += this.vl1;
    this.alpha1 -= 1.8;
    if (sliderOmbre.value() < this.x1 - lAlgue || cJN1 == 15) {
      //Changement de la couleur des molécules
      //Expirées
      this.c11 = 0;
      this.c12 = 0;
      this.c13 = 255;
      //Inspirées
      CmolInsp11 = 255;
      CmolInsp12 = 0;
      CmolInsp13 = 0;
      //Changement des textes
      texte1 = 'CO2';
      texteInsp1 = 'O2';
      debitMolecules1 = 100;
    } else {
      texte1 = 'O2';
      texteInsp1 = 'CO2';
      this.c11 = 255;
      this.c12 = 0;
      this.c13 = 0;
      CmolInsp11 = 0;
      CmolInsp12 = 0;
      CmolInsp13 = 255;
      debitMolecules1 = 50;
    }
  }

  show() {
    noStroke();
    fill(this.c11, this.c12, this.c13, this.alpha1);
    ellipse(this.x1, this.y1, rMol);
    textAlign(CENTER, CENTER);
    fill(couleurTexteMolecule, this.alpha1);
    textSize(tailleTexteMol);
    text(texte1, this.x1, this.y1);
  }

  effacer() {
    return this.alpha1 < 0;
  }
}
