import { PDFDocument, StandardFonts } from "pdf-lib";
import certificateTemplateBase64 from "./certificateTemplateBase64";
import base64 from "react-native-base64";

function base64ToArrayBuffer(base64In) {
  var binary_string = base64.decode(base64In);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

function idealFontSize(font, text, maxWidth, minSize, defaultSize) {
  let currentSize = defaultSize;
  let textWidth = font.widthOfTextAtSize(text, defaultSize);

  while (textWidth > maxWidth && currentSize > minSize) {
    textWidth = font.widthOfTextAtSize(text, --currentSize);
  }

  return textWidth > maxWidth ? null : currentSize;
}

function pad(str) {
  return String(str).padStart(2, "0");
}

var year, month, day;

function setDateNow(date) {
  year = date.getFullYear();
  month = pad(date.getMonth() + 1); // Les mois commencent à 0
  day = pad(date.getDate());
}

export function getQrCodeData(profile, reasons) {
  const generatedDate = new Date();
  setDateNow(generatedDate);
  const creationDate = `${day}/${month}/${year}`;

  const hour = pad(generatedDate.getHours());
  const minute = pad(generatedDate.getMinutes());
  const creationHour = `${hour}h${minute}`;

  const {
    lastname,
    firstname,
    birthday,
    lieunaissance,
    address,
    zipcode,
    town,
    datesortie,
    heuresortie,
  } = profile;
  const releaseHours = String(heuresortie).substring(0, 2);
  const releaseMinutes = String(heuresortie).substring(3, 5);

  return [
    `Cree le: ${creationDate} a ${creationHour}`,
    `Nom: ${lastname}`,
    `Prenom: ${firstname}`,
    `Naissance: ${birthday} a ${lieunaissance}`,
    `Adresse: ${address} ${zipcode} ${town}`,
    `Sortie: ${datesortie} a ${releaseHours}h${releaseMinutes}`,
    `Motifs: ${reasons}`,
  ].join("; ");
}

export default async function getAttestation(profile, reasons, qrCodeBase64) {
  const generatedDate = new Date();
  setDateNow(generatedDate);
  const creationDate = `${day}/${month}/${year}`;

  const hour = pad(generatedDate.getHours());
  const minute = pad(generatedDate.getMinutes());
  const creationHour = `${hour}h${minute}`;

  const {
    lastname,
    firstname,
    birthday,
    lieunaissance,
    address,
    zipcode,
    town,
    datesortie,
    heuresortie,
  } = profile;
  const releaseHours = String(heuresortie).substring(0, 2);
  const releaseMinutes = String(heuresortie).substring(3, 5);

  const pdfTemplate = base64ToArrayBuffer(certificateTemplateBase64);

  const pdfDoc = await PDFDocument.load(pdfTemplate);
  const page1 = pdfDoc.getPages()[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const drawText = (text, x, y, size = 11) => {
    page1.drawText(text, { x, y, size, font });
  };

  drawText(`${firstname} ${lastname}`, 123, 686);
  drawText(birthday, 123, 661);
  drawText(lieunaissance, 92, 638);
  drawText(`${address} ${zipcode} ${town}`, 134, 613);

  if (reasons.includes("travail")) {
    drawText("x", 76, 527, 19);
  }
  if (reasons.includes("courses")) {
    drawText("x", 76, 478, 19);
  }
  if (reasons.includes("sante")) {
    drawText("x", 76, 436, 19);
  }
  if (reasons.includes("famille")) {
    drawText("x", 76, 400, 19);
  }
  if (reasons.includes("sport")) {
    drawText("x", 76, 345, 19);
  }
  if (reasons.includes("judiciaire")) {
    drawText("x", 76, 298, 19);
  }
  if (reasons.includes("missions")) {
    drawText("x", 76, 260, 19);
  }
  let locationSize = idealFontSize(font, profile.town, 83, 7, 11);

  if (!locationSize) {
    alert(
      "Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. " +
        'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.'
    );
    locationSize = 7;
  }

  drawText(profile.town, 111, 226, locationSize);

  if (reasons !== "") {
    // Date sortie
    drawText(`${datesortie}`, 92, 200);
    drawText(releaseHours, 200, 201);
    drawText(releaseMinutes, 220, 201);
  }

  // Date création
  drawText("Date de création:", 464, 150, 7);
  drawText(`${creationDate} à ${creationHour}`, 455, 144, 7);

  const generatedQR = base64ToArrayBuffer(qrCodeBase64);

  const qrImage = await pdfDoc.embedPng(generatedQR);

  page1.drawImage(qrImage, {
    x: page1.getWidth() - 170,
    y: 155,
    width: 100,
    height: 100,
  });

  pdfDoc.addPage();
  const page2 = pdfDoc.getPages()[1];
  page2.drawImage(qrImage, {
    x: 50,
    y: page2.getHeight() - 350,
    width: 300,
    height: 300,
  });

  return await pdfDoc.saveAsBase64();
}
