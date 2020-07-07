//Simulation TPE 1ereS Darius DJAVADI, Valentin VANOSMAEL, Armand WAYOFF
//Problématique: comment la construction des extensions en mer impacte-elle la faune et la flore marine ?
//Programmé par Armand WAYOFF
//Version 8, 2019

//------------------------------------------------------------------------------------
//Déclaration des variables;

let Width = 800;
let Height = 500;

//Canvas
let canvas;
let yCanvas = 290;
let lCanvasInput = 1090; //Longueur totale du canvas plus des inputs

//Images
let imgAlgue;
let imgNuage;
let imgBateau;
let imgPoisson;
let imgSable;
let imgGravats;

//Mer
let yMer = 200; //hauteur du niveau de la mer
let c1Mer = 0;
let c2Mer = 100;
let c3Mer = 255;
let alphaMer = 100;

//Poisson
let xPoisson = [200, 400, 0, 600];
let yPoisson = [350, 400, 230, 250];
let vPoisson = 2; //Vitesse par défaut 
let lPoisson = 27;
let hPoisson = 15;
let variationPoisson = 1;
let vPoissonMin = 1;
let vPoissonMax = 2;

//Bateau
let yBateau = 150;
let hBateau = 57; //Constante
let lBateau = 95; //Constante

//Caisson
let hBéton = 43; //Constante
let lBéton = 70; //Constante
let yBéton = yMer - hBéton;
let couleurBéton1 = 200;
let couleurBéton2 = 173;
let couleurBéton3 = 127;

let ecart = -150; //ecart entre le bateau et le caisson

//Nuages
let xNuage = [300, 0];
let yNuage = [50, 20];
let vNuage = 0.1; //Vitesse des nuages
let lNuage = 127; //Constante

//Algues
let xAlgue = [40, 230, 380];
let hAlgue = 100;
let lAlgue = 62;

//Extension
let pointDigue1 = Width / 2 + Width / 8;
let pointDigue2 = Width / 2 + Width / (16 / 3);
let ecartMerCaisson = 20;

//Composition de l'enxtension
let hSol = 50;
let hGravats = 127;
let hSable = 101;
let lRoches = 30;

let intensitéPesanteur = 9.807; //Constante pour les différents calculs

//Couleur du background
//Par défaut en mode "jour"
let cJN1 = 135;
let cJN2 = 206;
let cJN3 = 235;

//Boutons, sliders...
let sliderBateau;
let sliderOmbre;
let boutonCalculer;
let boutonJour;
let boutonNuit;
let boutonBeton;
let boutonBetonChanvre;
let inputMasse;
let inputVolume;
let inputVolumeImmergé;
let texteDeplaBat;
let texteDeplaOmb;
let texteMateriaux;

let ecartCanvasInput = 30; //Ecart entre le canvas et les inputs
let ecartInterInput = 35; //Ecart vertical entre les inputs

//Résultats
let texteResultats;
let textePousseeArchi;
let textePoidsApp;
let texteCouleFlotteErreur;

//Molécules 
let rMol = 30; //rayon du cercle 
let tailleTexteMol = 12; //taille du texte à l'intérieur de la molécule

//Molécules s'échappant des algues
let couleurTexteMolecule = 0;
let debitMolecules1 = 50;
let debitMolecules2 = 50;
let debitMolecules3 = 50;
let molecules1 = [];
let molecules2 = [];
let molecules3 = [];

//Molécules inspirées par les algues
let xmolInsp1 = xAlgue[0] + lAlgue / 2;
let xmolInsp2 = xAlgue[1] + lAlgue / 2;
let xmolInsp3 = xAlgue[2] + lAlgue / 2;
let ymolInsp = Height - rMol;
let vMolInsp = 0.4;

//Couleurs des molécules inspirées 
let CmolInsp11 = 0;
let CmolInsp12 = 0;
let CmolInsp13 = 255;

let CmolInsp21 = 0;
let CmolInsp22 = 0;
let CmolInsp23 = 255;

let CmolInsp31 = 0;
let CmolInsp32 = 0;
let CmolInsp33 = 255;

let alphaMolInsp = 0;

let texteInsp1 = "CO2";
let texteInsp2 = "CO2";
let texteInsp3 = "CO2";

function setup() {
  let xCanvas = (windowWidth - lCanvasInput) / 2; //Mettre le canvas et les inputs au centre de la fenetre
  canvas = createCanvas(Width, Height);
  canvas.position(xCanvas, yCanvas);
  imageMode(CORNER);
  //Téléchargement des images
  imgAlgue = loadImage('Photos/algue.png');
  imgNuage = loadImage('Photos/nuage.png');
  imgBateau = loadImage('Photos/bateau.png');
  imgPoisson = loadImage('Photos/poisson.png');
  imgSable = loadImage('Photos/sable.png');
  imgGravats = loadImage('Photos/gravats.png');

  //Initialisation des interfaces
  //Mode jour
  boutonJour = createButton('JOUR');
  boutonJour.mousePressed(jour);
  boutonJour.style("font-size", "13pt");
  boutonJour.position(xCanvas + Width + ecartCanvasInput, yCanvas);

  //Mode nuit
  boutonNuit = createButton('NUIT');
  boutonNuit.mousePressed(nuit);
  boutonNuit.style("font-size", "13pt");
  boutonNuit.position(xCanvas + Width + ecartCanvasInput + 80, yCanvas);

  //Bateau
  texteDeplaBat = createDiv('Déplacement du bateau:');
  texteDeplaBat.style("font-size", "14pt");
  texteDeplaBat.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput);
  sliderBateau = createSlider(-lBateau, pointDigue2 - lRoches - lBateau, -lBateau);
  sliderBateau.style("size", "13pt");
  sliderBateau.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 2);

  //Ombre
  texteDeplaOmb = createDiv("Déplacement de l'ombre:");
  texteDeplaOmb.style("font-size", "14pt");
  texteDeplaOmb.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 3);
  //Si possible paramétrer 200
  sliderOmbre = createSlider(100, pointDigue1 - lRoches, width);
  sliderOmbre.style("size", "13pt");
  sliderOmbre.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 4);

  //Inputs pour entrer les valeurs
  inputMasse = createInput('Masse du caisson en kg');
  inputMasse.style("font-size", "13pt");
  inputMasse.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 5);
  inputVolume = createInput('Volume du caisson en m^3');
  inputVolume.style("font-size", "13pt");
  inputVolume.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 6);
  inputVolumeImmergé = createInput('Volume immergé en m^3');
  inputVolumeImmergé.style("font-size", "13pt");
  inputVolumeImmergé.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 7);
  inputMV = createInput('Masse volumique du liquide en kg/m^3');
  inputMV.style("font-size", "13pt");
  inputMV.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 8);

  //Calcul de la poussée d'Archimède et du poids apparent
  boutonCalculer = createButton('CALCULER');
  boutonCalculer.mousePressed(calcul);
  boutonCalculer.style("font-size", "13pt");
  boutonCalculer.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 9);

  //Matériaux
  texteMateriaux = createDiv("Matériaux du caisson:");
  texteMateriaux.style("font-size", "14pt");
  texteMateriaux.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 10);
  boutonBetonChanvre = createButton("Béton de chanvre");
  boutonBetonChanvre.style("font-size", "13pt");
  boutonBetonChanvre.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 11);
  boutonBetonChanvre.mousePressed(betonchanvre);
  boutonBeton = createButton("Béton classique");
  boutonBeton.style("font-size", "13pt");
  boutonBeton.position(xCanvas + Width + ecartCanvasInput, yCanvas + ecartInterInput * 12);
  boutonBeton.mousePressed(betonclassique);

  //Initialisation des textes des résultats
  texteResultats = createDiv("Résultats de l'expérience sur flottabilité du caisson:");
  texteResultats.style("font-size", "14pt");
  texteResultats.position(xCanvas, yCanvas + height + ecartInterInput * 1);
  texteCouleFlotteErreur = createElement("p", " ");
  texteCouleFlotteErreur.style("font-size", "14pt");
  texteCouleFlotteErreur.position(xCanvas, yCanvas + height + ecartInterInput * 2);
  textePousseeArchi = createElement("p", " ");
  textePousseeArchi.style("font-size", "14pt");
  textePousseeArchi.position(xCanvas, yCanvas + height + ecartInterInput * 3);
  textePoidsApp = createElement("p", " ");
  textePoidsApp.style("font-size", "14pt");
  textePoidsApp.position(xCanvas, yCanvas + height + ecartInterInput * 4);
}

function calcul() {
  let PousséeArchi = inputVolumeImmergé.value() * inputMV.value() * intensitéPesanteur;
  let PoidsApp = (inputMasse.value() * intensitéPesanteur) - PousséeArchi;
  let vImmergé = inputVolumeImmergé.value() / inputVolume.value();

  if (vImmergé > 1) {
    texteCouleFlotteErreur.html("Erreur volume immergé");
    alert("Erreur volume immergé");
    textePousseeArchi.html(" ");
    textePoidsApp.html(" ");
  } else {
    yBéton = yMer - hBéton; //Réinitialisation 
    yBéton += vImmergé * hBéton;

    if (PoidsApp <= 0) {
      texteCouleFlotteErreur.html("Le caisson flotte");
    } else {
      texteCouleFlotteErreur.html("Le caisson coule");
      yBéton = height - hSol - hBéton;
    }
    textePousseeArchi.html("Poussée d'Archimède = " + PousséeArchi + " N");
    textePoidsApp.html("Poids apparent = " + abs(PoidsApp) + " N");
  }
}

function jour() {
  cJN1 = 135;
  cJN2 = 206;
  cJN3 = 235;
  couleurTexteMolecule = 0;
}

function nuit() {
  cJN1 = 15;
  cJN2 = 5;
  cJN3 = 107;
  couleurTexteMolecule = 255;
}

function betonclassique() {
  c1Mer = 139;
  c2Mer = 108;
  c3Mer = 66;
  alphaMer = 200;
  //Changer la couleur du caisson 
  couleurBéton1 = 150;
  couleurBéton2 = 150;
  couleurBéton3 = 150;
  //La vitesse des poissons diminue 
  vPoissonMin = 0.5;
  vPoissonMax = 1;
}

function betonchanvre() {
  c1Mer = 0;
  c2Mer = 100;
  c3Mer = 255;
  alphaMer = 100;
  //Changer la couleur du caisson 
  couleurBéton1 = 200;
  couleurBéton2 = 173;
  couleurBéton3 = 127;
  //La vitesse des poissons diminue
  vPoissonMin = 1;
  vPoissonMax = 2;
}

function draw() {
  background(cJN1, cJN2, cJN3);

  //Mer
  noStroke();
  fill(c1Mer, c2Mer, c3Mer, alphaMer);
  rect(0, yMer, width, height - yMer);

  //Molécules
  if (frameCount % debitMolecules1 == 0) {
    for (let i = 0; i < 1; i++) {
      let particule = new molecule1();
      molecules1.push(particule);
    }
  }
  if (frameCount % debitMolecules2 == 0) {
    for (let i = 0; i < 1; i++) {
      let particule = new molecule2();
      molecules2.push(particule);
    }
  }
  if (frameCount % debitMolecules3 == 0) {
    for (let i = 0; i < 1; i++) {
      let particule = new molecule3();
      molecules3.push(particule);
    }
  }

  for (let i = molecules1.length - 1; i >= 0; i--) {
    molecules1[i].update();
    molecules1[i].show();
    if (molecules1[i].effacer()) {
      molecules1.splice(i, 1);
    }
  }

  for (let i = molecules2.length - 1; i >= 0; i--) {
    molecules2[i].update();
    molecules2[i].show();
    if (molecules2[i].effacer()) {
      molecules2.splice(i, 1);
    }
  }

  for (let i = molecules3.length - 1; i >= 0; i--) {
    molecules3[i].update();
    molecules3[i].show();
    if (molecules3[i].effacer()) {
      molecules3.splice(i, 1);
    }
  }

  //Sol
  fill(224, 205, 169);
  rect(0, height - hSol, width, height - hSol);

  //Images
  //Nuages
  for (let i = 0; i < xNuage.length; i++) {
    image(imgNuage, xNuage[i], yNuage[i]);
    xNuage[i] += vNuage;
    if (xNuage[i] > width) {
      xNuage[i] = -lNuage;
      yNuage[i] = random(100);
    }
  }

  //Algues
  for (let i = 0; i < xAlgue.length; i++) {
    image(imgAlgue, xAlgue[i], height - (hSol + hAlgue));
  }

  //Molécules inspirées
  fill(CmolInsp11, CmolInsp12, CmolInsp13, alphaMolInsp);
  ellipse(xmolInsp1, ymolInsp, rMol);
  textAlign(CENTER, CENTER);
  fill(couleurTexteMolecule);
  textSize(tailleTexteMol);
  text(texteInsp1, xmolInsp1, ymolInsp);

  fill(CmolInsp21, CmolInsp22, CmolInsp23, alphaMolInsp);
  ellipse(xmolInsp2, ymolInsp, rMol);
  textAlign(CENTER, CENTER);
  fill(couleurTexteMolecule);
  textSize(tailleTexteMol);
  text(texteInsp2, xmolInsp2, ymolInsp);

  fill(CmolInsp31, CmolInsp32, CmolInsp33, alphaMolInsp);
  ellipse(xmolInsp3, ymolInsp, rMol);
  textAlign(CENTER, CENTER);
  fill(couleurTexteMolecule);
  textSize(tailleTexteMol);
  text(texteInsp3, xmolInsp3, ymolInsp);

  //Mouvement des molécules
  ymolInsp -= vMolInsp;
  alphaMolInsp += 4;

  //Réinitialisation des paramètres
  if (ymolInsp < height - hSol - hAlgue / 3) {
    ymolInsp = height - rMol;
    alphaMolInsp = 0;
  }

  //Poissons
  for (let i = 0; i < xPoisson.length; i++) {
    image(imgPoisson, xPoisson[i], yPoisson[i]);
    yPoisson[i] = constrain(yPoisson[i], yBateau + hBateau, height - hSol - hPoisson);
    xPoisson[i] += vPoisson;
    yPoisson[i] += random(-variationPoisson, variationPoisson);

    //Réinitialisation des paramètres des poissons
    if (xPoisson[i] > width) {
      xPoisson[i] = -lPoisson;
      yPoisson[i] = random(yBateau + hBateau, height - hSol - hPoisson);
      vPoisson = random(vPoissonMin, vPoissonMax);
    }
  }

  //Bateau
  image(imgBateau, sliderBateau.value(), yBateau);

  //Caisson
  fill(couleurBéton1, couleurBéton2, couleurBéton3);
  rect(sliderBateau.value() + ecart, yBéton, lBéton, hBéton);

  //Cable entre le caisson et le bateau
  strokeWeight(1);
  stroke(0);
  line(sliderBateau.value() + ecart + lBéton, yBéton + hBéton / 2, sliderBateau.value(), 190);

  //Digue

  noStroke();
  fill(150);
  quad(pointDigue1, height - hSol, width, height - hSol, width, yMer + hBéton - ecartMerCaisson, pointDigue2, yMer + hBéton - ecartMerCaisson);
  rect(pointDigue2 + lBéton, yMer - ecartMerCaisson, width - pointDigue2 + lBéton, hBéton + abs(ecartMerCaisson));

  //Sable
  image(imgSable, pointDigue1, yMer + hBéton - ecartMerCaisson + hGravats);

  //Gravats
  image(imgGravats, pointDigue2 - 28, yMer + hBéton - ecartMerCaisson);

  //Roches
  fill(50);
  quad(pointDigue1 - lRoches, height - hSol, pointDigue1, height - hSol, pointDigue2, yMer + hBéton - ecartMerCaisson, pointDigue2 - lRoches, yMer + hBéton - ecartMerCaisson);

  //Contour béton
  // strokeWeight(8);
  // stroke(100);
  // line(pointDigue2 - lRoches, yMer + hBéton - ecartMerCaisson, pointDigue2 + lBéton, yMer + hBéton - ecartMerCaisson);
  // line(pointDigue2 + lBéton, yMer + hBéton - ecartMerCaisson, pointDigue2 + lBéton, yMer - ecartMerCaisson);
  // line(pointDigue2 + lBéton, yMer - ecartMerCaisson, width, yMer - ecartMerCaisson);

  //Ombre
  noStroke();
  fill(100, 150);
  triangle(pointDigue2 - lRoches, yMer + hBéton - ecartMerCaisson, sliderOmbre.value(), height - hSol, pointDigue1 - lRoches, height - hSol);

  //Textes composition géologique
  noFill();
  strokeWeight(2);
  stroke(0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text('Calcaire', width / 2, height - hSol / 2);
  text('Sable tassé', pointDigue2 + (width - pointDigue2) / 2, height - hSol - hSable / 2);
  text('Gravats', pointDigue2 + (width - pointDigue2) / 2, height - hSol - hSable - hGravats / 2);
  textSize(25);
  text('Béton', pointDigue2 + (width - pointDigue2 + lBéton) / 2, height - hSol - hSable - hGravats - hBéton / 2);
}
